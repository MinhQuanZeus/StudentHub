import React from 'react';
import css from './CalendarNotification.m.scss';
import PropTypes from 'prop-types';
import { getFromNow } from '../../helpers';


// working in progress
const notificationList = [
  {
    created_at: '2019-09-17T13:52:07.190Z',
    category: '',
    subject: '',
    title: 'Joe Michin have invited you to his Event “Meetup Class UI Designer ”',
    htmlString: `<b>Joe Michin</b> have invited you to his Event <b>“Meetup Class UI Designer ”</b>`,
    created_by: { id: 160, photo_url: 'https://ftpstation.s3.amazonaws.com/1567617887028', first_name: 'Nam', last_name: 'Nguyen' },
    type: 'Calendar',
    iconDisplay: true,
    iconName: 'calendar2',
  },
  {
    created_at: '2019-09-16T09:52:07.190Z',
    category: '',
    subject: '',
    title: 'You have 1 overdue task “Create Dashboard Page UI”',
    htmlString: `You have <b>1 overdue task “Create Dashboard Page UI”</b>`,
    created_by: { id: 160, photo_url: 'https://ftpstation.s3.amazonaws.com/1567617887028', first_name: 'Nam', last_name: 'Nguyen' },
    type: 'File',
    iconDisplay: true,
    iconName: 'file',
  },
  {
    created_at: '2019-09-15T09:52:07.190Z',
    category: '',
    subject: '',
    title: 'Your milestone Learn React Native has  “Completed”',
    htmlString: `Your milestone <b>Learn React Native</b> has <b>“Completed”</b>`,
    created_by: { id: 160, photo_url: 'https://ftpstation.s3.amazonaws.com/1567617887028', first_name: 'Nam', last_name: 'Nguyen' },
    type: '',
    iconDisplay: false,
    iconName: '',
  },
  {
    created_at: '2019-07-24T09:52:07.190Z',
    category: '',
    subject: '',
    title: 'You have received New task “Exam Math #4”',
    htmlString: `<b>You</b> have received New task <b>“Exam Math #4”</b>`,
    created_by: { id: 160, photo_url: 'https://ftpstation.s3.amazonaws.com/1567617887028', first_name: 'Nam', last_name: 'Nguyen' },
    type: 'File2',
    iconDisplay: true,
    iconName: 'file2',
  },
];

export const CalendarNotification = (props) => {
  const { isOpen } = props;
  return (
    <div>
      {isOpen && (
        <div className={css.CalendarNotificationContainer}>
          <div className={css.TopHeader}>
            <div className={css.Notification}>Notification</div>
            <div className={css.MarkAsRead}>Mark as read</div>
            <div className={css.Oval7}></div>
            <div className={css.Settings}>Settings</div>
          </div>
          <div className={css.CalendarNotificationList}>
            <div>
              {notificationList.map((item, idx) => (
                <div key={idx} className={css.NotificationItem}>
                  <div>
                    <p className={`${css.Oval} ${item.type ? css[item.type] : css.Default}`}>
                      {item.iconDisplay && <img alt="icon" src={`/images/${item.iconName}.svg`} />}
                    </p>
                  </div>
                  <div>
                    <span dangerouslySetInnerHTML={{ __html: item.htmlString }}></span>
                    <br></br>
                    <span className={css.NotificationItemBottom}>{getFromNow(item.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={css.Footer}>
            <p>View all</p>
          </div>
        </div>
      )}
    </div>
  );
};

CalendarNotification.propTypes = {
  isOpen: PropTypes.bool,
};

export default CalendarNotification;
