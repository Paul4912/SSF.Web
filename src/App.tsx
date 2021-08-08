import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import './App.scss';
import Home from './features/Home/Home'
import CreateMeme from './features/CreateMeme/CreateMeme'
import MyNFTs from './features/MyNFTs/MyNFTs'
import NavBar from './components/NavBar'
import NFTMarket from './features/NFTMarket/NFTMarket'


const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/CreateMeme" component={CreateMeme} />
        <Route path="/MyNFTs" component={MyNFTs} />
        <Route path="/Market" component={NFTMarket} />
      </BrowserRouter>
    </div>
  );
}

export default App;
