import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"  // add here so it is available in all components
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NbaView from './routes/NbaTeamView.jsx'
import PlayerView from './routes/NbaPlayerView.jsx'
import NbaPlayerDetail from './components/nba-player-details.jsx'
import BoxScoreView from './routes/BoxScoreView.jsx'
import Login from './components/Login.jsx'
import CreateUser from './routes/CreateUser.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/sign-up' element={<CreateUser/>} />
      <Route path='/:username' element={<App/>} />
      <Route path='/:username/nba-team/:team_code' element={<NbaView />} />
      <Route path='/:username/nba-players' element={<PlayerView />} />
      <Route path='/:username/nba-players/:player_id' element={<NbaPlayerDetail />} />
      <Route path='/:username/box-score' element={<BoxScoreView />} />
    </Routes>
  </BrowserRouter>
)
