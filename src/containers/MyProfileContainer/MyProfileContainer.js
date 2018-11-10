import React, {Component} from "react";

import {UserCardComponent} from "../../components/UserCardComponent/UserCardComponent";
import {ProfileTabsComponent} from "../../components/ProfileTabsComponent/ProfileTabsComponent";
import {AboutUserComponent} from "../../components/AboutUserComponent/AboutUserComponent";
import {connect} from 'react-redux';
import sharedStyles from '../../styles/styles.css';


class MyProfileContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["content-container"]}>
                <UserCardComponent loginInformation={this.props.loginInformation}/>
                <ProfileTabsComponent />
                <AboutUserComponent loginInformation={this.props.loginInformation} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loginInformation: state.login.loginInformation
    }
};


export default connect(mapStateToProps)(MyProfileContainer);
