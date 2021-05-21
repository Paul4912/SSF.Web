import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import './App.scss';
import HomeContainer from './features/Home/HomeContainer'

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={HomeContainer} />
      </BrowserRouter>
    </div>
  );
}

export default App;
