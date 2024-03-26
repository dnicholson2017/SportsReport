import React from "react";
import NbaPlayers from "../components/nba-players";
import './NbaPlayerView.css';

const PlayerView = () => {

    return (
        <div className="player-parant-component">
            <NbaPlayers />
        </div>
    )

}

export default PlayerView;