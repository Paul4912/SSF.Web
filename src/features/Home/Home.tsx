import React from 'react'
import Button from '@material-ui/core/Button'
import FlandersImg from '../../Ned_Flanders.png'
import { useHistory } from "react-router-dom";


const Home: React.FC = () => {

    const history = useHistory();
    const routeChange = (path: string) =>{ 
        history.push(path);
    }

    return (
        <div className='Homepage'>
            <Button className="CreateMemeLink" size="large" variant="contained" color="primary" onClick={() => { routeChange("CreateMeme"); }}>
                    Immortalise Your Meme
            </Button>
            <Button className="MyNFTsLink" size="large" variant="contained" color="primary" onClick={() => { routeChange("MyNFTs"); }}>
                    My NFTs
            </Button>
            <h1 className='Heading'>Stupid Sexy Flanders</h1>
            <div className='FlandersImg'>
                <img alt="" src={FlandersImg}/>
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