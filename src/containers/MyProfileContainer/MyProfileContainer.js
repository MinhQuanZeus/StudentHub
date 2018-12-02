import React, {Component} from "react";

import {UserCardComponent} from "../../components/UserCardComponent/UserCardComponent";
import {ProfileTabsComponent} from "../../components/ProfileTabsComponent/ProfileTabsComponent";
import {AboutUserComponent} from "../../components/AboutUserComponent/AboutUserComponent";
import {connect} from 'react-redux';
import sharedStyles from '../../styles/styles.css';
import styles from './MyProfileContainer.css';


class MyProfileContainer extends Component {
    constructor(props) {
        super(props)
        this.aboutRef = React.createRef();
        this.contactRef = React.createRef();
        this.addressRef = React.createRef();
    }

    scrollToRef = (ref) => {
        if (ref === "about") window.scrollTo({top: this.aboutRef.current.offsetTop, behavior: "smooth" })
        if (ref === "contact") window.scrollTo({top: this.contactRef.current.offsetTop, behavior: "smooth" })
        if (ref === "address") window.scrollTo({top: this.addressRef.current.offsetTop, behavior: "smooth" })
    }

    render() {
        return (
            <div className={sharedStyles["content-container"]}>
                <div className={sharedStyles['content-header']}>
                  <h3 className={sharedStyles['content-label']}>My Profile</h3>
                </div>
                <div className={styles['profile-wrapper']}>
                  <div className={styles['profile-left-container']}>
                    <UserCardComponent loginInformation={this.props.loginInformation}/>
                    <ProfileTabsComponent scrollToRef={this.scrollToRef} />
                  </div>
                  <div className={styles['profile-right-container']}>
                    <AboutUserComponent
                      loginInformation={this.props.loginInformation}
                      aboutRef={this.aboutRef}
                      contactRef={this.contactRef}
                      addressRef={this.addressRef}
                    />
                  </div>
                </div>
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
