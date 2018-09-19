import React from 'react';
import style from './NotificationComponent.css';

export const NotificationComponent = (props) => (
    <div className='right'>
        <div className="right-side">
            <div className="coming-up">
                <div className="header"><i className="far fa-circle"></i> &nbsp; Coming Up</div>
                <div className="checkbox-list">
                    <label className="customcheck">Exam Sains Technology A
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="customcheck">Project #2
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                    <label className="customcheck">Exam Math
                        <input type="checkbox"/>
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
            <div className="notifications">
                <div className="header"><i className="far fa-circle"></i> &nbsp; Notifications</div>
                <div className="notification-list">
                    <div className="alert alert-danger">
                        <h4>Your Math Exam Score 30!</h4>
                        Get score to 70 or you are not pass Math
                    </div>
                    <div className="alert alert-warning">This is alert warning</div>
                    <div className="alert alert-info">This is alert info</div>
                    <div className="alert alert-success">This is alert success</div>
                </div>
            </div>
            <div className="upcoming">
                <div className="header"><i className="far fa-circle"></i> &nbsp; Upcoming Milestone</div>
                <div className="upcoming-list"></div>
            </div>
        </div>
    </div>
);