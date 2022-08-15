import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import DogCreate from './components/DogCreate/DogCreate';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}></Route>
          <Route exact path='/home' component={Home}></Route>
          <Route path='/dogs' component={DogCreate}></Route>
          <Route path='/home/:id' component={Detail}></Route>
          <Route path='*' component={Error}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
