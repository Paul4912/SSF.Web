import { Reducer } from 'redux'
import { createReducer } from '@reduxjs/toolkit'
import * as types from '../constants/ActionTypes'

export interface loadingState {
    initialData: any|null
}

const initialState: loadingState = {
    initialData: null
}

const storeInitialData = (state: loadingState, action: any) => {
    return {
        ...state,
        initialData: action.initialData
    }
}

export const loadingReducer: Reducer<loadingState> = createReducer(initialState, {
    [types.loadInitalDataSuccess]: storeInitialData
})