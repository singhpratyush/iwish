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

export const saveUser = user => {
	firebase.database().ref(`/users/${user.uid}`).update({
		displayName: user.displayName || '',
		photoURL: user.photoURL || '',
		uid: user.uid,
	});
};

export const createWish = text => {
	let wishObj = {
		user: {
			uid: firebase.auth().currentUser.uid,
			displayName: firebase.auth().currentUser.displayName || '',
			photoURL: firebase.auth().currentUser.photoURL || '',
		},
		createdAt: (new Date()).getTime(),
		text,
	};
	firebase.database().ref(`/wishes/`).push(wishObj);
	firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/wishes/`).push(wishObj);
};
