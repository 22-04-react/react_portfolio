import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMembers } from './api';

//flickr관련 action생성함수
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//youtube관련 action생성함수
export function* returnYoutube(action) {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}

//members관련 action생성함수
export function* returnMember(action) {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: 'MEMBER_SUCCESS', payload: response.data.members });
	} catch (err) {
		yield put({ type: 'MEMBER_ERROR', payload: err });
	}
}
export function* callMember() {
	yield takeLatest('MEMBER_START', returnMember);
}

//모든 액션 생성함수 호출해서 reducer에 전달
export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}
