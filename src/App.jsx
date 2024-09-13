import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Create from './pages/Create';
import EventDetail from './pages/EventDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux_toolkit/store';
import EditEvent from './pages/EditEvent';

function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/detail' element={<EventDetail/>}></Route>
        <Route path='/edit' element={<EditEvent/>}></Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
