import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navigation from './components/Navigation'
import CreateCrewmate from './components/CreateCrewmate'
import CrewmateGallery from './components/CrewmateGallery'
import CrewmateDetails from './components/CrewmateDetails'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<CrewmateGallery />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="crewmates/:id" element={<CrewmateDetails />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
