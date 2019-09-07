/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from './MobileViewUserCardComponent.module.scss';
import { formatPhoneNumberNtl } from '../../helpers';
import defaultAvatar from '../../images/img_avatar.png';
import { format } from 'date-fns';

export class MobileViewUserCardComponent extends Component {
  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    const { currentAddress, loginInformation } = this.props;
    const birthDate = loginInformation && (loginInformation.birth_date || loginInformation.birthdate);
    return (
      <div className={styles.MobileViewUserCardContainer}>
        <div className={styles.UserCardContent}>
          <span className={styles.UserAvatar}>
            <img src={loginInformation && loginInformation.photo_url ? loginInformation.photo_url : defaultAvatar} alt="User Avatar" />
          </span>
          <div className={styles.UserNameAndUserMajor}>
            <span className={styles.UserName}>
              {loginInformation && <p>{`${loginInformation.first_name} ${loginInformation.last_name}`}</p>}
            </span>
            <span className={styles.UserMajor}>
              <p>Computer Science, BS</p>
            </span>
          </div>
        </div>
        {loginInformation && (
          <div className={styles.ShowDetails}>
            <div className={styles.ShowDetailsItem}>
              <p className={styles.ItemHeading}>Birthday</p>
              <p className={styles.ItemDetail}>{format(birthDate, 'MMMM DD, YYYY')}</p>
            </div>
            <div className={styles.ShowDetailsItem}>
              <p className={styles.ItemHeading}>Email</p>
              <p className={styles.ItemDetail}>{loginInformation.primary_email}</p>
            </div>
            <div className={styles.ShowDetailsItem}>
              <p className={styles.ItemHeading}>Phone Number</p>
              <p className={styles.ItemDetail}>{formatPhoneNumberNtl(loginInformation.mobile_phone)}</p>
            </div>
            <div className={styles.ShowDetailsItem}>
              <p className={styles.ItemHeading}>Current Address</p>
              <p className={styles.ItemDetail}>
                {currentAddress.street_address1}, {currentAddress.city} <br />
                {currentAddress.country}, {currentAddress.post_code}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
