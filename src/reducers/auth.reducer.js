import authActionTypes from '../actionTypes/auth.actionTypes';

const initialState = {isLoggedIn: false, user: null};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case authActionTypes.LOGIN_DONE:
			return {...state, isLoggedIn: true, user: action.user};

		case authActionTypes.LOGOUT_DONE:
			return {...state, isLoggedIn: false, user: null};
		default:
			return state;
	}
};
