import React from 'react'
import Button from '@material-ui/core/Button'
import FlandersImg from '../../Ned_Flanders.png'

interface props {
    users: any[]
}

const Home: React.SFC<props> = (props: props) => {
    // var render = 'abc'
    // if(props.users) {
    //     render = props.users[0].name
    // }
    return (
        <div className='Homepage'>
            <h1 className='Heading'>Stupid Sexy Flanders</h1>
            <div className='FlandersImg'>
                <img src={FlandersImg}/>
            </div>
            <div className='BuySSF'>
                <Button className="Button" size="large" variant="contained" color="primary" onClick={() => { window.open('https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0b151aa48399e0b38af83686f1b094605f8ed2a5'); }}>
                    Buy $SSF
                </Button>
            </div>
        </div>
    )
}

export default Home