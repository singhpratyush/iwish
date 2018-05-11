import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';

import App from './containers/App.container';
// import registerServiceWorker from './registerServiceWorker';
import {config} from './utils/firebase';
import {getStore} from './store';

firebase.initializeApp(config);

ReactDOM.render(<Provider store={getStore()}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
