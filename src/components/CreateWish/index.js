import React from 'react';
import PropTypes from 'prop-types';

import uikitStyles from '../../utils/uikitStyles';
import styles from './css/CreateWishCard.css';
import {colors} from '../../utils/styles';

// TODO: User proper icon for "post" button
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
					style={{backgroundColor: colors.primary.base, color: colors.primary.textOn, fontSize: '16px', padding: '0 16px'}}>
					I wish
				</div>
				<div className={[uikitStyles['uk-flex']].join(' ')}
				  style={{flexGrow: 1, backgroundColor: 'white', padding: '20px 16px'}}>
					<input className={[styles.wishInput].join(' ')} placeholder={'I was a bit more sane.'} ref={this.wishInputRef}/>
					<button style={{background: 'transparent', cursor: 'pointer', border: '0'}} onClick={this.onClickSubmit}>
						=>
					</button>
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
