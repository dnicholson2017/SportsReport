import React from "react";
import NbaPlayers from "../components/nba-players";
import Navbar from "../components/navbar";
import './NbaPlayerView.css';

const PlayerView = () => {

    return (
        <div className="player-parant-component">
            <Navbar />
            <NbaPlayers />
        </div>
    )

}

export default PlayerView;