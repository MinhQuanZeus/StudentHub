import React, { Component } from 'react';
import sharedStyles from '../../styles/styles.module.css';
import { ChecklistComponentSubItems } from '../../components/ChecklistComponentSubItems/ChecklistComponentSubItems';
import { onFetchCheckList } from '../../actions/CheckListActions/CheckListActions';
import connect from 'react-redux/es/connect/connect';
import { AppContext } from '../AppContext';

class ChecklistContainerSubItems extends Component {
  componentWillMount() {
    this.props.onFetchCheckList(this.context.user.x_access_token);
  }

  render() {
    return (
      <div className={sharedStyles['content-container-NoNotification']}>
        <ChecklistComponentSubItems data={this.props.checkList} />
      </div>
    );
  }
}

ChecklistContainerSubItems.contextType = AppContext;

const mapStateToProps = state => {
  return {
    checkList: state.checkList,
    loginInformation: state.login.loginInformation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCheckList: x_access_token =>
      dispatch(onFetchCheckList(x_access_token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecklistContainerSubItems);
