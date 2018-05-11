import * as firebase from 'firebase';

export const config = {
	apiKey: "AIzaSyCj1SINopLQvWVTamo3rWjlmf59O5BRvtg",
	authDomain: "wishqus-com.firebaseapp.com",
	databaseURL: "https://wishqus-com.firebaseio.com",
	projectId: "wishqus-com",
	storageBucket: "wishqus-com.appspot.com",
	messagingSenderId: "240880559496"
};

export const listenToAuthState = (onLogIn, onLogOut) => firebase.auth()
	.onAuthStateChanged(user => user ? onLogIn(user) : onLogOut());
