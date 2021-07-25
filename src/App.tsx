import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import './App.scss';
import Home from './features/Home/Home'
import CreateMeme from './features/CreateMeme/CreateMeme'
import MyNFTs from './features/MyNFTs/MyNFTs'

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/CreateMeme" component={CreateMeme} />
        <Route path="/MyNFTs" component={MyNFTs} />
      </BrowserRouter>
    </div>
  );
}

export default App;
