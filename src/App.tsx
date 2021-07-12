import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import './App.scss';
import Home from './features/Home/Home'
import CreateMeme from './features/CreateMeme/CreateMeme'

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/CreateMeme" component={CreateMeme} />
      </BrowserRouter>
    </div>
  );
}

export default App;
