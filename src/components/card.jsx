import React from "react";

let Card = (props) => {
  return (
    <div>
      {props.list2 && props.list2.items.map((item, index) => (
        <div className="card" style={{width: '18rem'}} key={index}>
          <img src={item.snippet.thumbnails.default.url} className="card-img-top" alt="Thumbnail"/>
          <div className="card-body">
            <h5 className="card-title">{item.snippet.title}</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Card;