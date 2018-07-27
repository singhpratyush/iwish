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

export const createWish = (text, paypalUser = null) => {
	let uid = firebase.auth().currentUser.uid;
	let wishObj = {
		user: {
			uid,
			displayName: firebase.auth().currentUser.displayName || '',
			photoURL: firebase.auth().currentUser.photoURL || '',
		},
		createdAt: (new Date()).getTime(),
		text,
		upwish: {},
	};
	if (paypalUser) {
		wishObj.paypalUser = paypalUser;
	}
	let newKey = firebase.database().ref('/wishes/').push().key;
	let updates = {};
	updates[`/wishes/${newKey}`] = wishObj;
	updates[`/users/${uid}/wishes/${newKey}/`] = wishObj;

	return firebase.database().ref().update(updates);
};

export const setUserPaypal = (uid, paypal) => firebase.database()
	.ref(`/users/${uid}/`).update({ paypal });

export const getUserDetails = uid => {
	return firebase.database().ref(`/users/${uid}/`);
}

export const getTrendingWishes = () => {
	let now = new Date();
	now.setDate(now.getDate() - 3);
	let daysAgo = now.getTime();
	return firebase.database().ref('/wishes/').orderByChild('createdAt').startAt(daysAgo);
}

export const getLatestWishes = () => {
	return firebase.database().ref('/wishes/').orderByChild('createdAt').limitToFirst(50);
}

export const upwish = (wishId, authorUid, uid) => {
	let updates = {};
	updates[`/wishes/${wishId}/upwishes/${uid}`] = true;
	updates[`/users/${authorUid}/wishes/${wishId}/upwishes/${uid}`] = true;
	return firebase.database().ref().update(updates);
}

export const unUpwish = (wishId, authorUid, uid) => {
	return Promise.all([
		firebase.database().ref(`/wishes/${wishId}/upwishes/${uid}`).remove(),
		firebase.database().ref(`/users/${authorUid}/wishes/${wishId}/upwishes/${uid}`).remove()
	]);
}

export const getWishSuggestions = () => {
	return firebase.database().ref('/suggestions');
}
