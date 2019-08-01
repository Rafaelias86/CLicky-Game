import React, { Component } from "react";
import elements from "./elements.json";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ImgBlockLis from "./components/ImgBlockLis";
import Footer from "./components/Footer";


class App extends Component {
	state = {
    elements,
    clickedImages: [],
    score: 0,
    topScore: 0,
    feedback: "Click a GIF to begin!",
    gameStatus: 0 //gameStatus: 0 => game in progresss, 1 => game won, 2 => game lost
  };

  componentDidMount() {
    this.setState({
      image: this.shuffle(this.state.image)
    }, () => {
      console.log("Shuffled the images on game start");
    });
  }

  handleClick = event => {
    // console.log(event.target); // example output => <img class="col-md-3 col-sm-4 col-xs-12 pb-4 imageBlock" src="/static/media/alchemist.ce4808c0.png" alt="alchemist.png">
    // console.log(event.target.alt); // example output => alchemist.png
    const clickedImage = event.target.alt;
    // console.log("The clicked image is: " + clickedImage);
    // console.log("state BEFORE: " + JSON.stringify(this.state));
    const wasImageClickedBefore = this.imageClickedBefore(clickedImage);
    if (wasImageClickedBefore) {
      this.setState({
        image: this.shuffle(this.state.image),
        // image: this.state.image, //for debugging only
        clickedImages: [],
        score: 0,
        feedback: "Game Over! You Guessed The Same Image Twice!",
        gameStatus: 2
      }, () => {
        // console.log("IF block state AFTER GAME OVER: " + JSON.stringify(this.state));
      });
    } else {
      let newScore = this.state.score + 1;
      if (newScore === this.state.image.length) {
        this.setState({
        image: this.shuffle(this.state.image),
        // image: this.state.image, //for debugging only
          clickedImages: [],
          score: 0,
          topScore: newScore,
          feedback: "Congrats! You Have Guessed All Of The Images Correctly!",
          gameStatus: 1
          });
      } else {
        const clickedImagesCopy = this.state.clickedImages.slice();
        clickedImagesCopy.push(clickedImage);
        const newTopScore = (newScore > this.state.topScore) ? newScore : this.state.topScore;
        this.setState({
        image: this.shuffle(this.state.image),
        // image: this.state.image, //for debugging only
          clickedImages: clickedImagesCopy,
          score: newScore,
          topScore: newTopScore,
          feedback: "Yes! You Guessed The Image Correctly!",
          gameStatus: 0
          }, () => {
          // console.log("IF block state AFTER CORRECT GUESS: " + JSON.stringify(this.state));
        });
      }
    }
  };

  imageClickedBefore = (clickedImage) => {
  	for (let index=0; index<this.state.clickedImages.length; index++) {
  		if (this.state.clickedImages[index] === clickedImage) {
        return true;
      }
    }
    return false;
  };

  // Fisher-Yates (aka Knuth) Shuffle algorithm implementation to shuffle images to display in the UI
  // Copied from stackoverflow post:
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  render() {
   return (
    <div>
      <Navbar 
        score={this.state.score} 
        topScore={this.state.topScore} 
        feedback={this.state.feedback} 
        gameStatus={this.state.gameStatus} />
      <Banner />
      <ImgBlockLis   
        image={this.state.image} 
        clickHandler={this.handleClick} 
        gameStatus={this.state.gameStatus} />
      <Footer />
    </div>
    );
  }
}

export default App;
