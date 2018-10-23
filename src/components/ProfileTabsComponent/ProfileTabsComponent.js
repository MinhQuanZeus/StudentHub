import React from 'react';
import styles from './ProfileTabsComponent.css'


export const ProfileTabsComponent = (props) => {

    return (
        <div className={styles["ProfileTabsContainer"]}>
            <div className={styles["AboutTab"]}><p>&nbsp;About</p></div>
            <div className={styles["ContactInfoTab"]}><p>Contact</p></div>
            <div className={styles["AddressTab"]}><p>Address</p></div>
    
        </div>

    )
};