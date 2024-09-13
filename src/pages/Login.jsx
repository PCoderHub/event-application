import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase';
import { getDatabase, ref, get} from 'firebase/database';
import { addUserInfo } from '../redux_toolkit/userReducer';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [user, setUser] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      const db = getDatabase(app);
      const userRef = ref(db, 'users/');
      get(userRef).then((snapshot) => {
        if(snapshot.exists()) {
          const userList = snapshot.val();
          const currentUser = Object.values(userList).find((user) => user.email === email);
          const currentUserId = Object.keys(userList).find((id) => userList[id].email === email);
          const presentUser = {...currentUser, id: currentUserId};
          dispatch(addUserInfo(presentUser));
        }
      }).catch((err) => {console.log(err)});
      navigate('/home');
    }).catch(err => alert('Authentication error: Please register if not already done', err.message));
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
        <Typography variant="h2">Welcome to the <br/><span style={{ color: '#484bcf'}}>Organizer End</span></Typography>
      </Box>
      <Box 
      component='div' 
      sx={{ 
        width: '50%', 
        marginTop: '10%', 
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
            }}>LOGIN</Typography>
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
          id="outlined-basic-4" 
          label="PASSWORD" 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          variant="outlined" 
          required/>
          <Button 
          type="submit" 
          sx={{ margin: '5px'}} 
          variant="contained">LOGIN</Button>
          <Link to='/register'>
          <Typography 
          sx={{ 
            margin: '5px', 
            textAlign: 'center'
            }} 
          variant="caption">Don&apos;t have an account? Register Here</Typography>
          </Link>
        </Card>
      </Box>
    </Box>
  )
}

export default Login
