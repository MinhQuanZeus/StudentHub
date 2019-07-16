/* global window, document */
import React, { Component } from 'react';
import { UserCardComponent } from '../../components/UserCardComponent/UserCardComponent';
import { ProfileTabsComponent } from '../../components/ProfileTabsComponent/ProfileTabsComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import sharedStyles from '../../styles/styles.module.css';
import param from '../../chatBotControl/passToken.js';
import { AppContext } from '../AppContext';
import About from '../../components/ProfileComponent/About';
import { apiConstants } from '../../constants/applicationConstants';
import BasicInformation from '../../components/ProfileComponent/BasicInformation';
import BasicContact from '../../components/ProfileComponent/BasicContact';
import SocialMedia from '../../components/ProfileComponent/SocialMedia';
import EmergencyContact from '../../components/ProfileComponent/EmergencyContact';
import Address from '../../components/ProfileComponent/Address';
import css from './MyProfileContainer.m.scss';
import { navigate } from '../../helpers';

class MyProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.aboutRef = React.createRef();
    this.contactRef = React.createRef();
    this.addressRef = React.createRef();
    this.state = {
      details: null,
    };
  }

  async initialize() {
    try {
      const { user } = this.context;
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': user && user.x_access_token,
        },
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/get_profile`, options);
      const body = await response.json();
      if (body.success) {
        this.setState(() => ({ isLoading: false, details: body.data }));
      }
    } catch (e) {
      this.setState(() => ({ isLoading: false }));
    }
  }

  scrollToRef = (ref) => {
    if (ref === 'about') {
      window.scrollTo({
        top: this.aboutRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
    if (ref === 'contact') {
      window.scrollTo({
        top: this.contactRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
    if (ref === 'address') {
      window.scrollTo({
        top: this.addressRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  render() {
    const { user } = this.context;
    const { details } = this.state;
    return (
      <div className={`${sharedStyles['content-container']} ${css.MyProfileContainer}`}>
        <div>
          <div className={css.profileLeftContainer}>
            <HeaderComponent labels={['My Profile']} />
            <UserCardComponent loginInformation={user} />
            <ProfileTabsComponent scrollToRef={this.scrollToRef} />
          </div>
          <div className={css.profileRightContainer}>
            <div ref={this.aboutRef} />
            <About {...details} />
            <BasicInformation {...details} />
            <div ref={this.contactRef} />
            <BasicContact {...details} />
            <SocialMedia {...details} />
            <EmergencyContact {...details} />
            <div ref={this.addressRef} />
            <Address {...details} />
            {/* <AboutUserComponent*/}
            {/*  loginInformation={user}*/}
            {/*  aboutRef={this.aboutRef}*/}
            {/*  contactRef={this.contactRef}*/}
            {/*  addressRef={this.addressRef}*/}
            {/* />*/}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const { user } = this.context;
    if (!user) {
      return;
    }
    const script = param.passToken(user.x_access_token, user.first_name);
    document.body.appendChild(script);
    this.initialize();
  }
}

MyProfileContainer.contextType = AppContext;

export default MyProfileContainer;
