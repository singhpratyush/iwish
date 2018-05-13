import React from 'react';
import PropTypes from 'prop-types';

import WishCard from '../WishCard';

class WishList extends React.Component {
	componentDidMount() {
		this.databaseRef = this.props.getDatabaseRef();
		this.databaseRef.on('value', snapshot => {
			this.props.wishActions.setWishes(this.props.category, snapshot.val());
		})
	}

	componentWillUnmount() {
		this.databaseRef.off();
	}

	render() {
		return <div>
			{Object.keys(this.props.wishes).map(wishId =>
				<WishCard data={this.props.wishes[wishId]} key={wishId}/>)}
		</div>
	}
}

WishList.propTypes = {
	// Pure props
	category: PropTypes.string.isRequired,
	getDatabaseRef: PropTypes.func.isRequired,
	// From container
	wishActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
	wishes: PropTypes.object.isRequired,
}

export default WishList
