import React, { Component } from 'react';
import styles from './UserCardComponent.module.css'

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
  )
}

export class UserCardComponent extends Component {
    state = {
      showDetails: false,
    }

    toggleDetails = () => {
      this.setState({ showDetails: !this.state.showDetails })
    }


    render() {
        const { first_name, last_name, birth_date, mobile_phone, primary_email, current_address } = this.props.loginInformation;
        const { showDetails } = this.state;
        const btnText = showDetails ? 'Show Less' : 'Show More';

        return (
            <div className={styles["UserCardContainer"]}>
                <div className={styles["UserAvatar"]}><img src="https://www.w3schools.com/howto/img_avatar.png" alt="User Avatar">{/*remove border after pic added */}</img></div>
                <div className={styles["UserName"]}><p>{first_name + ' ' + last_name}</p></div>
                <div className={styles["UserMajor"]}><p>Computer Science, BS</p></div>
                <div className={styles["ShowMoreBtn"]} onClick={this.toggleDetails}>
                    <a>{btnText}</a>
                </div>
                {showDetails
                    ? <UserDetails bday={birth_date} phone={mobile_phone} email={primary_email} address={current_address} />
                    : null}
            </div>

        )
    }
};
