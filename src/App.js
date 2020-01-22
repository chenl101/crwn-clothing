import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { auth } from './firebase/firebase.utils';

import './App.css';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.compoenent';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';



class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      console.log(user);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); 
  }
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser={ this.state.currentUser } />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/signin' component={SignInAndSignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;