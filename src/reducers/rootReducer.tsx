import { combineReducers, Reducer } from 'redux'
import { loadingReducer, loadingState } from './LoadingReducer'

export interface applicationState {
    loading: loadingState,
}

export const rootReducer: Reducer<applicationState> = combineReducers({
    loading: loadingReducer
})