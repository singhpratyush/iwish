import {connect} from 'react-redux';

import Header from '../components/Header';

const mapStateToProps = state => ({
	isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Header);
