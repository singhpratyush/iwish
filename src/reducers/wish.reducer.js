import wishActionTypes from '../actionTypes/wish.actionTypes';

const initialState = {trending: null, latest: null};

export const wishReducer = (state = initialState, action) => {
	switch (action.type) {
		case wishActionTypes.SET_WISHES_DONE:
			stete = {...state};
			state[action.category] = action.wishes;
			return state;

		default:
			return state;
	}
}
