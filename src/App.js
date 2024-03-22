import React from 'react';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {Navbar, Footer} from './LandingPage/layout';
import {Home} from './LandingPage/homepage';

import {CharacterDetails, Characters} from './Components/Character/Characters';
import {CharacterForm} from './Components/Character/CharacterForm';
import {CharacterEdit} from './Components/Character/CharacterEdit';
import {ChartPage} from './Components/Chart/Chart';
import CssBaseline from '@mui/material/CssBaseline';



export function App() {
  return (
    <>
      <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/characters/add" element={<CharacterForm />} />
          <Route path="/characters/edit/:id" element={<CharacterEdit />} />
          <Route path="/characters/chart" element={<ChartPage />} />
        </Routes>
          <Footer />
        </Router>
      </>
  );
}
