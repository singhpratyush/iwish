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
	return firebase.database().ref(`/users/${user.uid}`).update({
		displayName: user.displayName || '',
		photoURL: user.photoURL || '',
		uid: user.uid,
	});
};

export const createWish = text => {
	let uid = firebase.auth().currentUser.uid;
	let wishObj = {
		user: {
			uid,
			displayName: firebase.auth().currentUser.displayName || '',
			photoURL: firebase.auth().currentUser.photoURL || '',
		},
		createdAt: (new Date()).getTime(),
		text,
		upwishCount: 0,
		upvish: {},
	};
	let newKey = firebase.database().ref('/wishes/').push().key;
	let updates = {};
	updates[`/wishes/${newKey}`] = wishObj;
	updates[`/users/${uid}/wishes/${newKey}/`] = wishObj;

	return firebase.database().ref().update(updates);
};

export const getUserDetails = uid => {
	return firebase.database().ref(`/users/${uid}/`);
}

export const getTrendingWishes = uid => {
	let now = new Date();
	let dayAgo = now.setDate(now.getDate() - 1).getTime();
	return firebase.database().ref('/wishes/').orderByChild('createdAt').startAt(dayAgo).orderByChild('upwishCount');
}
