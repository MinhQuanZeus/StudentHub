import React, {Component} from 'react';
import sharedStyles from '../../styles/styles.css';
import {ChecklistComponent} from '../../components/ChecklistComponent/ChecklistComponent'

class ChecklistContainer extends Component {
    render() {
        return (
            <div className={sharedStyles["content-container-NoNotification"]}>
              <ChecklistComponent/>
            </div>
        )
    }
} 

export default ChecklistContainer;