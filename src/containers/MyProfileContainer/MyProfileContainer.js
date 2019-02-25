import React, { Component } from 'react';
import { UserCardComponent } from '../../components/UserCardComponent/UserCardComponent';
import { ProfileTabsComponent } from '../../components/ProfileTabsComponent/ProfileTabsComponent';
import { AboutUserComponent } from '../../components/AboutUserComponent/AboutUserComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import sharedStyles from '../../styles/styles.module.css';
import styles from './MyProfileContainer.module.css';
import param from '../../chatBotControl/passToken.js';
import { AppContext } from '../AppContext';

class MyProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.aboutRef = React.createRef();
    this.contactRef = React.createRef();
    this.addressRef = React.createRef();
  }

  scrollToRef = ref => {
    if (ref === 'about')
      window.scrollTo({
        top: this.aboutRef.current.offsetTop,
        behavior: 'smooth'
      });
    if (ref === 'contact')
      window.scrollTo({
        top: this.contactRef.current.offsetTop,
        behavior: 'smooth'
      });
    if (ref === 'address')
      window.scrollTo({
        top: this.addressRef.current.offsetTop,
        behavior: 'smooth'
      });
  };

  render() {
    const { user } = this.context;
    return (
      <div className={sharedStyles['content-container']}>
        <div className={styles['profile-wrapper']}>
          <div className={styles['profile-left-container']}>
            <HeaderComponent labels={['My Profile']} />
            <UserCardComponent loginInformation={user} />
            <ProfileTabsComponent scrollToRef={this.scrollToRef} />
          </div>
          <div className={styles['profile-right-container']}>
            <AboutUserComponent
              loginInformation={user}
              aboutRef={this.aboutRef}
              contactRef={this.contactRef}
              addressRef={this.addressRef}
            />
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    const { user } = this.context;
    const script = param.passToken(user.x_access_token, user.first_name);
    document.body.appendChild(script);
  }
}

MyProfileContainer.contextType = AppContext;

export default MyProfileContainer;
