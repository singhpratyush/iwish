import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './css/UserImage.css';

class UserImage extends React.Component {
		render() {
				return <Link to={`/@${this.props.uid}`}>
						<img
								src={this.props.photoURL}
								className={[styles.userImage].join(' ')}
								alt={'YOU'}/>
				</Link>
		}
}

UserImage.propTypes = {
		photoURL: PropTypes.string.isRequired,
		uid: PropTypes.string.isRequired,
};

export default UserImage;
