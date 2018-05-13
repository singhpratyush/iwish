import {combineReducers} from 'redux';

// Reducers
import {authReducer} from './auth.reducer';
import {userReducer} from './users.reducer';
import {wishReducer} from './wish.reducer';

export default combineReducers({
	auth: authReducer,
	user: userReducer,
	wish: wishReducer,
});
