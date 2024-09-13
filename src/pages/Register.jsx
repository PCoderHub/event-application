import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { app, auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, push} from 'firebase/database';
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState('');
  const [brief, setBrief] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = getDatabase(app);

    createUserWithEmailAndPassword(auth, email, password).then(() => {
      alert('Organiser Account created');
      set(push(ref(db, 'users/')), {
        name, brief, email, phoneNumber, password
      }).then((res) => {
        console.log(res);
        navigate('/');
      }).catch((error) => alert('error: ', error.message));
    }).catch(err => alert(err.message));
  }

  return (
    <Box 
    component='div' 
    sx={{ display: 'flex'}}>
      <Box 
      component='div' 
      sx={{ 
        width: '50%', 
        marginTop: '10%', 
        marginLeft: '10%'}}>
        <Typography variant="h2">Welcome to the <br/><span style={{ color: '#484bcf'}}>Organiser Side</span></Typography>
      </Box>
      <Box 
      component='div' 
      sx={{ 
        width: '50%', 
        marginTop: '5%', 
        marginLeft: '10%'}}>
        <Card 
        component='form' 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          width: '50%', 
          padding: '20px'
          }}>
          <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'center', 
            margin: '5px'
            }}>Organizer Registration</Typography>
          <TextField 
          sx={{ margin: '5px'}} 
          id="outlined-basic-1" 
          label="ORGANISER NAME" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          variant="outlined" 
          required />
          <TextField 
          sx={{ margin: '5px'}} 
          id="outlined-multiline-flexible" 
          label="BRIEF" 
          value={brief} 
          onChange={(e) => setBrief(e.target.value)} 
          multiline 
          maxRows={4} 
          required/>
          <TextField 
          sx={{ margin: '5px'}} 
          id="outlined-basic-2" 
          label="EMAIL ADDRESS" 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          variant="outlined" 
          required/>
          <TextField 
          sx={{ margin: '5px'}} 
          id="outlined-basic-3" 
          label="PHONE NUMBER" 
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          variant="outlined" 
          required/>
          <TextField 
          sx={{ margin: '5px'}} 
          id="outlined-basic-4" 
          label="PASSWORD (atleast 6 characters)" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          variant="outlined" 
          required/>
          <Button 
          type="submit" 
          sx={{ margin: '5px'}} 
          variant="contained">Register as an Organizer</Button>
          <Link to='/'>
          <Typography 
          sx={{ 
            margin: '5px', 
            textAlign: 'center'
            }} 
          variant="caption">Already an Organizer? Login Here</Typography>
          </Link>
        </Card>
      </Box>
    </Box>
  )
}

export default Register
