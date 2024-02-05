import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import './App.css';
// import IndexHtml from './pages/index'
import Home from './pages/home'
import './assets/gsap-brand.css';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
