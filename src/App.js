import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {listenToAuthState} from './utils/firebase';

// Components
import Header from './containers/Header.container';

class App extends React.Component {
	constructor(props) {
		super(props);
		listenToAuthState(this.props.authActions.login, this.props.authActions.logout);
	}

  render() {
    return <BrowserRouter>
			<Header/>
		</BrowserRouter>
  }
}

App.propTypes = {
	authActions: PropTypes.objectOf(PropTypes.func).isRequired,
}

export default App;
