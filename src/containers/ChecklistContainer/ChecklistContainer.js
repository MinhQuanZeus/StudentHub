import React, {Component} from 'react';
import sharedStyles from '../../styles/styles.css';
import {ChecklistComponent} from '../../components/ChecklistComponent/ChecklistComponent'
import {onFetchCheckList} from "../../actions/CheckListActions/CheckListActions";
import connect from "react-redux/es/connect/connect";

class ChecklistContainer extends Component {

    componentWillMount() {
        this.props.onFetchCheckList(this.props.loginInformation.x_access_token);
    }

    render() {
        return (
            <div className={sharedStyles["content-container-NoNotification"]}>
                <ChecklistComponent data={this.props.checkList}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        checkList: state.checkList,
        loginInformation: state.login.loginInformation
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchCheckList: (x_access_token) => dispatch(onFetchCheckList(x_access_token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChecklistContainer);