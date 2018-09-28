import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userPassword: ''
    }
  }

  onNameChange = (e) => {
    this.setState({userName: e.target.value});
  }

  onEmailChange = (e) => {
    this.setState({userEmail: e.target.value});
  }

  onPasswordChange = (e) => {
    this.setState({userPassword: e.target.value});
  }

  onRegisterSubmit = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.userName,
        email: this.state.userEmail,
        password: this.state.userPassword
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data !== 'Error') {
        this.props.onRouteChange('home')
      };
    });
  };

  render() {
    return (
      <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input required  onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input required  onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input required onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
              </div>
            </fieldset>
            <div className="center">
              <input onClick={this.onRegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
            </div>
      </main>
    </article>
    </div>
    );
  }
}

export default Register;