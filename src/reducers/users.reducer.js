import _ from 'lodash';

import userActionTypes from '../actionTypes/user.actionTypes';

const initialState = {};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {

		case userActionTypes.LOAD_DONE:
			state = _.cloneDeep(state);
			state[action.uid] = action.info;
			return state;

		default:
			return state;
	}
}
