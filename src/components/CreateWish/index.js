import React from 'react';
import PropTypes from 'prop-types';

import uikitStyles from '../../utils/uikitStyles';
import styles from './css/CreateWishCard.css';

class CreateWish extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isPostable: false};

		this.wishInputRef = React.createRef();

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		this.wishInputRef.current.focus();
		this.wishInputRef.current.addEventListener('keyup', (event) => {
			this.setState(this.wishInputRef.current.value.trim().length > 2 ? {...this.state, isPostable: true} : {...this.state, isPostable: false});
		});
	}

	onClickSubmit(event) {
		if (event.target.disabled) {
			return;
		}

		if (this.wishInputRef.current.value.trim().length < 3) {
			return;
		}

		this.props.createWish.new(this.wishInputRef.current.value.trim());

		this.wishInputRef.current.value = '';
	}

	render() {
		return <div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
			<div className={[uikitStyles['uk-card'], uikitStyles['uk-card-hover'],
				uikitStyles['uk-card-body'], uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-3-4@m'],
				uikitStyles['uk-width-2-3@l']].join(' ')}>
				<p>
					<img src={this.props.user.photoURL} alt={'YOU'} className={styles.userImage}/>
					<span className={[uikitStyles['uk-card-title'], uikitStyles['uk-margin-small-left']].join(' ')}>{this.props.user.displayName}</span>
					<button className={[uikitStyles['uk-button'], uikitStyles['uk-button-secondary'],
						uikitStyles['uk-align-right']].join(' ')} disabled={!this.state.isPostable} onClick={this.onClickSubmit}>
						Wish for it!</button>
				</p>
				<p className={[uikitStyles['uk-flex'], uikitStyles['uk-margin-large-top']].join(' ')}>
					<span className={[uikitStyles['uk-text-large'], uikitStyles['uk-margin-small-right']].join(' ')}>I wish</span>
					<input className={styles.wishInput} ref={this.wishInputRef} maxLength={132} placeholder={'I was not this dumb'}/>
					<span className={[uikitStyles['uk-text-large'], uikitStyles['uk-margin-small-right']].join(' ')}>.</span>
				</p>
			</div>
		</div>
	}
}

CreateWish.propTypes = {
	user: PropTypes.object.isRequired,
	createWish: PropTypes.func.isRequired,
}

export default CreateWish;
