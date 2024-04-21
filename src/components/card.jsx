import React from "react";

let Card = (props) => {
  return (
    <div>
      {props.list2 && props.list2.items.map((item, index) => (
        <div className="card" style={{width: '18rem'}} key={index}>
          {/* Embedding YouTube video */}
          <iframe 
            width="100%" 
            height="auto" 
            src={`https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            title="YouTube Video"
          ></iframe>
          <div className="card-body">
            <h5 className="card-title">{item.snippet.title}</h5>
            {/* You can add any additional content or functionality here */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card;
