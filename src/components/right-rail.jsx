import React, { useState } from "react";
import NbaNews from '../assets/response.json';

const RightRail = () => {

    return (
        <div>
            Right rail
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