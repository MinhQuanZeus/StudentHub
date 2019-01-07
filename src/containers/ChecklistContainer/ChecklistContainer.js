import React, {Component} from 'react';
import ChecklistComponent from '../../components/ChecklistComponent/ChecklistComponent'
import {onFetchCheckList} from "../../actions/CheckListActions/CheckListActions";
import connect from "react-redux/es/connect/connect";
import { createFilter } from 'react-search-input';
import orderBy from 'lodash.orderby';

import sharedStyles from '../../styles/styles.css';

const KEYS_TO_FILTERS = ['check_list_name', 'category', 'due_date', 'priority', 'complete_rate'];


class ChecklistContainer extends Component {
  state = {
    openChecklistIdx: null,
    openChecklistDetails: {},
    openSubChecklistIdx: null,
    openSubChecklistDetails: {},
    search: '',
    sort: {
      columnName: 'due_date',
      order: 'asc',
    }
    
  }

  goBackToChecklist = () => {
    this.setState({
      openSubChecklistIdx: null,
      openSubChecklistDetails: {},
    })
  }

  handleChecklistClick = (idx, checklist) => {
    if (this.state.openChecklistIdx === idx) {
      return this.setState({
        openChecklistIdx: null,
        openChecklistDetails: {},
        openSubChecklistIdx: null,
        openSubChecklistDetails: {},
      });
    }

    return this.setState({
      openChecklistIdx: idx,
      openChecklistDetails: checklist,
      openSubChecklistIdx: null,
      openSubChecklistDetails: {},
    });
  }

  handleSubChecklistClick = (idx, subChecklist) => {
    if (this.state.openSubChecklistIdx !== idx) {
      return this.setState({ openSubChecklistIdx: idx, openSubChecklistDetails: subChecklist });
    }
  }

  toggleChecklistDetails = (idx, list, checklistType) => {
    switch (checklistType) {
      case 'checklist':
        this.handleChecklistClick(idx, list);
        break;
      case 'subChecklist':
        this.handleSubChecklistClick(idx, list);
        break;
      default:
        break;
    }
  }

  updateValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  getChecklist = (list) => {
    const { search, sort } = this.state;

    if (!search) {
      const sortedList = orderBy(list.checkList, sort.columnName, sort.order);
      return {
        ...list,
        checkList: this.addProperties(sortedList),
      }
    }

    const filteredList = list.checkList.filter(createFilter(search, KEYS_TO_FILTERS));
    const sortedList = orderBy(filteredList, sort.columnName, sort.order);

    return {
      ...list,
      checkList: this.addProperties(sortedList),
    }
  }

  updateSorting = (property) => {
    const { sort } = this.state;

    if (['checklist', 'complete_rate'].includes(property)) { return }

    if (property === sort.columnName) {
      return this.setState({
        sort: {
          ...sort,
          order: sort.order === 'asc' ? 'desc' : 'asc',
        }
      })
    }

    return this.setState({
      sort: { columnName: property, order: 'asc' }
    })
  }

  addProperties = (checklist) => {
    return checklist.map((c) => {
      // Remove start: remove this block when api includes these fields
      c.sub_checklist = [
        {
          sub_check_list_name: 'sub-checklist #1',
          priority: 'high',
          status: 'active',
          due_date: '2018-12-29T03:00:00.000Z',
          complete_rate: 'due',
          created_at: '2018-12-29T03:00:00.000Z',
          created_by: 1,
          description: 'some description',
          completion_date: '2018-12-29T03:00:00.000Z',
          is_completed: true,
        }, {
          sub_check_list_name: 'sub-checklist #2',
          priority: 'low',
          status: 'pending',
          due_date: '2018-12-29T03:00:00.000Z',
          complete_rate: 'done',
          created_at: '2018-12-29T03:00:00.000Z',
          created_by: 1,
          description: 'some description',
          completion_date: '2018-12-29T03:00:00.000Z',
          is_completed: true,
        }, {
          sub_check_list_name: 'sub-checklist #3',
          priority: 'medium',
          status: 'active',
          due_date: '2018-12-29T03:00:00.000Z',
          complete_rate: 'not started',
          created_at: '2018-12-29T03:00:00.000Z',
          created_by: 1,
          description: 'some description',
          completion_date: '2018-12-29T03:00:00.000Z',
          is_completed: true,
        }, {
          sub_check_list_name: 'sub-checklist #4',
          priority: 'medium',
          status: 'active',
          due_date: '2018-12-29T03:00:00.000Z',
          complete_rate: 'not started',
          created_at: '2018-12-29T03:00:00.000Z',
          created_by: 1,
          description: 'some description',
          completion_date: '2018-12-29T03:00:00.000Z',
          is_completed: true,
        }
      ];
      c.priority = 'Low';
      c.is_completed = false;
      // Remove end

      const totalSubChecklist = c.sub_checklist.length;
      const totalCompletedSubChecklist = c.sub_checklist.reduce((total, sub) => {
        if (sub.is_completed) {
          return total += 1;
        }

        return total;
      }, 0)

      const completionPercentage = (totalCompletedSubChecklist / totalSubChecklist) * 100;
      const subChecklistLength = c.sub_checklist.length;
      return {
        ...c,
        complete_rate: completionPercentage,
        sub_checklist_length: subChecklistLength,
      }
    })
  }

  componentWillMount() {
    this.props.onFetchCheckList(this.props.loginInformation.x_access_token);
  }

  render() {
    const { openChecklistIdx, openChecklistDetails, openSubChecklistIdx, openSubChecklistDetails, search, sort } = this.state;
    const { checkList } = this.props;
    const data = this.getChecklist(checkList);

    if (checkList.loading) { return null }

    return (
      <div className={sharedStyles['checklist-content-container']}>
        <ChecklistComponent
          data={data}
          openChecklistIdx={openChecklistIdx}
          openChecklistDetails={openChecklistDetails}
          openSubChecklistIdx={openSubChecklistIdx}
          openSubChecklistDetails={openSubChecklistDetails}
          toggleChecklistDetails={this.toggleChecklistDetails}
          updateValue={this.updateValue}
          searchValue={search}
          sort={sort}
          updateSorting={this.updateSorting}
          goBackToChecklist={this.goBackToChecklist}
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
