/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from './MobileViewUserCardComponent.module.scss';
import { getUser, formatPhoneNumberNtl } from '../../helpers';
import defaultAvatar from '../../images/img_avatar.png';


export class MobileViewUserCardComponent extends Component {
  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    const { currentAddress } = this.props;
    const loginInformation = getUser().student;
    return (
      <div className={styles.UserCardContainer}>
        <div className={styles.UserCardContent}>
          <span className={styles.UserAvatar}>
            <img src={loginInformation && loginInformation.photo_url ? loginInformation.photo_url : defaultAvatar} alt="User Avatar" />
          </span>
          <div className={styles.UserNameAndUserMajor}>
            <span className={styles.UserName}>
              <p>{loginInformation && loginInformation.first_name + ' ' + loginInformation.last_name}</p>
            </span>
            <span className={styles.UserMajor}>
              <p>Computer Science, BS</p>
            </span>
          </div>
        </div>

        <div className={styles.ShowDetails}>
          <div className={styles.ShowDetailsItem }>
            <p className={styles.ItemHeading}>Birthday</p>
            <p className={styles.ItemDetail}>{loginInformation.birth_date ? loginInformation.birth_date : ''}</p>
          </div>
          <div className={styles.ShowDetailsItem }>
            <p className={styles.ItemHeading}>Email</p>
            <p className={styles.ItemDetail}>{loginInformation.primary_email}</p>
          </div>
          <div className={styles.ShowDetailsItem }>
            <p className={styles.ItemHeading}>Phone Number</p>
            <p className={styles.ItemDetail}>{formatPhoneNumberNtl(loginInformation.mobile_phone)}</p>
          </div>
          <div className={styles.ShowDetailsItem }>
            <p className={styles.ItemHeading}>Current Address</p>
            <p className={styles.ItemDetail}>
              {currentAddress.street_address1}, {currentAddress.city} <br />
              {currentAddress.country}, {currentAddress.post_code}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
