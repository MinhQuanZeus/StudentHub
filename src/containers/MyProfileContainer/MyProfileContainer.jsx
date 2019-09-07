/* global document, fetch, window */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { UserCardComponent } from '../../components/UserCardComponent/UserCardComponent';
import { MobileViewUserCardComponent } from '../../components/MobileViewUserCardComponent/MobileViewUserCardComponent';
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
import { setAvatarUrl } from '../../helpers';
import { PrimaryButton } from 'office-ui-fabric-react';

class MyProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.profileRef = React.createRef();
    this.aboutRef = React.createRef();
    this.contactRef = React.createRef();
    this.addressRef = React.createRef();
    this.addressComponentRef = React.createRef();
    this.initialize = this.initialize.bind(this);
    this.onEditProfile = this.onEditProfile.bind(this);
    this.state = {
      details: null,
      currentAddress: {},
      editProfile: false,
      showDetails: false,
      viewMode: 'DESKTOP', // possible values are DESKTOP and MOBILE
      submitBasicInformationForm: null,
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
        setAvatarUrl(body.data && body.data.photo_url);
        this.setState(() => ({ isLoading: false, details: body.data }));
      }
    } catch (e) {
      this.setState(() => ({ isLoading: false }));
    }
  }

  scrollToRef = (ref) => {
    if (ref === 'about') {
      this.profileRef.current.scrollTo({
        top: this.aboutRef.current.offsetTop - 140, // 140 value for scroll to specific position
        behavior: 'smooth',
      });
    }
    if (ref === 'contact') {
      this.profileRef.current.scrollTo({
        top: this.contactRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    }
    if (ref === 'address') {
      this.profileRef.current.scrollTo({
        top: this.addressRef.current.offsetTop - 140,
        behavior: 'smooth',
      });
    }
  };

  setCurrentAddress = (address) => {
    this.setState({ currentAddress: address });
  };

  onEditProfile = () => {
    const editProfile = this.state.editProfile;
    this.setState({ editProfile: !editProfile });
  };

  toggleDetails = (value) => {
    this.setState({ showDetails: value });
  };

  // Check srceen size `on component load` or `on screen resize`
  checkCurrentScreenSize = () => {
    const width = window.innerWidth;
    const viewMode = width < 767 ? 'MOBILE' : 'DESKTOP';
    if (viewMode !== this.state.viewMode) {
      this.setState({ viewMode: viewMode });
    }
  };

  // for update in mobile version
  updateProfile = (e) => {
    if (this.state.submitBasicInformationForm) {
      this.state.submitBasicInformationForm(e);
    }
    this.addressComponentRef.current.onSubmit();
    this.setState({ editProfile: false });
  };

  // binding BasicInformation form for updating data
  bindBasicInformationSubmitForm = (submitForm) => {
    if (!this.state.submitBasicInformationForm) {
      setTimeout(() => {
        this.setState({ submitBasicInformationForm: submitForm });
      }, 500);
    }
  };

  render() {
    const { details, currentAddress, editProfile, showDetails, viewMode } = this.state;
    return (
      <div ref={this.profileRef} className={`${sharedStyles['content-container']} ${css.MyProfileContainer}`}>
        <div>
          <div className={`${css.profileLeftContainer} ${showDetails ? css.showDetails : ''}`}>
            <HeaderComponent labels={['My Profile']} />
            <UserCardComponent loginInformation={details} currentAddress={currentAddress} toggleDetails={this.toggleDetails} />
            <ProfileTabsComponent scrollToRef={this.scrollToRef} />
          </div>
          <div className={css.profileRightContainer}>
            <div className={css.MobileViewHeader}>
              <HeaderComponent labels={['My Profile']}>
                <span className={css.ButtonOutline} onClick={() => this.onEditProfile()}>
                  {editProfile ? `Cancel` : `Edit Profile`}
                </span>
              </HeaderComponent>
              <MobileViewUserCardComponent loginInformation={details} currentAddress={currentAddress} isMobileView={true} />
            </div>
            <div className={css.MobileViewTabs}>
              <ProfileTabsComponent scrollToRef={this.scrollToRef} />
            </div>
            <div ref={this.aboutRef} />
            <About {...details} viewMode={viewMode} />
            <BasicInformation
              {...details}
              onSuccess={this.initialize}
              viewMode={viewMode}
              editProfile={editProfile}
              bindBasicInformationSubmitForm={this.bindBasicInformationSubmitForm}
            />
            <div ref={this.contactRef} />
            <BasicContact {...details} onSuccess={this.initialize} viewMode={viewMode} />
            <SocialMedia {...details} viewMode={viewMode} />
            <EmergencyContact {...details} viewMode={viewMode} />
            <div ref={this.addressRef} />
            <Address
              ref={this.addressComponentRef}
              {...details}
              setCurrentAddress={this.setCurrentAddress}
              viewMode={viewMode}
              editProfile={editProfile}
            />
            {editProfile && viewMode === 'MOBILE' ? (
              <PrimaryButton text="Save" className={css.MobileViewSaveBtn} onClick={this.updateProfile} />
            ) : null}
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
    window.addEventListener('resize', this.checkCurrentScreenSize);
    this.checkCurrentScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkCurrentScreenSize);
  }
}

MyProfileContainer.contextType = AppContext;

export default MyProfileContainer;
