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
            <button
                type="button"
                onClick={(e) => {
                e.preventDefault();
                window.location.href='https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0b151aa48399e0b38af83686f1b094605f8ed2a5';
            }}
            >Buy $SSF</button>
        </div>
    )
}

export default Home