import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as userActions from '../actions/user.actions';
import UserProfile from '../components/UserProfile';

const mapStateToProps = (state, ownProps) => {
	let profileUser = state.user[ownProps.match.params.uid];
	!profileUser && (profileUser = {});
	!profileUser.wishes && (profileUser.wishes = {});
	return {
		authState: state.auth,
		profileUser,
	}
};

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
