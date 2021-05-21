import * as types from '../constants/ActionTypes'

export const loadInitialData = (initialData: any) => ({
    type: types.loadInitalDataSuccess,
    initialData
})

export const loadHomePage = () => ({
    type: types.loadHomePage
})