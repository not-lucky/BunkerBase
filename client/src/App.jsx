import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/index.jsx"
import LoginPage from './scenes/loginPage/index.jsx';
import ProfilePage from './scenes/profilePage/index.jsx';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import Navbar from "./scenes/navbar/index.jsx";

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);


  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/nav' element={<Navbar />} />
          <Route path='/profile/:userID' element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
