import React from "react";
import "./ImgBlock.css";

const ImgBlock = (props) => (
  <img 
  className={"col-md-3 col-sm-4 col-xs-12 pb-4 imgBlock " + (props.gameStatus == "2" ? " gameLost" : (props.gameStatus == "1" ? " gameWon" : ""))} 
  src={props.image} 
  alt={props.alt} height={props.imgBlockHeight} width={props.imgBlockWidth} 
  onClick={props.clickHandler} 
  />
);

export default ImgBlock;