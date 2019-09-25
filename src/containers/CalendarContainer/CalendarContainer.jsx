import React, { Component } from 'react';
import { CalendarComponent } from '../../components/CalendarComponents/CalendarComponent';
import sharedStyles from '../../styles/styles.module.css';
import CalendarPopup from '../../components/CalendarComponents/CalendarPopup';
import { getAccessToken } from '../../helpers';
import { apiConstants } from '../../constants/applicationConstants';
import { CALENDER_EVENTS_FILTER_BY_CATEGORY_OPTIONS } from '../../constants';
import css from './CalendarContainer.m.scss';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import CategoryList from '../../components/CalendarComponents/CategoryList';
import InvitationList from '../../components/CalendarComponents/InvitationList';
import EventListComponent from '../../components/CalendarComponents/EventListComponent';
import EventDetailsComponent from '../../components/CalendarComponents/EventDetailsComponent';

const popup = (event, e) => {
  if (event.category === 'classes') {
    return;
  }
  const popupDIV = document.getElementById('popupDIV');

  popupDIV.className -= 'hideClass';

  const mouseX = e.nativeEvent.clientX;
  const mouseY = e.nativeEvent.clientY;
  const screenX = window.innerWidth;
  const screenY = window.innerHeight;
  if (mouseX + 604 > screenX) {
    {
      /* if too far right*/
    }
    popupDIV.style.left = mouseX - 604 + 'px';
  } else {
    popupDIV.style.left = mouseX + 'px';
  }

  if (mouseY + 462 > screenY) {
    {
      /* if too low*/
    }
    popupDIV.style.top = mouseY - 0 + 'px';
  }
  if (mouseY - 462 < 0) {
    {
      /* if too high*/
    }
    popupDIV.style.top = mouseY - 200 + 'px';
  } else {
    popupDIV.style.top = mouseY - 240 + 'px';
  }
};

class CalendarContainer extends Component {
  constructor(props) {
    super(props);
    this.calendarContainerRef = React.createRef();
    this.eventListComponentRef = React.createRef();
    this.state = {
      events: [],
      calendarEvents: [],
      currentEvent: {},
      categoryListShow: true,
      invitationListShow: true,
      selectedDate: new Date(),
      categories: CALENDER_EVENTS_FILTER_BY_CATEGORY_OPTIONS,
      viewMode: 'DESKTOP',
      showEventDetails: false,
    };
  }

