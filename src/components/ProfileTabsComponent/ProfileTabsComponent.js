import React from 'react';
import styles from './ProfileTabsComponent.module.css'


export const ProfileTabsComponent = (props) => {
    return (
        <div className={styles["ProfileTabsContainer"]}>
            <div className={styles["AboutTab"]} onClick={() => props.scrollToRef("about")}><p>&nbsp;About</p></div>
            <div className={styles["ContactInfoTab"]} onClick={() => props.scrollToRef("contact")}><p>Contact</p></div>
            <div className={styles["AddressTab"]} onClick={() => props.scrollToRef("address")}><p>Address</p></div>
        </div>
    )
};
