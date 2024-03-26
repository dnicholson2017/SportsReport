import React from "react";
import { useParams } from "react-router-dom";

const NbaPlayerDetail = () => {

    const { player_id } = useParams();

    return (
        <div>
            hello
        </div>
    )
}

export default NbaPlayerDetail;