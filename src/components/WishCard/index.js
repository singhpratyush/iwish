import React from 'react';

import styles from './css/WishCard.css';
import uikitStyles from '../../utils/uikitStyles';

class WishCard extends React.Component {
	render() {
		return <div className={[uikitStyles['uk-margin-large-bottom'], uikitStyles['uk-card-default'],
		  uikitStyles['uk-padding'], styles.wishContainer].join(' ')}>
			<div className={[uikitStyles['uk-margin-large-top'], uikitStyles['uk-margin-bottom']].join(' ')}>
				<img src={this.props.data.user.photoURL} alt={''} className={[styles.userImage].join(' ')}/>
				<span className={[uikitStyles['uk-margin-small-left']].join(' ')}>{this.props.data.user.displayName}</span>
			</div>
			<div className={[styles.textContainer].join(' ')}>
				I wish <span className={styles.wishText}>{this.props.data.text}</span>.
			</div>
		</div>
	}
}

export default WishCard;
