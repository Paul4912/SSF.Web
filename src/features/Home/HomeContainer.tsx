import React from 'react'
import Home from './Home'

const HomeContainer: React.FC = () => {
    const initialData = [{name: "asdasdasd"}];
      
    return(<Home users={initialData} />)
}

export default HomeContainer