import React from 'react';
import firebaseui from 'firebaseui';
import * as firebase from 'firebase';

class SignInButton extends React.Component {
  constructor(props) {
		super(props);
    if (!window.authUi) {
      window.authUi = new firebaseui.auth.AuthUI(firebase.auth());
		}
  }

  componentDidMount() {
    let uiConfig = {
      signInSuccessUrl: '#',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    // The start method will wait until the DOM is loaded.
    window.authUi.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return <div id={'firebaseui-auth-container'}></div>
  }
}

export default SignInButton;
