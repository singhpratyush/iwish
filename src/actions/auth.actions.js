import {saveUser} from '../utils/firebase';
import authActionTypes from '../actionTypes/auth.actionTypes';

export const login = user => {
	saveUser(user);
	return {
		type: authActionTypes.LOGIN_DONE,
		user,
	}
};

export const logout = () => ({
	type: authActionTypes.LOGOUT_DONE,
});
