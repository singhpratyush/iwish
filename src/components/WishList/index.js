import React from 'react';
import PropTypes from 'prop-types';

import WishCard from '../WishCard';
import uikitStyles from '../../utils/uikitStyles';

class WishList extends React.Component {
	constructor(props) {
		super(props);
		this.startWishUpdate();
	}

	startWishUpdate() {
		this.databaseRef && this.databaseRef.off();
		this.databaseRef = this.props.getDatabaseRef();
		this.databaseRef.on('value', snapshot => {
			this.props.wishActions.setWishes(this.props.category, snapshot.val());
		})
	}

	componentWillReceiveProps() {
		this.startWishUpdate();
	}

	componentWillUnmount() {
		this.databaseRef.off();
	}

	render() {
		return <div style={{margin: '32px 0'}}
			className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center']].join(' ')}>
			<div className={[uikitStyles['uk-width-1-1@s'], uikitStyles['uk-width-2-3@m'], uikitStyles['uk-width-1-2@l']].join(' ')}
				style={{backgroundColor: 'white'}}>
				{Object.keys(this.props.wishes).map(wishId =>
					<WishCard data={this.props.wishes[wishId]} key={wishId} auth={this.props.auth}/>)}
			</div>
		</div>
	}
}

WishList.propTypes = {
	// Pure props
	category: PropTypes.string.isRequired,
	getDatabaseRef: PropTypes.func.isRequired,
	// From container
	wishActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
	wishes: PropTypes.array.isRequired,
	auth: PropTypes.object.isRequired,
}

export default WishList
