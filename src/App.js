import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/faceRecognition/FaceRecognition';
import Clarifai from 'clarifai';

const particlesOption = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: 'b9f7c6ccb3e74b07a9a10683a15fb4d6'
 });
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
    console.log(box);
  }

  onSubmit = () => {
    this.setState( {imageUrl: this.state.input} )
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input)
       .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
       .catch(err => console.log(err))
    }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  render() {
    return (
      <div className="App">
      <Particles 
         params={particlesOption}
         className='particles'
      />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
