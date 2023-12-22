// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Calculation from './Components/Calculation';
import InvestmentCalculator from './Components/InvestmentCalculator';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/miniprjt" element={<Calculation/>}/>
        <Route path="/" element={<About/>} />
        <Route path="/calculation" element={<Calculation />} />
        <Route path="/InvestmentCalculator" element={<InvestmentCalculator/>}/>
      </Routes>
    </Router>
  );
};

export default App;
