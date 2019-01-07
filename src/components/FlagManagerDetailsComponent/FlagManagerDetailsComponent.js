import React from 'react';

import styles from './FlagManagerDetailsComponent.css';


const FlagManagerDetailsComponent = (props) => {
    return (
        <div className={styles["section-container"]}>
            <div className={styles["column-left"]}>
                <div className={styles["details-container"]}>
                    <div className={styles["title-section"]}>
                        <p className={styles["title"]}>Title</p><p className={styles["value"]}>Get Some Jobs</p>
                    </div>
                    <div className={styles["status-section"]}>
                        <p className={styles["title"]}>Status</p><p className={styles["value"]}>Pending</p>
                    </div>
                    <div className={styles["flag-category-section"]}>
                        <p className={styles["title"]}>Flag Category</p><p className={styles["value"]}>Academic</p>
                    </div>
                    <div className={styles["flag-sub-category-section"]}>
                        <p className={styles["title"]}>Flag Sub Category</p><p className={styles["value"]}>Degree</p>
                    </div>
                    <div className={styles["priority-section"]}>
                        <p className={styles["title"]}>Priority</p><p className={styles["value"]}>Normal</p>
                    </div>
                    <div className={styles["severity-section"]}>
                        <p className={styles["title"]}>Severity</p><p className={styles["value"]}>Low</p>
                    </div>
                    <div className={styles["dispatch-type-section"]}>
                        <p className={styles["title"]}>Dispatch Type</p><p className={styles["value"]}>Public</p>
                    </div>
                    <div className={styles["date-created-section"]}>
                        <p className={styles["title"]}>Date Created</p><p className={styles["value"]}>14 Nov 2018</p>
                    </div>
                    <div className={styles["description-section"]}>
                        <p className={styles["title"]}>Description</p><p className={styles["value"]}>Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper metus. Sed sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. </p>
                    </div>
                </div>
                <div className={styles["comment-container"]}>
                    <div className={styles["write-comment-section"]}>
                        <img alt="user-avatar" className={styles["user-img-40"]}></img>
                        <input className={styles["comment-input"]}></input>
                        <button className={styles["post-comment-btn"]}></button>
                    </div>
                    <div className={styles["comment"]}>
                        <img alt="user-avatar" className={styles["user-img-40"]}></img>
                        <p className={styles["user-name-12"]}>Hu Hyon-Suk</p>
                        <p className={styles["comment-post-time"]}>12:23 AM</p>
                        <p className={styles["comment-value"]}>Keytar McSweeney's Williamsburg, readymade leggings try-hard 90's street art letterpress hoodie occupy Wes Anderson Banksy. Asymmetrical viral letterpress</p>
                    </div>
                    <div className={styles["comment"]}>
                        <img alt="user-avatar" className={styles["user-img-40"]}></img>
                        <p className={styles["user-name-12"]}>Pin Jung-Eum</p>
                        <p className={styles["comment-post-time"]}>Yesterday</p>
                        <p className={styles["comment-value"]}>Tousled food truck polaroid, salvia bespoke small batch Pinterest Marfa. Fingerstache authentic craft beer</p>
                    </div>
                </div>
                <div className={styles["date-created-section"]}>
                    <p className={styles["title"]}>Date Created</p><p className={styles["value"]}>14 Nov 2018</p>
                </div>
                <div className={styles["description-section"]}>
                    <p className={styles["title"]}>Description</p><p className={styles["value"]}>Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vitae ullamcorper metus. Sed sollicitudin ipsum quis nunc sollicitudin ultrices. Donec euismod scelerisque ligula. Maecenas eu varius risus, eu aliquet arcu. </p>
                </div>
              </div>
            <div className={styles["assign-to-container"]}>
                <p className={styles["sub-heading"]}>Assign To</p>
                <img alt="user-avatar" className={styles["user-img50"]}></img> <p className={styles["user-name-18"]}>Arina Belomestnykh</p>
            </div>
            <div className={styles["tag-container"]}>
                <p className={styles["sub-heading"]}>Tag</p>
                <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Michael</p>
                <img alt="user-avatar" className={styles["user-img50"]}></img> <p className={styles["user-name-12"]}>Evi</p>
                <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Justin</p>
                <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Kery</p>
            </div>
            <div className={styles["column-right"]}>
                <div className={styles["assign-to-container"]}>
                    <p className={styles["sub-heading"]}>Assign To</p>
                    <img alt="user-avatar" className={styles["assign-user-img"]}></img> <p className={styles["user-name-18"]}>Arina Belomestnykh</p>
                </div>
                <div className={styles["tag-container"]}>
                    <p className={styles["sub-heading"]}>Tag</p>
                    <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Michael</p>
                    <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Evi</p>
                    <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Justin</p>
                    <img alt="user-avatar" className={styles["user-img-50"]}></img> <p className={styles["user-name-12"]}>Kery</p>
                </div>
                <div className={styles["attachment-container"]}>
                    <p className={styles["sub-heading"]}>Attachment</p>
                    <img alt="attachment" className={styles["attachment-img"]}></img>
                    <img alt="attachment" className={styles["attachment-img"]}></img>
                </div>
                <div className={styles["modify-history-container"]}>
                    <p className={styles["sub-heading"]}>Modify History</p>
                    <div className={styles["history-item"]}>
                        <img alt="user-avatar" className={styles["user-img-40"]}></img>
                        <p className={styles["history-text"]}>Hu Hyon-Suk Reassigned this flag to “Michael Rafael”</p>
                        <p className={styles["history-time"]}>12:23 AM</p>
                    </div>
                    <div className={styles["history-item"]}>
                        <img alt="user-avatar" className={styles["user-img-40"]}></img>
                        <p className={styles["history-text"]}>Jonathan Doe Changed Status to “Pending”</p>
                        <p className={styles["history-time"]}>16:23 AM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlagManagerDetailsComponent;
