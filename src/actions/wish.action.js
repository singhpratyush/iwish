import {createWish as createNewWish} from '../utils/firebase';
import wishActionTypes from '../actionTypes/wish.actionTypes';

export const createWish = text => {
	createNewWish(text);
	return {type: wishActionTypes.CREATE_DONE, text};
}

export const setWishes = (type, wishObjects) => {

	let sortedWish = [];

	if (Object.keys(wishObjects || {}).length) {
		let wishList = Object.keys(wishObjects).map(id => ({
			...wishObjects[id],
			id,
		}));
		switch (type) {
			case 'trending':
				sortedWish = wishList.sort((a, b) => Object.keys(b.upwishes).length - Object.keys(a.upwishes).length);
				break;
			case 'latest':
				sortedWish = wishList.sort((a, b) => b.createdAt - a.createdAt);
				break;
			default:
				sortedWish = wishList;
		}
	}

	return {
		type: wishActionTypes.SET_WISHES_DONE,
		wishes: sortedWish,
		category: type,
	};
};
