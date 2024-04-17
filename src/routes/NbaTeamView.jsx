import React from "react";
import NbaTeamDetail from "../components/nba-team-detail";
import Navbar from "../components/navbar";

const NbaView = () => {

    return (
        <div>
            <Navbar />
            <NbaTeamDetail />
        </div>
    )
}

export default NbaView;