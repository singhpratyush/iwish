import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import App from './containers/App.container';
// import registerServiceWorker from './registerServiceWorker';
import {config} from './utils/firebase';
import {getStore} from './store';

firebase.initializeApp(config);

TimeAgo.locale(en);

window.login = () => {
	let provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

ReactDOM.render(<Provider store={getStore()}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
