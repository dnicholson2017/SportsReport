import React from "react";

let LeftRail = (props) => {
    return (
        <div>
            {props.nbaList && 
                props.nbaList
                    .filter(item => item.status.short !== "NS") // Filter out games with "Not Started" status
                    .map((item, index) => (
                        <div key={index}>
                            <div>
                                <img src={item.teams.home.logo} width={50} height={50}/>
                                <h5>{item.scores.home.total}</h5>
                                <h5>{item.teams.home.name}</h5>
                            </div>
                            <div>
                                <img src={item.teams.away.logo} width={50} height={50}/>
                                <h5>{item.scores.away.total}</h5>
                                <h5>{item.teams.away.name}</h5>
                            </div>
                        </div>
                    ))}
        </div>
    )
}

export default LeftRail;