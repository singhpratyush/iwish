import React from 'react';
import * as firebase from 'firebase';

import googleLogo from './GoogleLogo.png';
import styles from './css/signInButton.css';

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
    return <div onClick={this.onSignInClick.bind(this)} className={[styles.signInContainer].join(' ')}>
			<img src={googleLogo} alt={'Google Sign In'} className={styles.googleLogo}/>
		</div>
  }
}

export default SignInButton;
