import {connect} from 'react-redux';

import Header from '../components/Header';

const mapStateToProps = state => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Header);
