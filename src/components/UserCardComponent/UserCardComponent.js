/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import styles from './UserCardComponent.module.scss';
import { getUser } from '../../helpers';

function UserDetails({ bday, phone, email, currentAddress }) {
  return (
    <div className={styles['show-details']}>
      <div className={styles['show-details-item']}>
        <p className={styles['item-heading']}>Birthday</p>
        <p className={styles['item-detail']}>{bday}</p>
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
  };

  formatMobileNumber = (value) => {
    if (!value) {
      return;
    }
    value = value.replace(/\+1/g, '');
    const input = value.replace(/\D/g, '').substring(0, 10);
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);
    let phoneNumber = 0;

    if (input.length > 6) {
      phoneNumber = `(${zip}) ${middle}-${last}`;
    } else if (input.length > 3) {
      phoneNumber = `(${zip}) ${middle}`;
    } else if (input.length > 0) {
      phoneNumber = `(${zip}`;
    } else {
      phoneNumber = '';
    }
    return phoneNumber;
  };

  render() {
    const { loginInformation, currentAddress } = this.props;
    const { showDetails } = this.state;
    const btnText = showDetails ? 'Show Less' : 'Show More';

    return (
      <div className={styles['UserCardContainer']}>
        <div className={styles['UserAvatar']}>
          <img src={loginInformation && loginInformation.photo_url} alt="User Avatar" />
        </div>
        <div className={styles['UserName']}>
          <p>{loginInformation && loginInformation.first_name + ' ' + loginInformation.last_name}</p>
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
            bday={loginInformation.birth_date}
            phone={this.formatMobileNumber(loginInformation.mobile_phone)}
            email={loginInformation.primary_email}
            currentAddress={currentAddress}
          />
        ) : null}
      </div>
    );
  }
}
