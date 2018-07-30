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
		this.deleteWish = this.deleteWish.bind(this);
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

	getDonationButton() {
		if (this.props.data.paypalUser) {
			return (
			<a
				href={`https://paypal.me/${this.props.data.paypalUser}`}
				target="_blank"
				style={{fontSize: '12px', letterSpacing: '1.02px', color: colors.primary.textOn, padding: '11px 16px'}}
			>
				Donate
			</a>
			)
		}
	}

	deleteWish() {
		const { uid } = this.props.data.user;
		const { id } = this.props.data;
		this.props.onDelete(id, uid);
	}

	getDeleteButton() {
		if (!this.props.auth.isLoggedIn) {
			return;
		}
		if (this.props.data.user.uid !== this.props.auth.user.uid) {
			return;
		}
		return <span style={{ cursor: 'pointer' }} onClick={this.deleteWish}>
			<svg style={{ width: 14, height: 14, color: 'red' }} aria-hidden="true" data-prefix="fas" data-icon="trash" className="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
				<path fill="currentColor" d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"></path>
			</svg>
		</span>
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
				<div className={[uikitStyles['uk-flex']].join(' ')}>
				<div className={[uikitStyles['uk-flex'], styles.upwishContainer].join(' ')} onClick={this.upwishToggle}>
					<div className={[styles.upwishButton, userHasWished ? styles.upwished : ''].join(' ')}>
						<img src={upwishImage} alt={'^'} style={{width: '12px'}}/>
					</div>
					<div style={{fontSize: '12px', letterSpacing: '1.02px', color: colors.primary.textOn, padding: '11px 16px'}}>
						<span>UPWISH</span>
						<span style={{marginLeft: '8px'}}>{Object.keys(this.props.data.upwishes || {}).length}</span>
					</div>
				</div>
				{this.getDonationButton()}
				</div>
				<div>
					{this.getDeleteButton()}
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
