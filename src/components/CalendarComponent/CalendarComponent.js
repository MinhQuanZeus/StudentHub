import React from 'react';
import styles from './CalendarComponent.css';





export const CalendarComponent = (props) => {
    return (
        <div className={styles["section-container"]}>
            <div className={styles["section-header"]}>
                <div className={styles["calender-label"]}>Calendar</div>
                <div className={styles["month-displaying"]}>November 2018</div>
                <div className={styles["view-selector-btn"]}>Monthly</div>
                <div className={styles["next-btn"]}>&#8250;</div>
                <div className={styles["previous-btn"]}>&#8249;</div>
                <div className={styles["today-btn"]}>Today</div>
            </div>
                <div className={styles["section-sidebar"]}>
                    <div className={styles["create-event-btn"]}>Create Event</div>
                    <div className={styles["catagory-list"]}>
                        <h3>Category List</h3>
                        <div className={styles["catagory-list-labels"]}>
                        <div><span className={styles["red-dot"]}></span> <p className={styles["meeting-label"]}>Meeting</p></div>
                        <div><span className={styles["purple-dot"]}></span> <p className={styles["classes-label"]}>Classes</p></div>
                        <div><span className={styles["gold-dot"]}></span> <p className={styles["program-event-label"]}>Program Event</p></div>
                        <div><span className={styles["brown-dot"]}></span> <p className={styles["school-event-label"]}>School Event</p></div>
                        <div><span className={styles["green-dot"]}></span> <p className={styles["checklist-label"]}>Checklist</p></div>
                        </div>
                    </div>
                    <div className={styles["invitation-list"]}>
                        <h3>Invitation List</h3>
                        <p className={styles["invitation"]}><b>Joe</b> Invited you in his event <b>"Meeting Staff Only"</b><br></br><span>2 Hours Ago</span></p>
                        <p className={styles["invitation"]}><b>Risa</b> Invited you in his event <b>"Design Fest 2018"</b><br></br><span>Yesterday</span></p>
                    </div>
            </div>
            <div className={styles["calendar"]}>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Sun</p></div>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Mon</p></div>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Tue</p></div>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Wed</p></div>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Thu</p></div>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Fri</p></div>
                <div className={styles["col-label"]}><p className={styles["day-label"]}>Sat</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>28</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>29</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>30</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>31</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>1</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>2</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>3</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>4</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>5</p><p className={styles["calender-event-class"]}>Workshop UI Designer</p><p className={styles["calender-event-meeting"]}>Meeting in Aula #1</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>6</p></div>
                <div className={styles["day"]}><p className={styles["day-label-selected"]}>7</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>8</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>9</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>10</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>11</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>12</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>13</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>14</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>15</p><p className={styles["calender-event-meeting"]}>Meet Client #2</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>16</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>17</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>18</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>19</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>20</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>21</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>22</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>23</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>24</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>25</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>26</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>27</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>28</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>29</p></div>
                <div className={styles["day"]}><p className={styles["day-label"]}>30</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>1</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>2</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>3</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>4</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>5</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>6</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>7</p></div>
                <div className={styles["day"]}><p className={styles["day-label-faded"]}>8</p></div>
            </div>
        </div>
    )
};