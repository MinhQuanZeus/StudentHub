/* eslint-disable camelcase */
/* global fetch */
import React, { Component } from 'react';
import ChecklistComponent from '../../components/ChecklistComponent/ChecklistComponent';
import { createFilter } from 'react-search-input';
import orderBy from 'lodash.orderby';

import sharedStyles from '../../styles/styles.module.css';
import { AppContext } from '../AppContext';
import { API_END_POINT } from '../../constants/ApiUrl';

const KEYS_TO_FILTERS = ['check_list_name', 'category', 'due_date', 'priority', 'complete_rate'];

class ChecklistContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      items: [],
      openChecklistIdx: null,
      openChecklistDetails: {},
      openSubChecklistIdx: null,
      openSubChecklistDetails: {},
      search: '',
      sort: {
        columnName: 'due_date',
        order: 'asc',
      },
    };

    this.initialize = this.initialize.bind(this);
    this.setDone = this.setDone.bind(this);
  }

  async initialize() {
    const { user } = this.context;
    const response = await fetch(`${API_END_POINT}student/check_list/all`, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': user.x_access_token,
      },
    });
    const body = await response.json();
    this.setState(() => ({
      isLoading: false,
      items: body.success ? body.data : [],
    }));

    // this.setState(() => ({
    //   isLoading: false,
    //   items: [
    //     {
    //       check_list_name: 'Make Powerpoint Science',
    //       priority: 'Low',
    //       category: 'General',
    //       due_date: '2018/09/10',
    //       due_date_count: '8hrs',
    //       is_completed: false,
    //       subs: [],
    //     },
    //     {
    //       check_list_name: 'Create Environmet React',
    //       priority: 'High',
    //       category: 'General',
    //       due_date: '2018/09/22',
    //       due_date_count: '3d',
    //       complete_rate: 50,
    //       is_completed: false,
    //       subs: [
    //         {
    //           check_list_name: 'Read Documentation',
    //           priority: 'High',
    //           due_date: '2018/09/22',
    //         },
    //         {
    //           check_list_name: 'Set Up Environment',
    //           priority: 'High',
    //           due_date: '2018/09/22',
    //         },
    //         {
    //           check_list_name: 'Create Dashboard',
    //           priority: 'High',
    //           due_date: '2018/09/22',
    //         },
    //         {
    //           check_list_name: 'Finished',
    //           priority: 'High',
    //           due_date: '2018/09/22',
    //         },
    //       ],
    //     },
    //     {
    //       check_list_name: 'Math Exam',
    //       priority: 'Low',
    //       category: 'Admission',
    //       due_date: '2018/09/25',
    //       complete_rate: 90,
    //       due_date_count: '8hrs',
    //       is_completed: false,
    //       subs: [{}, {}],
    //     },
    //     {
    //       check_list_name: 'Create UI Design',
    //       priority: 'Medium',
    //       category: 'Admission',
    //       due_date: '2018/09/27',
    //       is_completed: true,
    //       subs: [],
    //     },
    //     {
    //       check_list_name: 'Dashboard HTML Page',
    //       priority: 'Low',
    //       category: 'General',
    //       due_date: '2018/10/02',
    //       is_completed: false,
    //       subs: [],
    //     },
    //   ],
    // }));
  }

  async setDone(cid, done) {
    const { x_access_token } = this.context.user;

    const response = await fetch(`${API_END_POINT}student/check_list/update/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': x_access_token,
      },
      body: JSON.stringify([{ id: cid, is_completed: done }]),
    });
    const body = await response.json();
    if (body.success) {
      this.initialize();
    }
  }

  goBackToChecklist = () => {
    this.setState({
      openSubChecklistIdx: null,
      openSubChecklistDetails: {},
    });
  };

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
  };

  handleSubChecklistClick = (idx, subChecklist) => {
    if (this.state.openSubChecklistIdx !== idx) {
      return this.setState({
        openSubChecklistIdx: idx,
        openSubChecklistDetails: subChecklist,
      });
    }
  };

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
  };

  updateValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  getChecklist = (list) => {
    const { search, sort } = this.state;

    if (!search) {
      const sortedList = orderBy(list.checkList, sort.columnName, sort.order);
      return {
        ...list,
        checkList: this.addProperties(sortedList),
      };
    }

    const filteredList = list.checkList.filter(createFilter(search, KEYS_TO_FILTERS));
    const sortedList = orderBy(filteredList, sort.columnName, sort.order);

    return {
      ...list,
      checkList: this.addProperties(sortedList),
    };
  };

  updateSorting = (property) => {
    const { sort } = this.state;

    if (['checklist', 'complete_rate'].includes(property)) {
      return;
    }

    if (property === sort.columnName) {
      return this.setState({
        sort: {
          ...sort,
          order: sort.order === 'asc' ? 'desc' : 'asc',
        },
      });
    }

    return this.setState({
      sort: { columnName: property, order: 'asc' },
    });
  };

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
        },
        {
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
        },
        {
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
        },
        {
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
        },
      ];
      c.priority = 'Low';
      c.is_completed = false;
      // Remove end

      const totalSubChecklist = c.sub_checklist.length;
      const totalCompletedSubChecklist = c.sub_checklist.reduce((total, sub) => {
        if (sub.is_completed) {
          return (total += 1);
        }

        return total;
      }, 0);

      const completionPercentage = (totalCompletedSubChecklist / totalSubChecklist) * 100;
      const subChecklistLength = c.sub_checklist.length;
      return {
        ...c,
        complete_rate: completionPercentage,
        sub_checklist_length: subChecklistLength,
      };
    });
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    const { openChecklistIdx, openChecklistDetails, openSubChecklistIdx, openSubChecklistDetails, search, sort } = this.state;
    const { items } = this.state;

    return (
      <div className={sharedStyles['checklist-content-container']}>
        <ChecklistComponent
          items={items}
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
          setDone={this.setDone}
        />
      </div>
    );
  }
}

ChecklistContainer.contextType = AppContext;

export default ChecklistContainer;
