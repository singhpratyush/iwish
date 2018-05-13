import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import WishList from '../components/WishList';
import {setWishes} from '../actions/wish.action';

const mapStateToProps = (state, ownProps) => ({
	wishes: state.wish[ownProps.category] || [],
	auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
	wishActions: bindActionCreators({setWishes}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
