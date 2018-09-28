import React, {Component} from 'react';
import styles from './ClassTrackerContainer.css';
import {ContentHeadingComponent} from '../../components/ContentHeadingComponent/ContentHeadingComponent'
import {TabsComponent} from '../../components/TabsComponent/TabsComponent'
import {TableComponent} from '../../components/TableComponent/TableComponent'

class ClassTrackerContainer extends Component {
    render() {
        return (
            <div className={styles["ClassTracker"]}>
                <ContentHeadingComponent />
                <TabsComponent />
                <TableComponent />
                
            </div>
        )
    }
}

export default ClassTrackerContainer;