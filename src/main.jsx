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

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/nba-team/:team_code' element={<NbaView />} />
      <Route path='/nba-players' element={<PlayerView />} />
      <Route path='/nba-players/:player_id' element={<NbaPlayerDetail />} />
      <Route path='/box-score' element={<BoxScoreView />} />
    </Routes>
  </BrowserRouter>
)
