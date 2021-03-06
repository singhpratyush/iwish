import React from 'react';
import ContentLoader from 'react-content-loader';

import { getUserDetails, setUserPaypal, deleteWish } from '../../utils/firebase';
import uikitStyles from '../../utils/uikitStyles';
import styles from './css/UserProfile.css';
import WishCard from '../WishCard';
import WishLoading from '../WishCard/WishLoading';

class UserProfile extends React.Component {
	constructor(props) {
		super(props);
		this.firebaseDateRef = getUserDetails(this.props.match.params.uid);

		this.state = { loading: true };
		this.logout = this.logout.bind(this);
		this.setPaypal = this.setPaypal.bind(this);
		this.focusPaypal = this.focusPaypal.bind(this);
	}

	componentDidMount() {
		this.firebaseDateRef.on('value', snapshot => {
			this.props.userActions.loadUserInfo(this.props.match.params.uid, snapshot.val());
			this.setState({ loading: false });
		})
	}

	componentWillUnmount() {
		this.firebaseDateRef.off();
	}

	logout(e) {
		e.preventDefault();
		window.logout();
	}

	setPaypal(event) {
		setUserPaypal(this.props.profileUser.uid, event.target.value);
	}

	focusPaypal() {
		const element = document.getElementById("paypal-input");
		if (element) {
			element.focus();
		}
	}

	getImage() {
		return this.state.loading
			? (
				<div style={{ width: 96 }}>
					<ContentLoader width={96} height={96} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
						<circle cx={96 / 2} cy={96 / 2} r={96 / 2} />
					</ContentLoader>
				</div>
			)
			: <img src={this.props.profileUser.photoURL} alt={''} className={[styles.userImage].join(' ')} />;
	}

	getPayPal() {
		if (this.state.loading) {
			return (
				<div style={{ fontSize: 16, alignContent: 'center', marginTop: 8, width: 128 }}>
					<ContentLoader width={128} height={24} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
						<rect x={0} y={0} height={24} width={128} />
					</ContentLoader>
				</div>
			);
		}
		return (
			<div className={uikitStyles['uk-flex']} style={{ fontSize: 16, alignContent: 'center', marginTop: 8 }}>
				paypal.me/
				{
					this.props.authState.isLoggedIn && this.props.authState.user.uid === this.props.match.params.uid
						? this.props.authState.isLoggedIn && (
							<span>
								<input
									value={this.props.profileUser.paypal || ''}
									onChange={this.setPaypal}
									className={[styles.paypalInput, uikitStyles['uk-margin-small-right']].join(' ')}
									id="paypal-input"
								/>
								<svg onClick={this.focusPaypal} style={{ color: 'black', height: 16, marginTop: '-8px', cursor: 'pointer' }} aria-hidden="true" data-prefix="fas" data-icon="pen" className="svg-inline--fa fa-pen fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"></path></svg>
							</span>
						)
						: <span>{this.props.profileUser.paypal || ''}</span>
				}
			</div>
		);
	}

	getName() {
		if (this.state.loading) {
			return (
				<div style={{ width: 160 }}>
					<ContentLoader width={160} height={36} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
						<rect x={0} y={0} height={36} width={160} />
					</ContentLoader>
				</div>
			);
		}

		return this.props.profileUser.displayName;
	}

	render() {
		return <div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l']].join(' ')}>
				<div style={{ padding: '64px 24px 32px 24px', display: 'flex', justifyContent: 'space-between' }}>  {/* User details */}
					<div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-column']].join(' ')}>
						{this.getImage()}
						<div className={[uikitStyles['uk-margin-small-top']].join(' ')}>
							<div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-middle']].join(' ')}>
								<div className={[uikitStyles['uk-margin-small-right'], uikitStyles['uk-text-large']].join(' ')}>{this.getName()}</div>
								<div>
									{this.props.authState.isLoggedIn && this.props.authState.user.uid === this.props.match.params.uid &&
										<a onClick={this.logout}>Logout</a>}
								</div>
							</div>
							{this.getPayPal()}
						</div>
					</div>
				</div>
				<div className={[uikitStyles['uk-margin-top'], styles.wishList].join(' ')} style={{ backgroundColor: 'white' }}>
					{this.state.loading && <WishLoading />}
					{Object.keys(this.props.profileUser.wishes)
						.sort((a, b) => this.props.profileUser.wishes[b].createdAt - this.props.profileUser.wishes[a].createdAt)
						.map(key => (
							<WishCard
								key={key}
								data={{ ...this.props.profileUser.wishes[key], id: key }}
								auth={this.props.authState}
								onDelete={deleteWish}
							/>
						))
					}
				</div>
			</div>
		</div>
	}
}

export default UserProfile;
