import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import {listenToAuthState} from './utils/firebase';

// Components
import Header from './containers/Header.container';
import CreateWish from './containers/CreateWish.container';
import UserProfile from './containers/UserProfile.container';

class App extends React.Component {
	constructor(props) {
		super(props);
		listenToAuthState(this.props.authActions.login, this.props.authActions.logout);
	}

  render() {
    return <BrowserRouter>
			<div>
				<Header/>
				<Switch>
					<Route exact path='/' render={() =>
						this.props.authState.isLoggedIn ? <CreateWish/> : ''}/>
					<Route exact path='/@:uid' component={UserProfile}/>
				</Switch>
			</div>
		</BrowserRouter>
  }
}

App.propTypes = {
	authActions: PropTypes.objectOf(PropTypes.func).isRequired,
	authState: PropTypes.object.isRequired,
}

export default App;
