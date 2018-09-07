import React, {Component} from 'react';
import LoginContainer from "./LoginContainer/LoginContainer";

class App extends Component {
    render() {
        return (
            <div className="app">
                <LoginContainer/>
            </div>
        )
    }
}

export default App;