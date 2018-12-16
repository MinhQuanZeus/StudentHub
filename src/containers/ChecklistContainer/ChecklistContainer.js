import React, {Component} from 'react';
import ChecklistComponent from '../../components/ChecklistComponent/ChecklistComponent'
import {onFetchCheckList} from "../../actions/CheckListActions/CheckListActions";
import connect from "react-redux/es/connect/connect";
import { createFilter } from 'react-search-input';

import sharedStyles from '../../styles/styles.css';

const KEYS_TO_FILTERS = ['check_list_name', 'category', 'due_date', 'priority', 'complete_rate'];


class ChecklistContainer extends Component {
  state = {
    openSubChecklistIdx: null,
    openSubChecklistDetails: {},
    search: '',
  }

  toggleSubChecklist = (idx, checklist) => {
    if (this.state.openSubChecklistIdx === idx) {
      return this.setState({ openSubChecklistIdx: null, openSubChecklistDetails: {} });
    }

    return this.setState({ openSubChecklistIdx: idx, openSubChecklistDetails: checklist });
  }

  updateValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  getChecklist = (list) => {
    const { search } = this.state;

    if (!search) {
      return list;
    }

    const filteredList = list.checkList.filter(createFilter(search, KEYS_TO_FILTERS))

    return {
      ...list,
      checkList: filteredList,
    }
  }

  componentWillMount() {
    this.props.onFetchCheckList(this.props.loginInformation.x_access_token);
  }

  render() {
    const { openSubChecklistIdx, openSubChecklistDetails, search } = this.state;
    const { checkList } = this.props;
    const data = this.getChecklist(checkList);

    return (
      <div className={sharedStyles['checklist-content-container']}>
        <ChecklistComponent
          data={data}
          openSubChecklistIdx={openSubChecklistIdx}
          openSubChecklistDetails={openSubChecklistDetails}
          toggleSubChecklist={this.toggleSubChecklist}
          updateValue={this.updateValue}
          searchValue={search}
        />
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
