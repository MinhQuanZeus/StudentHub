import React from 'react';
import '../CalendarComponents/CalendarPopup.css';
import CheckListList from './CheckListList';

const hideDIV = () => {
  const popupDIV = document.getElementById('popupDIV');
  popupDIV.className += ' hideClass';
};

const getPopup = (eventDetail) => {
  switch (eventDetail.category) {
    case 'checklist':
      return <CheckListList details={eventDetail} />;
    default:
      return null;
  }
};

export const CalendarPopup = (props) => {
  const { eventDetail } = props;
  return (
    <div className="popup_container hideClass" id="popupDIV">
      {getPopup(eventDetail)}
      <button onClick={hideDIV} className="close-btn" id="close-btn">
        &#215;
      </button>
    </div>
  );
};
export default CalendarPopup;
