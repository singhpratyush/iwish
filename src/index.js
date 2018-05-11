import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import {config} from './utils/firebase';

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
