import React from 'react';
import Home from './components/Home';
import {
  BrowserRouter as 
  BrowserRouter
} from "react-router-dom";
import './devices.min.css'

function App() {
  return (
    <BrowserRouter>
        <Home />
    </BrowserRouter>
  );
}

export default App;
