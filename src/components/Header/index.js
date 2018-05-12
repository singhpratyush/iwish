import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import headerStyles from './css/header.css';
import uikitStyles from '../../utils/uikitStyles';
import SignInButton from './SignInButton';
import UserImage from './UserImage';

class Header extends React.Component {
	render() {
		return <nav className={[uikitStyles['uk-navbar-container'], uikitStyles['uk-margin'],
			uikitStyles['uk-padding'], uikitStyles['uk-padding-remove-top'],
			uikitStyles['uk-padding-remove-bottom'], headerStyles.headerContainer].join(' ')} uk-navbar='true'>
			<div className={[uikitStyles['uk-navbar-left']].join(' ')}>
				<Link to='/' className={[uikitStyles['uk-navbar-item'], uikitStyles['uk-logo'],
					uikitStyles['uk-text-primary']].join(' ')}>
					WISHQUS
				</Link>
				<span className={[uikitStyles['uk-text-muted']].join(' ')}>
					I wish that too!
				</span>
				<div className={[uikitStyles['uk-navbar-right']].join(' ')}>
					{this.props.auth.isLoggedIn ? <UserImage photoURL={this.props.auth.user.photoURL}/> : <SignInButton/>}
				</div>
			</div>
		</nav>
	}
}

Header.propTypes = {
	auth: PropTypes.object.isRequired,
}

export default Header;
