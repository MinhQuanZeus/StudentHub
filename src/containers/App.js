import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import LoginContainer from "./LoginContainer/LoginContainer";
import {history} from "../helpers/history"
import ApplicationContainer from "./ApplicationContainer/ApplicationContainer";
import ForgotPasswordContainer from "./ForgotPasswordContainer/ForgotPasswordContainer";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

class App extends Component {
    render() {
        return (
            <div className="app">
                <Router history={history}>
                    <div>
                        <Switch>
                            <Route path="/login" component={LoginContainer}/>
                            <Route path="/forgot-password" component={ForgotPasswordContainer}/>
                            <PrivateRoute exact path="/" component={ApplicationContainer}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App;