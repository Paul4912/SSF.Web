import { all, fork } from 'redux-saga/effects'

import LoadingSaga from './LoadingSagas'

export default function* rootSaga() {
    yield all([
        fork(LoadingSaga)
    ])
}