import {combineReducers} from 'redux';

// Reducers
import {authReducer} from './auth.reducer';

export default combineReducers({
	auth: authReducer,
});
