import React from 'react';
import PropTypes from 'prop-types';

import uikitStyles from '../../utils/uikitStyles';
import styles from './css/CreateWishCard.css';
import {colors} from '../../utils/styles';
import {getWishSuggestions} from '../../utils/firebase';
import sendImage from './img/send.png';
import { getUserDetails } from '../../utils/firebase';

// TODO: User proper icon for "post" button
class CreateWish extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isPostable: false,
			suggestion: 'I was a bit more sane!',
			paypal: false,
			paypalUser: null,
		};

		this.wishInputRef = React.createRef();

		this.onClickSubmit = this.onClickSubmit.bind(this);
		this.onPaypalClick = this.onPaypalClick.bind(this);
	}

	componentDidMount() {
		this.wishInputRef.current.focus();
		this.wishInputRef.current.addEventListener('keyup', (event) => {
			this.setState(this.wishInputRef.current.value.trim().length > 2 ? {...this.state, isPostable: true} : {...this.state, isPostable: false});
			if (event.code === 'Enter') {
				this.onClickSubmit(event);
			}
		});
		getWishSuggestions().once('value', snapshot => {
			let val = snapshot.val();
			let updateFunc = () => {
				this.setState({...this.state, suggestion: val[Math.floor(Math.random() * val.length)]});
				setTimeout(updateFunc, 3000);
			}
			updateFunc();
		});
	}

	componentWillReceiveProps(newProps) {
		if (newProps.user) {
			const { user } = newProps;
			getUserDetails(user.uid).on('value', snapshot => {
				const val = snapshot.val();
				if (val.paypal) {
					this.setState({
						...this.state,
						paypalUser: val.paypal,
					});
				}
			});
		}
	}

	onClickSubmit(event) {
		if (event.target.disabled) {
			return;
		}

		if (this.wishInputRef.current.value.trim().length < 3) {
			return;
		}

		if (!this.props.user) {
			window.login();
			return;
		}

		this.props.createWish.new(
			this.wishInputRef.current.value.trim(),
			this.state.paypal ? this.state.paypalUser : null,
		).then(() => {
			this.wishInputRef.current.value = '';
		});
	}

	onPaypalClick() {
		if (!this.state.paypalUser) {
			alert('Please register your PayPal account first!');
			return;
		}
		this.setState({
			...this.state,
			paypal: !this.state.paypal,
		});
	}

	render() {
		return <div className={[uikitStyles['uk-position-bottom'], uikitStyles['uk-position-fixed'], uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}
			style={{backgroundColor: colors.primary.light, height: '88px'}}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l'],
				uikitStyles['uk-flex']].join(' ')}
				style={{height: '56px', margin: '16px 4px', borderRadius: '4px'}}>
				<div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center'], uikitStyles['uk-flex-column']].join(' ')}
					style={{backgroundColor: colors.primary.base, color: colors.primary.textOn, fontSize: '16px', padding: '0 16px', fontWeight: 700}}>
					I wish
				</div>
				<div className={[uikitStyles['uk-flex']].join(' ')}
				  style={{flexGrow: 1, backgroundColor: 'white', padding: '20px'}}>
					<input className={[styles.wishInput].join(' ')} placeholder={this.state.suggestion} ref={this.wishInputRef}/>
					<span
						style={{ width: 18, height: 18, marginRight: 8, color: this.state.paypal ? colors.primary.textOn : colors.primary.dark , cursor: 'pointer' }}
						onClick={this.onPaypalClick}
					>
						<svg
							aria-hidden="true"
							data-prefix="fab"
							data-icon="paypal"
							className="svg-inline--fa fa-paypal fa-w-12"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							style={{ marginTop: -7 }}
						>
							<path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path>
						</svg>
					</span>
					<img src={sendImage} alt={'=>'} onClick={this.onClickSubmit} style={{height: '18px', width: '18px', cursor: 'pointer'}}/>
				</div>
			</div>
		</div>
	}
}

CreateWish.propTypes = {
	user: PropTypes.object,
	createWish: PropTypes.object.isRequired,
}

export default CreateWish;
