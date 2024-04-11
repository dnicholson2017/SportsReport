import React, { useState } from "react";
import NbaNews from '../assets/response.json';

const RightRail = () => {

    return (
        <div>
            <h3> League News </h3>
            <div>
                {NbaNews && NbaNews.map((item, index) => (
                    <ul key={index}>
                        <li>
                            {item.headline}
                        </li>
                    </ul>
                ))}
            </div>
        </div>

    )
}

export default RightRail;