import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMembers } from './api';
import * as types from './actionType';

//flickr관련 action생성함수
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({
			type: types.FLICKR.success,
			payload: response.data.photos.photo,
		});
	} catch (err) {
		yield put({ type: types.FLICKR.error, payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

//youtube관련 action생성함수
export function* returnYoutube(action) {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.error, payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

//members관련 action생성함수
export function* returnMember(action) {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: types.MEMBERS.success, payload: response.data.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.error, payload: err });
	}
}
export function* callMember() {
	yield takeLatest(types.MEMBERS.start, returnMember);
}

//모든 액션 생성함수 호출해서 reducer에 전달
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}
