export const localStorageKey = 'state';

export const loadState = () => {
	try {
		const data = localStorage.getItem(localStorageKey);
		if (data == null) return undefined;
		return JSON.parse(data);
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const saveState = (state) => {
	try {
		const data = JSON.stringify(state);
		localStorage.setItem(localStorageKey, data);
	} catch (e) {
		console.error(e);
	}
};