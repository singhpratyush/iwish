import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createWish} from '../actions/wish.action';
import CreateWish from '../components/CreateWish';

const mapStateToProps = state => ({
	user: state.auth.user,
});

const mapDispathToProps = dispatch => ({
	createWish: bindActionCreators({new: createWish}, dispatch),
});

export default connect(mapStateToProps, mapDispathToProps)(CreateWish);
