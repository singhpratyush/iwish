import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

import {listenToAuthState, getTrendingWishes, getLatestWishes} from './utils/firebase';

// Components
import Header from './containers/Header.container';
import CreateWish from './containers/CreateWish.container';
import UserProfile from './containers/UserProfile.container';
import WishList from './containers/WishList.container';

class App extends React.Component {
	constructor(props) {
		super(props);
		listenToAuthState(this.props.authActions.login, this.props.authActions.logout);
	}

  render() {
    return <BrowserRouter>
			<div>
				<Route component={Header}/>
				<Switch>
					<Route exact path='/' render={() => <Redirect to='/trending'/>}/>
					{/* Type of list */}
					<Route exact path='/trending' render={() => <WishList category='trending' getDatabaseRef={getTrendingWishes}/>}/>
					<Route exact path='/latest' render={() => <WishList category='latest' getDatabaseRef={getLatestWishes}/>}/>
					<Route exact path='/@:uid' component={UserProfile}/>
					{!this.props.authState.isLoggedIn && <Redirect to='/'/>}
					<Route exact path='/me' render={() => <Redirect to={`/@${this.props.authState.user.uid}`}/>}/>
				</Switch>
				<CreateWish/>
			</div>
		</BrowserRouter>
  }
}

App.propTypes = {
	authActions: PropTypes.objectOf(PropTypes.func).isRequired,
	authState: PropTypes.object.isRequired,
}

export default App;
