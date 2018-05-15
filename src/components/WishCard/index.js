import React from 'react';
import TimeAgo from 'react-time-ago';
import {Link} from 'react-router-dom';

import styles from './css/WishCard.css';
import uikitStyles from '../../utils/uikitStyles';
import {colors} from '../../utils/styles';
import * as firebaseUtils from '../../utils/firebase';
import upwishImage from './img/upwish.png';

class WishCard extends React.Component {

	constructor(props) {
		super(props);
		this.upwishToggle = this.upwishToggle.bind(this);
	}

	upwish(unUpwish = false) {
		let wishId = this.props.data.id;
		let	authorUid = this.props.data.user.uid;
		let	uid = this.props.auth.user.uid;
		unUpwish ? firebaseUtils.unUpwish(wishId, authorUid, uid) : firebaseUtils.upwish(wishId, authorUid, uid);
	}

	upwishToggle() {
		if (!this.props.auth.isLoggedIn) {
			window.login();
			return;
		}
		let upwishes = this.props.data.upwishes;
		if (!upwishes) {
			this.upwish();
			return;
		}
		let userHasWished = upwishes[this.props.auth.user.uid];
		this.upwish(userHasWished);
	}

	render() {
		let upwishes = this.props.data.upwishes || {};
		let userHasWished = false;
		if (this.props.auth.isLoggedIn) {
			userHasWished = upwishes[this.props.auth.user.uid];
		}
		return <div className={[styles.wishContainer].join(' ')}>
			<div style={{fontSize: '24px', lineHeight: '32px', minHeight: '64px', marginBottom: '24px'}}>
				<span style={{color: colors.primary.textOn}}>I wish </span> {this.props.data.text}
			</div>
			<div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-between']].join(' ')}>
				<div className={[uikitStyles['uk-flex'], styles.upwishContainer].join(' ')} onClick={this.upwishToggle}>
					<div className={[styles.upwishButton, userHasWished ? styles.upwished : ''].join(' ')}>
						<img src={upwishImage} alt={'^'} style={{width: '12px'}}/>
					</div>
					<div style={{fontSize: '12px', letterSpacing: '1.02px', color: colors.primary.textOn, padding: '11px 16px'}}>
						<span>UPWISH</span>
						<span style={{marginLeft: '8px'}}>{Object.keys(this.props.data.upwishes || {}).length}</span>
					</div>
				</div>
				<div>
					<TimeAgo style={{letterSpacing: '0.93px', fontSize: '12px', margin: '14px'}}>{this.props.data.createdAt}</TimeAgo>
					<Link to={`/@${this.props.data.user.uid}`}>
						<img src={this.props.data.user.photoURL} className={[styles.userImage].join(' ')} alt={'.'}/>
					</Link>
				</div>
			</div>
		</div>
	}
}

export default WishCard;
