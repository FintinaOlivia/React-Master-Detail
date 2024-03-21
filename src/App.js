import React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Navbar, Footer} from './LandingPage/layout';
import {Home} from './LandingPage/homepage';

import {CharacterDetails, Characters} from './Components/Character/Characters';
import {CharacterForm} from './Components/Character/CharacterForm';
import {CharacterEdit} from './Components/Character/CharacterEdit';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
      primary: {
          main: '#ff5722', // Orange accent color
      },
      }
      // background: {
      //     default: '#00838f', // Navy blue background color
      // },
      // text: {
      //     primary: '#ffffff', // White font color
      // },
  },
);

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/characters/add" element={<CharacterForm />} />
          <Route path="/characters/edit/:id" element={<CharacterEdit />} />
        </Routes>
          <Footer />
        </Router>
    </ThemeProvider>
  );
}
