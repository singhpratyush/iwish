import {createWish as createNewWish} from '../utils/firebase';
import wishActionTypes from '../actionTypes/wish.actionTypes';

export const createWish = text => {
	createNewWish(text);
	return {type: wishActionTypes.CREATE_DONE, text};
}

export const setWishes = (type, wishes) => ({
	type: wishActionTypes.SET_WISHES_DONE,
	wishes,
	category: type,
});
