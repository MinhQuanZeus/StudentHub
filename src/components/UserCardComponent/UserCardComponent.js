/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from './UserCardComponent.module.scss';
import { getUser, formatPhoneNumberNtl } from '../../helpers';
import defaultAvatar from '../../images/img_avatar.png';
import { format } from 'date-fns';

function UserDetails({ bday, phone, email, currentAddress }) {
  return (
    <div className={styles['show-details']}>
      <div className={styles['show-details-item']}>
        <p className={styles['item-heading']}>Birthday</p>
        <p className={styles['item-detail']}>{format(bday, 'MMMM DD, YYYY')}</p>
      </div>
      <div className={styles['show-details-item']}>
        <p className={styles['item-heading']}>Email</p>
        <p className={styles['item-detail']}>{email}</p>
      </div>
      <div className={styles['show-details-item']}>
        <p className={styles['item-heading']}>Phone Number</p>
        <p className={styles['item-detail']}>{phone}</p>
      </div>
      <div className={styles['show-details-item']}>
        <p className={styles['item-heading']}>Current Address</p>
        <p className={styles['item-detail']}>
          {currentAddress.street_address1}, {currentAddress.city} <br />
          {currentAddress.country}, {currentAddress.post_code}
        </p>
      </div>
    </div>
  );
}

export class UserCardComponent extends Component {
  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
    this.props.toggleDetails(!this.state.showDetails);
  };

  render() {
    const { loginInformation, currentAddress } = this.props;
    const { showDetails } = this.state;
    const btnText = showDetails ? 'Show Less' : 'Show More';

    return (
      <div className={styles['UserCardContainer']}>
        <div className={styles['UserAvatar']}>
          <img src={loginInformation && loginInformation.photo_url ? loginInformation.photo_url : defaultAvatar} alt="User Avatar" />
        </div>
        <div className={styles['UserName']}>
          {loginInformation && <p>{`${loginInformation.first_name} ${loginInformation.last_name}`}</p>}
        </div>
        <div className={styles['UserMajor']}>
          <p>Computer Science, BS</p>
        </div>
        <div>
          <a href="#" className={styles['ShowMoreBtn']} onClick={this.toggleDetails}>
            {btnText}
          </a>
        </div>

        {showDetails && loginInformation ? (
          <UserDetails
            bday={loginInformation.birth_date || loginInformation.birthdate}
            phone={formatPhoneNumberNtl(loginInformation.mobile_phone)}
            email={loginInformation.primary_email}
            currentAddress={currentAddress}
          />
        ) : null}
      </div>
    );
  }
}
