import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './css/header.css';
import uikitStyles from '../../utils/uikitStyles';
import {colors} from '../../utils/styles';

class Header extends React.Component {
	render() {
		return <div className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-center'], styles.headerContainer].join(' ')}
			style={{backgroundColor: colors.primary.base}}>
			<Link to={'/trending'} className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-column'], uikitStyles['uk-flex-center'], styles.navElement].join(' ')}>
					TRENDING WISHES
			</Link>
			<Link to={'/latest'} className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-column'], uikitStyles['uk-flex-center'], styles.navElement].join(' ')}>
					LATEST WISHES
			</Link>
			<Link to={'/me'} className={[uikitStyles['uk-flex'], uikitStyles['uk-flex-column'], uikitStyles['uk-flex-center'], styles.navElement].join(' ')}>
					MY WISHES
			</Link>
		</div>
	}
}

Header.propTypes = {
	auth: PropTypes.object.isRequired,
}

export default Header;
