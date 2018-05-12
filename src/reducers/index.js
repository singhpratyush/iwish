import {combineReducers} from 'redux';

// Reducers
import {authReducer} from './auth.reducer';
import {userReducer} from './users.reducer';

export default combineReducers({
	auth: authReducer,
	user: userReducer
});
