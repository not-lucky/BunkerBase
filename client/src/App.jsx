import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx"
import LoginPage from './scenes/loginPage/index.jsx';
import ProfilePage from './scenes/profilePage/index.jsx';

import './App.css';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile/:userID' element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