  componentDidMount() {
    this.onDateChanged(new Date());
    window.addEventListener('resize', this.setViewMode);
    this.setViewMode();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setViewMode);
  }

  setViewMode = () => {
    const width = window.innerWidth;
    const viewMode = width < 767 ? 'MOBILE' : 'DESKTOP';
    const isDesktopViewMode = viewMode === 'DESKTOP' ? true : false;
    if (viewMode !== this.state.viewMode) {
      this.setState({ viewMode: viewMode, categoryListShow: isDesktopViewMode, invitationListShow: isDesktopViewMode });
    }
  };

  onCheckedCategory = (category) => {
    const categories = this.state.categories;
    categories.map((item) => (item.isActive = item.value === category.value ? !category.isActive : item.isActive));
    this.setState({ categories: categories });
    if (this.state.viewMode === 'DESKTOP') {
      this.onApplyFilter();
    }
  };

  onApplyFilter = () => {
    const isMobileViewMode = this.state.viewMode === 'MOBILE' ? false : true;
    const categories = this.state.categories;
    const selectedCategory = categories.filter((item) => item.isActive).map((item) => item.value);
    const events = this.state.events || [];
    const calendarEvents = events.filter((event) => selectedCategory.includes(event.category));
    this.setState({ calendarEvents: calendarEvents, categoryListShow: isMobileViewMode });
  };

  _getEndDates(startDate, endDate = null) {
    const firstDay = endDate
      ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1)
      : new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastDay = endDate
      ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 2)
      : new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
    return {
      firstDay: firstDay.toISOString().split('T')[0],
      lastDay: lastDay.toISOString().split('T')[0],
    };
  }

  onToggle = (key) => {
    this.setState({ [key]: !this.state[key] });
  };

  onNavigate = (date) => {
    if (date instanceof Date) {
      this.setState({ selectedDate: new Date(date) });
    }
  };

  async onDateChanged(startDate, endDate = null) {
    const { firstDay, lastDay } = this._getEndDates(startDate, endDate);
    this.setState(() => ({
      isLoading: true,
      calendarEvents: [],
      events: [],
    }));
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    };

    try {
      const responses = await Promise.all([
        fetch(`${apiConstants.BACKEND_URL}${apiConstants.STUDENT_CALENDAR_CLASS}?from_date=${firstDay}&to_date=${lastDay}`, options),
        fetch(`${apiConstants.BACKEND_URL}${apiConstants.STUDENT_CALENDAR_CHECK_LIST}?from_date=${firstDay}&to_date=${lastDay}`, options),
      ]);
      const bodies = await Promise.all(responses.map((o) => o.json()));
      let events = [];
      if (bodies[0].data && bodies[0].data.length) {
        const temp = bodies[0].data.map((obj) => {
          return {
            title: obj.title,
            allDay: obj.allDay,
            start: new Date(obj.start_time),
            end: new Date(obj.end_time),
            category: 'classes',
          };
        });

        events = [...events, ...temp];
      }
      if (bodies[1].data && bodies[1].data.length) {
        const temp = bodies[1].data.map((obj) => {
          return {
            title: obj.check_list_name,
            allDay: true,
            start: new Date(obj.due_date),
            end: new Date(obj.due_date),
            category: 'checklist',
            data: obj,
          };
        });

        events = [...events, ...temp];
      }
      this.setState(() => ({
        isLoading: false,
        calendarEvents: events,
        events: events,
      }));
    } catch (e) {
      console.log(e);
    }
  }

  getCategoryListComponent = () => {
    const { viewMode, categoryListShow, categories } = this.state;
    const isMobileViewMode = viewMode === 'MOBILE' ? true : false;
    return (
      <CategoryList
        categoryListShow={categoryListShow}
        onToggle={this.onToggle}
        categories={categories}
        label={isMobileViewMode ? 'Filter' : 'Category List'}
        onCheckedCategory={this.onCheckedCategory}
        checkbox={isMobileViewMode}
        viewMode={viewMode}
        onApplyFilter={this.onApplyFilter}
      />
    );
  };

  getInvitationListComponent = () => {
    const { invitationListShow } = this.state;
    return <InvitationList invitationListShow={invitationListShow} onToggle={this.onToggle} />;
  };

  getHeaderComponent = () => {
    const { categoryListShow } = this.state;
    return (
      <HeaderComponent labels={['Calendar']}>
        <div className={css.MobileView}>
          <div className={css.Filter} onClick={() => this.onToggle('categoryListShow')}>
            <div className={css.FilterIcon}>
              <div className={css.TriangleTop}></div>
              <div className={css.Rectangle}></div>
              <div className={css.TriangleBottom}></div>
            </div>
            <div>
              <p>{categoryListShow ? 'Cancel' : 'Filter'}</p>
            </div>
          </div>
        </div>
      </HeaderComponent>
    );
  };

  onSelectEvent = (event, e) => {
    this.setState({ currentEvent: event });
    if (this.state.viewMode === 'MOBILE') {
      this.calendarContainerRef.current.scrollTo({
        top: this.eventListComponentRef.current.offsetTop - 110,
        behavior: 'smooth',
      });
    } else {
      popup(event, e);
    }
  };

  getCalendarComponent = () => {
    const { calendarEvents, currentEvent, selectedDate, viewMode } = this.state;
    return (
      <div>
        <CalendarComponent
          calendarData={calendarEvents || []}
          onDateChanged={(startDate, endDate) => this.onDateChanged(startDate, endDate)}
          onSelectEvent={(event, e) => this.onSelectEvent(event, e)}
          selectedDate={selectedDate}
          onNavigate={this.onNavigate}
          viewMode={viewMode}
        />
        <CalendarPopup eventDetail={currentEvent} />
      </div>
    );
  };

  onShowHideEventDetails = (show, event) => {
    this.setState({
      showEventDetails: show,
      currentEvent: show ? event : {},
    });
  };

  getMobileViewContent = () => {
    const { categoryListShow, currentEvent } = this.state;

    if (this.state.showEventDetails) {
      return (
        <div>
          <div onClick={() => this.onShowHideEventDetails(false)}>
            <HeaderComponent labels={['Back to Calendar']} />
          </div>
          <EventDetailsComponent event={currentEvent} />
        </div>
      );
    }

    return (
      <div className={css.MobileView}>
        {this.getHeaderComponent()}
        {categoryListShow && (
          <div>
            <hr></hr>
            {this.getCategoryListComponent()}
          </div>
        )}
        <hr></hr>
        {this.getInvitationListComponent()}
        <hr></hr>
        {this.getCalendarComponent()}
        <div ref={this.eventListComponentRef}>
          <EventListComponent
            currentEvent={currentEvent}
            eventList={currentEvent.multiEvents || []}
            onShowHideEventDetails={this.onShowHideEventDetails}
          />
        </div>
      </div>
    );
  };

  getDesktopViewContent = () => {
    return (
      <div>
        <div className={`${css.CalendarLeftContainer}`}>
          <HeaderComponent labels={['Calendar']} />
          <div className={css.CreateEventBtn}>Create Event</div>
          <div className={css.LeftSideList}>
            {this.getCategoryListComponent()}
            {this.getInvitationListComponent()}
          </div>
        </div>
        <div className={css.CalendarRightContainer}>{this.getCalendarComponent()}</div>
      </div>
    );
  };

  getContent = () => {
    if (this.state.viewMode === 'MOBILE') {
      return this.getMobileViewContent();
    } else {
      return this.getDesktopViewContent();
    }
  };

  render() {
    return (
      <div ref={this.calendarContainerRef} className={`${sharedStyles['content-container']} ${css.CalendarContainer}`}>
        {this.getContent()}
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     calendarData: state.calendarData,
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onFetchCalendarData: (x_access_token, from_date, to_date) =>
//       dispatch(onFetchCalendarData(x_access_token, from_date, to_date)),
//   };
// };

export default CalendarContainer;
