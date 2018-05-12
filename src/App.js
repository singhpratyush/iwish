import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {listenToAuthState} from './utils/firebase';
import uikitStyles from './utils/uikitStyles';

// Components
import Header from './containers/Header.container';
import CreateWish from './containers/CreateWish.container';

class App extends React.Component {
	constructor(props) {
		super(props);
		listenToAuthState(this.props.authActions.login, this.props.authActions.logout);
	}

  render() {
    return <BrowserRouter>
			<div>
				<Header/>
				<div className={[uikitStyles['uk-container']].join((' '))}>
					{this.props.authState.isLoggedIn ? <CreateWish/> : 'Log in to wishqus.'}
				</div>
			</div>
		</BrowserRouter>
  }
}

App.propTypes = {
	authActions: PropTypes.objectOf(PropTypes.func).isRequired,
	authState: PropTypes.object.isRequired,
}

export default App;
