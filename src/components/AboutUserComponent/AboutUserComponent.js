import React from 'react';
import styles from './AboutUserComponent.module.css';
import { getUser } from '../../helpers';

export const AboutUserComponent = (props) => {
  const { first_name, last_name, gender, mobile_phone, primary_email, id } = props.loginInformation;

  return (
    <div className={styles['AboutUserContainer']}>
      <div className={styles['AboutContainer']}>
        <div>
          <div className={styles['rowHeader']}>
            <h3 ref={props.aboutRef}>About</h3>
            <div className={styles['headRight']}>
              <p className={styles['headRight']}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                  <path d="M11.67 3.329l-1.081 1.08a.282.282 0 0 1-.398 0L7.589 1.808a.282.282 0 0 1 0-.399L8.669.33a1.127 1.127 0 0 1 1.592 0l1.409 1.408c.44.439.44 1.151 0 1.592zm-5.01-.992L.507 8.492.009 11.34a.563.563 0 0 0 .651.652l2.848-.5 6.155-6.154a.282.282 0 0 0 0-.399L7.061 2.337a.284.284 0 0 0-.4 0zM2.909 7.965a.327.327 0 0 1 0-.464l3.61-3.61a.327.327 0 0 1 .464 0 .327.327 0 0 1 0 .464l-3.61 3.61a.327.327 0 0 1-.464 0zm-.846 1.971h1.125v.851l-1.512.265-.729-.73.265-1.51h.851v1.124z" />
                </svg>{' '}
                Edit
              </p>
            </div>
          </div>
          <p className={styles['AboutParagraph']}>
            Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis
            nisl nunc et massa. Vestibulum sed metus in lorem tristique ullamcorper id vitae erat. Nulla mollis sapien sollicitudin lacinia
            lacinia. Vivamus facilisis dolor.
          </p>
        </div>
      </div>
      <div className={styles['rowHeader']}>
        <h4>BASIC INFORMATION</h4>
        <div className={styles['headRight']}>
          <p className={styles['headRight']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
              <path d="M11.67 3.329l-1.081 1.08a.282.282 0 0 1-.398 0L7.589 1.808a.282.282 0 0 1 0-.399L8.669.33a1.127 1.127 0 0 1 1.592 0l1.409 1.408c.44.439.44 1.151 0 1.592zm-5.01-.992L.507 8.492.009 11.34a.563.563 0 0 0 .651.652l2.848-.5 6.155-6.154a.282.282 0 0 0 0-.399L7.061 2.337a.284.284 0 0 0-.4 0zM2.909 7.965a.327.327 0 0 1 0-.464l3.61-3.61a.327.327 0 0 1 .464 0 .327.327 0 0 1 0 .464l-3.61 3.61a.327.327 0 0 1-.464 0zm-.846 1.971h1.125v.851l-1.512.265-.729-.73.265-1.51h.851v1.124z" />
            </svg>{' '}
            Edit
          </p>
        </div>
      </div>
      <div className={styles['BasicInformationContainer']}>
        <div className={styles['row']}>
          <p className={styles['label']}>Photo Icon</p>
          <p className={styles['value']}>None</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Student ID</p>
          <p className={styles['value']}>{id}</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Preferred Name</p>
          <p className={styles['value']}>Lin</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Name</p>
          <p className={styles['value']}>{first_name + ' ' + last_name}</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Gender</p>
          <p className={styles['value']}>{gender}</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Ethnicity</p>
          <p className={styles['value']}>Tionghoa</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Language</p>
          <p className={styles['value']}>English</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>International Student ?</p>
          <p className={styles['value']}>Yes</p>
        </div>
      </div>
      <h4 ref={props.contactRef}>BASIC CONTACT</h4>
      <div className={styles['BasicContactContainer']}>
        <div className={styles['row']}>
          <p className={styles['label']}>Phone Number</p>
          <p className={styles['value']}>{mobile_phone}</p>
        </div>
        {/* <div className={styles["row"]}><p className={styles["label"]}>Email Address <a href="">(Change)</a></p>*/}
        <div className={styles['row']}>
          <p className={styles['label']}>Email Address</p>
          <p className={styles['email']}>{primary_email}</p>
        </div>
      </div>
      <div className={styles['rowHeader']}>
        <h4>SOCIAL MEDIA</h4>
        <div className={styles['headRight']}>
          <p className={styles['headRight']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
              <path d="M11.67 3.329l-1.081 1.08a.282.282 0 0 1-.398 0L7.589 1.808a.282.282 0 0 1 0-.399L8.669.33a1.127 1.127 0 0 1 1.592 0l1.409 1.408c.44.439.44 1.151 0 1.592zm-5.01-.992L.507 8.492.009 11.34a.563.563 0 0 0 .651.652l2.848-.5 6.155-6.154a.282.282 0 0 0 0-.399L7.061 2.337a.284.284 0 0 0-.4 0zM2.909 7.965a.327.327 0 0 1 0-.464l3.61-3.61a.327.327 0 0 1 .464 0 .327.327 0 0 1 0 .464l-3.61 3.61a.327.327 0 0 1-.464 0zm-.846 1.971h1.125v.851l-1.512.265-.729-.73.265-1.51h.851v1.124z" />
            </svg>{' '}
            Edit
          </p>
        </div>
      </div>
      <div className={styles['SocialMediaContainer']}>
        <div className={styles['row']}>
          <p className={styles['label']}>Gmail</p>
          <p className={styles['value']}>yujielin@gmail.com</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Facebook</p>
          <p className={styles['value']}>facebook.com/yuliejin</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['label']}>Linkedin</p>
          <p className={styles['value']}>Not Setup</p>
        </div>
      </div>
      <div className={styles['rowHeader']}>
        <h4>EMERGENCY CONTACT</h4>
        <div className={styles['headRight']}>
          <p className={styles['headRight']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
              <path d="M11.67 3.329l-1.081 1.08a.282.282 0 0 1-.398 0L7.589 1.808a.282.282 0 0 1 0-.399L8.669.33a1.127 1.127 0 0 1 1.592 0l1.409 1.408c.44.439.44 1.151 0 1.592zm-5.01-.992L.507 8.492.009 11.34a.563.563 0 0 0 .651.652l2.848-.5 6.155-6.154a.282.282 0 0 0 0-.399L7.061 2.337a.284.284 0 0 0-.4 0zM2.909 7.965a.327.327 0 0 1 0-.464l3.61-3.61a.327.327 0 0 1 .464 0 .327.327 0 0 1 0 .464l-3.61 3.61a.327.327 0 0 1-.464 0zm-.846 1.971h1.125v.851l-1.512.265-.729-.73.265-1.51h.851v1.124z" />
            </svg>{' '}
            Edit
          </p>
        </div>
      </div>
      <div className={styles['EmergencyContactContainer']}>
        <div className={styles['row']}>
          <p className={styles['name']}>Septiandika Pratama</p>
          <p className={styles['email']}>andikapratama48@gmail.com</p>
          <p className={styles['subname']}>Brother</p>
          <p className={styles['phonenumber']}>+123 456 789</p>
        </div>
        <div className={styles['row']}>
          <p className={styles['name']}>Alex Milano</p>
          <p className={styles['email']}>alexmilano@gmail.com</p>
          <p className={styles['subname']}>Father</p>
          <p className={styles['phonenumber']}>+123 456 789</p>
        </div>
      </div>
      <h4 ref={props.addressRef}>ADDRESS</h4>
      <div className={styles['AddressContainer']}>
        <div>
          <p className={styles['label']}>Current Address</p>
          {/* <a className={styles["ChangeAddressBtn"]}>Change Address</a>*/}
          <p className={styles['address']}>
            Mustika Ratu Street No 34, Lampung <br />
            Indonesia, 34381
          </p>
        </div>
      </div>
    </div>
  );
};
