import React from 'react';

import {getUserDetails} from '../../utils/firebase';
import uikitStyles from '../../utils/uikitStyles';
import styles from './css/UserProfile.css';
import WishCard from '../WishCard';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.firebaseDateRef = getUserDetails(this.props.match.params.uid);

		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		this.firebaseDateRef.on('value', snapshot => {
			this.props.userActions.loadUserInfo(this.props.match.params.uid, snapshot.val());
		})
	}

	componentWillUnmount() {
		this.firebaseDateRef.off();
	}

	logout() {
		window.logout();
	}

	render() {
		return <div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l']].join(' ')}>
				<div style={{padding: '32px', display: 'flex', justifyContent: 'space-between'}}>  {/* User details */}
					<div>
						<img src={this.props.profileUser.photoURL} alt={''} className={[styles.userImage].join(' ')}/>
						<span className={[uikitStyles['uk-margin-small-left'], uikitStyles['uk-text-large']].join(' ')}>
							{this.props.profileUser.displayName}
						</span>
					</div>
					<div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-column'], uikitStyles['uk-flex-center']].join(' ')}>
						{this.props.authState.isLoggedIn && this.props.authState.user.uid === this.props.match.params.uid &&
							<button className={[styles.logoutButton].join(' ')} onClick={this.logout}>LOGOUT</button>}
					</div>
				</div>
				<div className={[uikitStyles['uk-margin-large-top'], styles.wishList].join(' ')}>
					{Object.keys(this.props.profileUser.wishes).map(key => <WishCard key={key} data={{...this.props.profileUser.wishes[key], id: key}} auth={this.props.authState}/>)}
				</div>
			</div>
		</div>
	}
}

export default UserProfile;
