import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
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
      box: {},
      route: 'signin',
      isSignedIn: false,
      user:  {
        id: '',
        name: '',
        email: '',
        password: '',
        userSince: new Date().getTime(),
        submissions: 0
      }
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
  }

  onSubmit = () => {
    this.setState( {imageUrl: this.state.input} )
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input)
       .then(response => {
         if (response) {
           fetch('http://localhost:3000/image', {
             method: 'put',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({
               id: this.state.user.id
             })
           })
           .then(response => response.json())
           .then(count => {
             this.setState({user: {
               ...this.state.user,
               submissions: count
             }})
           })
         }
         this.displayFaceBox(this.calculateFaceLocation(response))})
       .catch(err => console.log(err))
    }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState( {isSignedIn: false} )
    }
    else if (route === 'home') {
      this.setState( {isSignedIn: true} )
    }
    this.setState( {route: route} )
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
        name: data.name,
        email: data.email,
        userSince: data.userSince,
        submissions: data.submissions
    }})
  }

  render() {
    return (
      <div className="App">
      <Particles 
         params={particlesOption}
         className='particles'
      />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.state.route === 'home' ?
        <div><Logo />
         <Rank userName={this.state.user.name} submissions={this.state.user.submissions}/>
         <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
         <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/></div>
        : (
          this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/> : <Register onRouteChange={this.onRouteChange}  loadUser={this.loadUser}/> 
        )}
      </div>
    );
  }
}

export default App;
