import Home from './components/Home';
import React from 'react';
import Navigation from './components/Navigation';
import Recipes from './components/Recipes';
import Content from './components/Content';
import Login from './components/login';
import Logout from './components/logout';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useStateValue } from './StateProvider';
import About from './components/About';



//adding default headers
(function () {
  let token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;

  }
})();


//configuring toast-notifications
toast.configure()

function App() {
  const [{ session }, dispatch] = useStateValue();

  useEffect(() => {
    console.log(session)
  }, [session])




  return (

    <Router>
      <div className="App">
        <Navigation />
        <div id='null'></div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/home' exact component={Home} />
          <Route path='/recipes' exact component={Recipes} />
          <Route path='/content' render={props => {
            if (!session.auth) return <Redirect to='/Login' />;
            return <Content {...props} />;
          }} />
          <Route path='/Login' exact component={Login} />
          <Route path='/Logout' exact component={Logout} />
          <Route path='/about' exact component={About} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
