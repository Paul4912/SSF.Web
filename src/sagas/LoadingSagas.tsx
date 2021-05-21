import { takeLatest, all, call, put } from "redux-saga/effects";

import { loadHomePage } from '../constants/ActionTypes'
import * as url from '../constants/Urls'
import { get } from '../utilities/Api'
import { loadInitialData } from '../actions/LoadingActions'

export function* appInit() {
    const response = yield call(get, url.usersUrl, null)
    yield put(loadInitialData(response.data))
}

export default function* saga() {
    yield all([takeLatest(loadHomePage, appInit)])
}