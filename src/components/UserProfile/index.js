import React from 'react';

import {getUserDetails} from '../../utils/firebase';
import uikitStyles from '../../utils/uikitStyles';
import styles from './css/UserProfile.css';
import WishCard from '../WishCard';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.firebaseDateRef = getUserDetails(this.props.match.params.uid);
	}

	componentDidMount() {
		this.firebaseDateRef.on('value', snapshot => {
			this.props.userActions.loadUserInfo(this.props.match.params.uid, snapshot.val());
		})
	}

	componentWillUnmount() {
		this.firebaseDateRef.off();
	}

	render() {
		return <div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-3-4@m'],
				uikitStyles['uk-width-2-3@l'], uikitStyles['uk-padding']].join(' ')}>
				<div className={[uikitStyles['uk-card-default'], uikitStyles['uk-padding']].join(' ')}>  {/* User details */}
					<img src={this.props.profileUser.photoURL} alt={''} className={[styles.userImage].join(' ')}/>
					<span className={[uikitStyles['uk-margin-small-left'], uikitStyles['uk-text-large']].join(' ')}>
						{this.props.profileUser.displayName}
					</span>
				</div>
				<div className={[uikitStyles['uk-margin-large-top']].join(' ')}>
					<div className={[uikitStyles['uk-margin-bottom']].join(' ')}>WISHQUSSION BOARD</div>
					{Object.keys(this.props.profileUser.wishes).map(key => <WishCard key={key} data={this.props.profileUser.wishes[key]}/>)}
				</div>
			</div>
		</div>
	}
}

export default UserProfile;
