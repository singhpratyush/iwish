import React from 'react';
import PropTypes from 'prop-types';

import uikitStyles from '../../utils/uikitStyles';
import styles from './css/CreateWishCard.css';
import {colors} from '../../utils/styles';
import {getWishSuggestions} from '../../utils/firebase';
import sendImage from './img/send.png';

// TODO: User proper icon for "post" button
class CreateWish extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isPostable: false, suggestion: 'I was a bit more sane!'};

		this.wishInputRef = React.createRef();

		this.onClickSubmit = this.onClickSubmit.bind(this);
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
		})

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

		this.props.createWish.new(this.wishInputRef.current.value.trim());

		this.wishInputRef.current.value = '';
	}

	render() {
		return <div className={[uikitStyles['uk-position-bottom'], uikitStyles['uk-position-fixed'], uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}
			style={{backgroundColor: colors.primary.light, height: '88px'}}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l'],
				uikitStyles['uk-flex']].join(' ')}
				style={{height: '56px', margin: '16px 4px', borderRadius: '4px'}}>
				<div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center'], uikitStyles['uk-flex-column']].join(' ')}
					style={{backgroundColor: colors.primary.base, color: colors.primary.textOn, fontSize: '16px', padding: '0 16px', fontWeight: 500}}>
					I wish
				</div>
				<div className={[uikitStyles['uk-flex']].join(' ')}
				  style={{flexGrow: 1, backgroundColor: 'white', padding: '20px'}}>
					<input className={[styles.wishInput].join(' ')} placeholder={this.state.suggestion} ref={this.wishInputRef}/>
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
