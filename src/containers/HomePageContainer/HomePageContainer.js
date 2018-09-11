import React, {Component} from "react";

class HomePageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let content;

        if (this.props.location.state && this.props.location.state['first_name'] && this.props.location.state['last_name']) {
            content = <div>Your first name is {this.props.location.state['first_name']} and last name is {this.props.location.state['last_name']}</div>
        } else {
            content = <div>You're not logged in yet</div>
        }

        return (
            <div>
                {content}
            </div>

        )
    }
}

export default HomePageContainer;