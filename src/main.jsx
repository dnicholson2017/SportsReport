import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"  // add here so it is available in all components
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NbaView from './routes/NbaTeamView.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/nba-team/:team_code' element={<NbaView />} />
    </Routes>
  </BrowserRouter>
)
