import React from "react";
import "./ImgBlockLis.css";
import ImgBlock from "../ImgBlock";

const ImgBlockLis = (props) => (
	<div className="container">
		<div className="row">
	    {props.images.map((image, index) => {
          return <ImgBlock 
           key={index} 
           image={image} 
           alt={image} 
           clickHandler={props.clickHandler} 
           gameStatus={props.gameStatus} />
	    })}
	  </div>
  </div>
);

export default ImgBlockLis;