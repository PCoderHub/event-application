import { Box, Card, Typography } from "@mui/material"
import Navbar from "../assets/Navbar"
import { pages } from "../assets/pages"
import { app } from '../firebase';
import { getDatabase, ref, get} from 'firebase/database';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addEventInfo } from "../redux_toolkit/eventReducer";

function Home() {

  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state) => state.user.user
  );

  const getEvents = () => {
    const db = getDatabase(app);
    const eventRef = ref(db, 'users/' + userData.id + '/events');
    get(eventRef).then((snapshot) => {
      if(snapshot.exists()) {
        const eventData = snapshot.val();
        setEvents(Object.values(eventData));
        console.log(Object.values(eventData));
      } else {
        console.log('No events available');
      }
    }).catch((err) => console.log(err));
  }

  const handleClick = (eventData) => () => {
    dispatch(addEventInfo(eventData));
    navigate('/detail');
  }

  useEffect(() => {
    getEvents();
  }, []);
  
  return (
    <Box component='div'>
      <Navbar title={pages.home.title} leftText={pages.home.leftText} leftIcon={pages.home.leftIcon} link={pages.home.leftLink} user={userData} />
      {events?.length > 0 ? events.map((event, i) => {
        return <Box key={i} margin='100px'>
          <Card component='button' onClick={handleClick(event)}>
            <Typography variant="h6">{event.eventName}</Typography>
            <Typography variant="body1">{event.eventDesc}</Typography>
          </Card>
        </Box>
      }) : <Typography variant='h6' component='div' position='absolute' top='50%' left='40%'>No Events at the Moment</Typography>}
    </Box>
  )
}

export default Home;
