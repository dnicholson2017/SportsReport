import React, { useState } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Navbar from './components/navbar';
import Carousel from "./components/carousel";
import RightRail from "./components/right-rail";
import LeftRail from "./components/left-rail";
import Card from "./components/card";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Carousel/>
      <Navbar/>
      <div class="container">
        <LeftRail/>
        <Card/>
        <RightRail/>
      </div>
    </div>
  );
}

export default App;

