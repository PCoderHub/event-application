import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import Navbar from "../assets/Navbar"
import { pages } from "../assets/pages"
import { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { AddressFinder } from '@ideal-postcodes/address-finder';
import { app } from '../firebase';
import { getDatabase, ref, set} from 'firebase/database';
import { useSelector } from "react-redux";

function Create() {

  /*const [thumbnail, setThumbnail] = useState('');
  const [picOne, setPicOne] = useState('');
  const [picTwo, setPicTwo] = useState('');
  const [picThree, setPicThree] = useState('');*/

  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [country, setCountry] = useState('');
  const [subCategory, setSubCategory] = useState([]);
  const [eventDate, setEventDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [venueName, setVenueName] = useState('');
  const [manual, setManual] = useState(false);
  const [lineOne, setLineOne] = useState('');
  const [lineTwo, setLineTwo] = useState('');
  const [postCode, setPostCode] = useState('');
  const [ticketCharge, setTicketCharge] = useState();
  const [ticketPrice, setTicketPrice] = useState('0.00');
  const [capacity, setCapacity] = useState('');

  const shouldRender = useRef(true);
  const userData = useSelector((state) => state.user.user);

  /*const handleImageChange = (e) => {
    const image = e.target.files[0];
    if(image) {
        const storage = getStorage(app);
        const storageRef = ref(storage, 'images/'+ image.name);
        uploadBytes(storageRef, image).then((snapshot) => getDownloadURL(snapshot.ref).then((url) => setThumbnail(url)));
      } 
  }*/

  useEffect(() => {
    if(!shouldRender.current) return;
    shouldRender.current = false;

    AddressFinder.watch({
      inputField: '#searchField',
      apiKey: 'ak_m0zxiecxQIHcU5zeCMt5gTiejFWA7',   //only valid for 30 days
      onAddressRetrieved: (address) => {
        setLineOne(address.line_1);
        setLineTwo(address.line_2);
        setPostCode(address.postcode);
      }
    });
  }, []);

  const handleAddress = () => {
    setManual(!manual);
  }

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    if(checked) {
      setSubCategory([...subCategory, value]);
    } else {
      setSubCategory(subCategory.filter((e) => e !== value));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase(app);

    const eventRef = ref(db, 'users/' + userData.id + '/events/' + eventName);

    set(eventRef, {
     eventName, eventDesc, country, subCategory, eventDate, startTime, endTime, venueName, lineOne, lineTwo, postCode, ticketPrice, capacity
    }).then(() => {
      alert('Event created');
      /*setThumbnail('');
      setPicOne('');
      setPicTwo('');
      setPicThree('');*/
      setEventName('');
      setEventDesc('');
      setCountry('');
      setSubCategory([]);
      setEventDate('');
      setStartTime('');
      setEndTime('');
      setVenueName('');
      setLineOne('');
      setLineTwo('');
      setPostCode('');
      setTicketPrice('0.00');
      setCapacity('');
    }).catch((err) => alert(err, 'Ensure all mandatory fields are filled'));

  }

  return (
    <Box component='div'>
      <Navbar title={pages.newEvent.title} leftText={pages.newEvent.leftText} leftIcon={pages.newEvent.leftIcon} link={pages.newEvent.leftLink} user={userData}/>
      <Box component='form' display='flex' marginTop='70px' onSubmit={handleSubmit}>
        <Box component='div' width='50%' margin='10px'>
          <Typography>Event Thumbnail*</Typography>
        </Box>
        <Box component='div' width='50%'>
          <Box component='div' display='flex' flexDirection='column' margin='10px'>
            <TextField 
            sx={{ margin: '5px'}} 
            id="outlined-basic-1" 
            label="Name of the Event" 
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            variant="outlined" 
            helperText='This will be your event’s title. Your title will be used to help create your event’s summary, description, category, and tags, so be speciefic !'
            required/>
            <TextField 
            sx={{ margin: '5px'}} 
            id="outlined-multiline-flexible" 
            label="Event Description" 
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
            multiline 
            maxRows={4} />
            <Typography sx={{ margin: '5px'}}>Event Category</Typography>
            <TextField 
            sx={{ margin: '5px'}} 
            id="outlined-basic-2" 
            label="Choose your country" 
            variant="outlined" 
            helperText='Is this a country specific event?'
            select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required>
                <MenuItem value='nepal'>Nepal</MenuItem>
                <MenuItem value='india'>India</MenuItem>
                <MenuItem value='indonesia'>Indonesia</MenuItem>
                <MenuItem value='america'>America</MenuItem>
            </TextField>
            <FormControl component='fieldset' margin="5px" onChange={handleCheckbox} required>
              <FormLabel component='legend'>Pick a sub category</FormLabel>
              <FormGroup row >
                <FormControlLabel value='music' control={<Checkbox />} label='Music' labelPlacement='end' />
                <FormControlLabel value='sports' control={<Checkbox />} label='Sports' labelPlacement='end' />
                <FormControlLabel value='live-events' control={<Checkbox />} label='live events' labelPlacement='end' />
                <FormControlLabel value='business' control={<Checkbox />} label='Business' labelPlacement='end' />
                <FormControlLabel value='arts' control={<Checkbox />} label='Arts' labelPlacement='end' />
                <FormControlLabel value='shows' control={<Checkbox />} label='Shows' labelPlacement='end' />
                <FormControlLabel value='festival' control={<Checkbox />} label='Festival' labelPlacement='end' />
              </FormGroup>
            </FormControl>
            <Box>
              <Typography>Dates</Typography>
              <TextField 
              sx={{ margin: '5px'}} 
              id="outlined-basic-2"  
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              variant="outlined" 
              required/>
              <TextField 
              sx={{ margin: '5px'}} 
              id="outlined-basic-3" 
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              variant="outlined" 
              required/>
              <Typography component='span'>to</Typography>
              <TextField 
              sx={{ margin: '5px'}} 
              id="outlined-basic-4" 
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              variant="outlined" 
              required/>
            </Box>
            <Typography>Venue</Typography>
            <TextField 
            sx={{ margin: '5px'}} 
            id="outlined-basic-5" 
            label="Enter name of the venue" 
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            variant="outlined" />
            <Typography>Venue Address</Typography>
            <TextField 
            id="searchField"
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>
              }
            }}
            label='Search address/postcode'
            disabled={manual} />
            <Button onClick={handleAddress}>{manual ? 'Search Address or Postcode' : 'Enter address manually'}</Button>
            <Box>
              <TextField label='Address line 1' value={lineOne} onChange={(e) => setLineOne(e.target.value)} variant='outlined' />
              <TextField label='Address line 2' value={lineTwo} onChange={(e) => setLineTwo(e.target.value)} variant='outlined' />
              <TextField label='Post Code' value={postCode} onChange={(e) => setPostCode(e.target.value)} variant='outlined' />
            </Box> 
            <FormControl required>
              <FormLabel component='legend'>Ticket Price</FormLabel>
              <RadioGroup row onChange={(e) => setTicketCharge(e.target.value)}>
                <FormControlLabel value='1' control={<Radio />} label='Ticket charge' labelPlacement='end' />
                <FormControlLabel value='0' control={<Radio />} label='Free Ticket' labelPlacement='end' />
              </RadioGroup>
              {ticketCharge === '1' ? <TextField slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }
              }} value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} /> : ''}
            </FormControl>
            <TextField 
            sx={{ margin: '5px'}}   
            label='Capacity'
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            variant="outlined" />
            <Button
            type="submit" 
            sx={{ margin: '5px'}} 
            variant="contained">Create Event</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Create
