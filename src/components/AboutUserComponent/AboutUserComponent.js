import React from 'react';
import styles from './AboutUserComponent.css'


export const AboutUserComponent = (props) => {

    let {first_name, last_name, gender, mobile_phone, primary_email, id} = props.loginInformation;

    return (
        <div className={styles["AboutUserContainer"]}>
            <div className={styles["AboutContainer"]}>
                <div>
                    <h3>About</h3>
                    <p className={styles["AboutParagraph"]}>
                        Nam dapibus nisl vitae elit fringilla rutrum. Aenean
                        sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa.
                        Vestibulum sed metus in lorem tristique ullamcorper id vitae erat. Nulla mollis sapien
                        sollicitudin lacinia lacinia. Vivamus facilisis dolor.
                    </p>
                </div>
            </div>
            <h4 ref={props.aboutRef}>BASIC INFORMATION</h4>
            <div className={styles["BasicInformationContainer"]}>
                <div className={styles["row"]}><p className={styles["label"]}>Photo Icon</p><p
                    className={styles["value"]}>None</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Student ID</p><p
                    className={styles["value"]}>{id}</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Preferred Name</p><p
                    className={styles["value"]}>Lin</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Name</p><p
                    className={styles["value"]}>{first_name + ' ' + last_name}</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Gender</p><p
                    className={styles["value"]}>{gender}</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Ethnicity</p><p
                    className={styles["value"]}>Tionghoa</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Language</p><p
                    className={styles["value"]}>English</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>International Student ?</p><p
                    className={styles["value"]}>Yes</p></div>
            </div>
            <h4 ref={props.contactRef}>BASIC CONTACT</h4>
            <div className={styles["BasicContactContainer"]}>
                <div className={styles["row"]}><p className={styles["label"]}>Phone Number</p><p
                    className={styles["value"]}>{mobile_phone}</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Email Address <a href="">(Change)</a></p>
                    <p className={styles["email"]}>{primary_email}</p></div>
            </div>
            <h4>SOCIAL MEDIA</h4>
            <div className={styles["SocialMediaContainer"]}>
                <div className={styles["row"]}><p className={styles["label"]}>Gmail</p><p
                    className={styles["value"]}>yujielin@gmail.com</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Facebook</p><p
                    className={styles["value"]}>facebook.com/yuliejin</p></div>
                <div className={styles["row"]}><p className={styles["label"]}>Linkedin</p><p
                    className={styles["value"]}>Not Setup</p></div>
            </div>
            <h4>EMERGENCY CONTACT</h4>
            <div className={styles["EmergencyContactContainer"]}>
                <div className={styles["row"]}><p className={styles["name"]}>Septiandika Pratama</p><p
                    className={styles["email"]}>andikapratama48@gmail.com</p>
                    <p className={styles["subname"]}>Brother</p><p className={styles["phonenumber"]}>+123 456 789</p>
                </div>
                <div className={styles["row"]}><p className={styles["name"]}>Alex Milano</p><p
                    className={styles["email"]}>alexmilano@gmail.com</p>
                    <p className={styles["subname"]}>Father</p><p className={styles["phonenumber"]}>+123 456 789</p>
                </div>
            </div>
            <h4 ref={props.addressRef}>ADDRESS</h4>
            <div className={styles["AddressContainer"]}>
                <div>
                    <p className={styles["label"]}>Current Address</p>
                    {/*<a className={styles["ChangeAddressBtn"]}>Change Address</a>*/}
                    <p className={styles["address"]}>Mustika Ratu Street No 34, Lampung <br></br>Indonesia, 34381</p>
                </div>
            </div>
        </div>

    )
};
