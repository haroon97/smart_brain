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
      imageUrl: ''
    }
  }

  onSubmit = () => {
    this.setState( {imageUrl: this.state.input} )
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
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
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
