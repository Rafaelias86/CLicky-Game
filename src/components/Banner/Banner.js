import React from "react";
import "./Banner.css";

const Banner = () => (
  <div className="jumbotron jumbotron-fluid ">
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 offset-md-right-2">
          <h1>Clicky Game!</h1>
          <h5>Click on a GIF to earn points, but don't click on any more than once!</h5>
        </div>
    </div>
    </div>
  </div>
);
export default Banner;