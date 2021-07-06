import React from 'react';
import UserSignupPage from '../Pages/UserSignupPage';
import LoginPage from '../Pages/LoginPage';
import LanguageSelector from '../Components/LanguageSelector';
import HomePage from '../Pages/HomePage';
import UserPage from '../Pages/UserPage';
import { HashRouter as Router , Route, Redirect, Switch} from 'react-router-dom';
import TopBar from '../Components/TopBar';
// import { Authentication } from '../shared/AuthenticationContext';


class App extends React.Component {
//  static contextType = Authentication;
  render(){
    const isLoggedIn = false

    return (
      <div >
        <Router>         
        <TopBar />
        <Switch>
        <Route exact path = "/" component={HomePage} />
        {!isLoggedIn && <Route path = "/login" component={LoginPage}
        />
    })
        <Route path = "/signup" component={UserSignupPage} />
        <Route path = "/user/:username" component={UserPage} />
        <Redirect to="/" />
        </Switch>
        </Router>
        <LanguageSelector />
      </div>
      );

  }

}

export default App;
