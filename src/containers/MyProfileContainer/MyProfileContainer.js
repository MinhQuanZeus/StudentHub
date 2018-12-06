import React, {Component} from "react";

import {UserCardComponent} from "../../components/UserCardComponent/UserCardComponent";
import {ProfileTabsComponent} from "../../components/ProfileTabsComponent/ProfileTabsComponent";
import {AboutUserComponent} from "../../components/AboutUserComponent/AboutUserComponent";
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import {connect} from 'react-redux';
import sharedStyles from '../../styles/styles.css';
import $ from 'jquery';
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
                <HeaderComponent label='My Profile' />
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
    componentWillMount() {
            $('.chatBotLoading').remove()
            $('.lex-web-ui-iframe').remove()
        } 
}

const mapStateToProps = (state) => {
    return {
        loginInformation: state.login.loginInformation
    }
};


export default connect(mapStateToProps)(MyProfileContainer);
