import React from 'react';
import styles from './DegreeAuditChartsComponent.css'

export const DegreeAuditChartsComponent = (props) => {

    if (props.degreeAudit !== undefined && props.degreeAudit !== null) {
        console.log(JSON.stringify(props.degreeAudit, null, 4));

        return (
            <div className={styles["ChartContainer"]}>
                <div className={styles["AuditContainer"]}>
                    <div className={styles["AuditHeader"]}>Audit</div>
                    <div className={styles["CircleGraph"]}>
                        <div className={styles["PieGraph1"]}>
                            <div className={styles["PieGraph2"]}>
                                <div className={styles["PieGraph3"]}></div>
                            </div>
                            <div className={styles["PieGraph4"]}>
                                <div className={styles["PieGraph5"]}></div>
                            </div>
                            <div className={styles["Piegraph6"]}>
                                <div className={styles["PieGraph7"]}></div>
                            </div>
                            <div className={styles["PieGraph8"]}>
                                <div className={styles["PieGraph9"]}></div>
                            </div>
                        </div>
                        <div className={styles["CircleGraphCenter"]}>
                            <p className={styles["CircleGraphValue"]}>67</p>
                            <p className={styles["CircleGraphValueLabel"]}>Hours</p>
                        </div>
                        <div className={styles["CircleGraphLabel"]}>Total Hours</div>
                    </div>
                    <div className={styles["GPAGraph"]}>
                        <div className={styles["VerticalBarContainer"]}>
                            <div className={styles["GrayBar"]}>
                                <div className={styles["BlueBar"]}></div>
                            </div>
                            <div className={styles["Gridline0"]}><p className={styles["GridlineLabel"]}>0</p></div>
                            <div className={styles["Gridline1"]}><p className={styles["GridlineLabel"]}>1.0</p></div>
                            <div className={styles["Gridline2"]}><p className={styles["GridlineLabel"]}>2.0</p></div>
                            <div className={styles["Gridline3"]}><p className={styles["GridlineLabel"]}>3.0</p></div>
                            <div className={styles["Gridline4"]}><p className={styles["GridlineLabel"]}>4.0</p></div>
                        </div>
                        <div className={styles["GPALabel"]}>GPA</div>

                    </div>
                    <div className={styles["CourseCompleted"]}>
                        <div className={styles["CourseCompletedLabel"]}>Course Completed</div>
                        <div className={styles["CourseBarContainer"]}>
                            <div className={styles["CourseBar"]}></div>
                            <div className={styles["CourseValue"]}>80%</div>
                        </div>

                    </div>
                </div>
                <div className={styles["CategoriesContainer"]}>
                    <div className={styles["CategoryHeader"]}>
                        <p className={styles["LeftHeader"]}>Categories</p>
                        <p className={styles["RightHeader"]}>
                          <span className={styles["PurpleDot"]}></span>
                          <span className={styles["StatusLabel"]}>Status</span>
                          <span className={styles["BlueDot"]}></span>
                          <span className={styles["RequirementsLabel"]}> Requirements</span>
                        </p>
                    </div>
                    <div className={styles["CategoryRow"]}>
                        <div className={styles["Category"]}>Hours Completed</div>
                        <div className={styles["StatusBar"]}></div>
                        <div className={styles["BarValue"]}>67</div>
                        <div className={styles["Requirment"]}>(min hours: 50)</div>
                        <div className={styles["RequirmentBar"]}></div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }

}
