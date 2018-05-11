import React from 'react';
import * as firebase from 'firebase';

class SignInButton extends React.Component {

	onSignInClick() {
		let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(result => {
			console.log(result);
		}).catch(err => {
			console.log(err);
		})
	}

  render() {
    return <div onClick={this.onSignInClick.bind(this)}>SIGN IN</div>
  }
}

export default SignInButton;
