import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navbar, Footer} from './Components/layout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './Components/homepage';
import {Characters} from './Components/characters';
import {Container, ThemeProvider, createTheme} from '@mui/material'


function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters/*" element={<Characters />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#f50057'
    }
    // typography: {
    //   fontFamily: [
    //     'Georgia',
    //     'Quicksand', 
    //     'sans-serif'
    //   ].join(',')
    // }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
