/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import styles from './UserCardComponent.module.scss';
import { getUser } from '../../helpers';

function UserDetails({ bday, phone, email, address }) {
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
        <p className={styles['item-detail']}>{address}</p>
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

  render() {
    const { loginInformation } = this.props;
    const { showDetails } = this.state;
    const btnText = showDetails ? 'Show Less' : 'Show More';

    return (
      <div className={styles['UserCardContainer']}>
        <div className={styles['UserAvatar']}>
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar" />
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

        {showDetails && loginInformation ? <UserDetails bday={loginInformation.birth_date} phone={loginInformation.mobile_phone} email={loginInformation.primary_email} address={loginInformation.current_address} /> : null}
      </div>
    );
  }
}
