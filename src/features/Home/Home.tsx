import React from 'react'

interface props {
    users: any[]
}

const Home: React.SFC<props> = (props: props) => {
    var render = 'abc'
    if(props.users) {
        render = props.users[0].name
    }
    return (
        <div className='Homepage'>
            {render}
        </div>
    )
}

export default Home