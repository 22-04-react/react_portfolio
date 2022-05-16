import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';

export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		//해당 api호출이 실패했을때 예외처리
		//에러 내용을 reducer에 전달
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}

export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}
