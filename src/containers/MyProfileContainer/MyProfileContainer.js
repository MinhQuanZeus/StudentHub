import React, {Component} from "react";

import {UserCardComponent} from "../../components/UserCardComponent/UserCardComponent";
import {ProfileTabsComponent} from "../../components/ProfileTabsComponent/ProfileTabsComponent";
import {AboutUserComponent} from "../../components/AboutUserComponent/AboutUserComponent";

class MyProfileContainer extends Component {
    render() {
        return (
            <div>
                <UserCardComponent />
                <ProfileTabsComponent />
                <AboutUserComponent />
            </div>
        )
    }
}
export default MyProfileContainer;
