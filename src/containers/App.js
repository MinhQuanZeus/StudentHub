import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import LoginContainer from "./LoginContainer/LoginContainer";
import {history} from "../helpers/history"
import HomePageContainer from "./HomePageContainer/HomePageContainer";
import ForgotPasswordContainer from "./ForgotPasswordContainer/ForgotPasswordContainer";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Router history={history}>
                    <div>
                        <Route exact path="/" component={LoginContainer}/>
                        <Route exact path="/login" component={LoginContainer}/>
                        <Route path="/home" component={HomePageContainer}/>
                        <Route path="/forgot-password" component={ForgotPasswordContainer}/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;