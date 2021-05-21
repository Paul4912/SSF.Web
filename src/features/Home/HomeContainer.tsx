import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Home from './Home'
import { applicationState } from '../../reducers/RootReducer'
import { loadHomePage } from '../../actions/LoadingActions'

const HomeContainer: React.FC = () => {
    const initialData = useSelector( (state: applicationState) => state.loading.initialData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadHomePage())
    }, [])
      
    return(<Home users={initialData} />)
}

export default HomeContainer