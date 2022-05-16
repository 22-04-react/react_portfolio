import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';

export function* returnFlickr(action) {
	const response = yield call(fetchFlickr, action.opt);
	if (response) {
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} else {
		yield put({ type: 'FLICKR_ERROR', payload: '데이터호출에 실패했습니다.' });
	}
}

export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}
