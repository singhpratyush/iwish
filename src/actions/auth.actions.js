import authActionTypes from '../actionTypes/auth.actionTypes';

export const login = user => ({
	type: authActionTypes.LOGIN_DONE,
	user,
});

export const logout = () => ({
	type: authActionTypes.LOGOUT_DONE,
});
