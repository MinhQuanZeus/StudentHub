import React, { Component } from 'react';
import css from './CreateNewChat.m.scss';
import { Modal } from 'office-ui-fabric-react';
import CancelIcon from '../../images/combined-shape.svg';
import { apiConstants } from '../../constants/applicationConstants';
import { getAccessToken } from '../../helpers';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import UserSelector from './UserSelector';
import SelectedUser from './SelectedUser';
import { Button } from '../Button';

class CreateNewChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      studentDataSource: [],
      staffDataSource: [],
    };
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onCreateGroup = async () => {
    const { selectedUsers } = this.state;
    if (!selectedUsers || selectedUsers.length < 1) {
      return;
    }

    const users = selectedUsers.map((user) => user.displayValue);

    const data = {
      group_name: users.join(', '),
      is_one_to_one_conversation: selectedUsers.length === 1,
      is_staff: false,
      members: [],
    };

    data.members = selectedUsers.map((user) => ({
      email: user.email,
      member_id: user.value,
      member_name: user.displayValue,
      code: user.is_staff ? `ED_${user.value}` : `ST_${user.value}`,
    }));

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}chat/chat_group`, options);
      const body = await response.json();
      if (body.success) {
        this.props.success();
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': getAccessToken(),
      },
    };
    const responses = await Promise.all([
      fetch(`${apiConstants.BACKEND_URL}student/get_staffs`, options),
      fetch(`${apiConstants.BACKEND_URL}student/get_students`, options),
    ]);
    const bodies = await Promise.all(responses.map((o) => o.json()));
    this.setState({
      isOpen: false,
      staffDataSource:
        bodies[0].data &&
        bodies[0].data.length > 0 &&
        bodies[0].data.map((o) => ({
          email: o.primary_email,
          value: o.id,
          displayValue: o.name,
          photo_url: o.avatar,
          checked: false,
        })),
      studentDataSource:
        bodies[1].data &&
        bodies[1].data.length > 0 &&
        bodies[1].data.map((o) => ({
          email: o.email,
          value: o.id,
          displayValue: o.name,
          photo_url: o.photo_url,
          checked: false,
        })),
    });
  }

  onSelectStaff = (data) => {
    const { staffDataSource } = this.state;
    let { selectedUsers } = this.state;
    if (data.checked) {
      const temp = { ...data };
      temp.is_staff = true;
      selectedUsers.push({ ...temp });
    } else {
      selectedUsers = selectedUsers.filter((obj) => !obj.is_staff || obj.value !== data.value);
    }
    staffDataSource[data.index].checked = data.checked;
    this.setState({ staffDataSource, selectedUsers });
  };

  onSelectStudent = (data) => {
    const { studentDataSource } = this.state;
    let { selectedUsers } = this.state;
    if (data.checked) {
      const temp = { ...data };
      temp.is_staff = false;
      selectedUsers.push({ ...temp });
    } else {
      selectedUsers = selectedUsers.filter((obj) => obj.is_staff || obj.value !== data.value);
    }
    studentDataSource[data.index].checked = data.checked;
    this.setState({ studentDataSource, selectedUsers });
  };

  render() {
    const { isOpen } = this.props;
    const { staffDataSource, studentDataSource, selectedUsers } = this.state;
    return (
      <Modal className={css.CreateNewChat} isDarkOverlay={true} isOpen={isOpen} isBlocking={true}>
        <div className={css.Header}>
          <span>Create New Chat</span>
          <img onClick={this.onCancel} src={CancelIcon} />
        </div>
        <div className={`row ${css.Body}`}>
          <div className="col-6">
            <div className={css.FrequentlyChat}>
              <div>Frequently Chat</div>
            </div>
            <div className={css.UserSelectorTabs}>
              <Pivot>
                <PivotItem headerText="Staff">
                  <UserSelector dataSource={staffDataSource} is_staff={true} handleChange={this.onSelectStaff} />
                </PivotItem>
                <PivotItem headerText="Student">
                  <UserSelector dataSource={studentDataSource} is_staff={false} handleChange={this.onSelectStudent} />
                </PivotItem>
              </Pivot>
            </div>
          </div>
          <div className={`col-6`}>
            <div>{selectedUsers && selectedUsers.length} Selected</div>
            <ul className={css.Tags}>
              {selectedUsers &&
                selectedUsers.length > 0 &&
                selectedUsers.map((item, index) => (
                  <li key={index}>
                    <SelectedUser {...item} />
                  </li>
                ))}
            </ul>
            <div>
              <button className="btn btn-primary" type="button" onClick={this.onCreateGroup}>
                Create a Chat
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default CreateNewChat;
