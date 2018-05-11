import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import App from '../App';
import * as authActions from '../actions/auth.actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	authActions: bindActionCreators(authActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
