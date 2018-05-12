import userActionTypes from '../actionTypes/user.actionTypes';

export const loadUserInfo = (uid, info) => ({
	type: userActionTypes.LOAD_DONE,
	uid,
	info,
});
