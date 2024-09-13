import { Box, Typography } from "@mui/material"
import Navbar from "../assets/Navbar"
import { pages } from "../assets/pages"
import { useSelector } from "react-redux";

function EventDetail() {

  const userData = useSelector(
    (state) => state.user.user
  );

  const eventData = useSelector((state) => state.eventData.eventData);

  return (
    <Box component='div'>
      <Navbar title={pages.event.title} leftText={pages.event.leftText} leftIcon={pages.event.leftIcon} link={pages.event.leftLink} user={userData} />
      <Box component='div' marginTop='75px'>
        <Typography variant="h1">{eventData.eventName}</Typography>
        <Typography variant="body1">{eventData.eventDesc}</Typography>
        <Typography variant="body2">Location: {eventData.venueName},{eventData.lineOne},{eventData.lineTwo}{eventData.postCode}, {eventData.country}</Typography>
        <Typography variant="body2">{eventData.eventDate}, {eventData.startTime} to {eventData.endTime}</Typography>
        {eventData.subCategory.map((category, i) => <Typography key={i}>{category}</Typography>)}
        <Typography variant="body1">{eventData.capacity} Capacity</Typography>
        <Typography variant="body1">Charge: £{eventData.ticketPrice}</Typography>
      </Box>
    </Box>
  )
}

export default EventDetail
