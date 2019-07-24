import React, { Component } from 'react';
import css from './Address.m.scss';
import { Icon, PrimaryButton } from 'office-ui-fabric-react';
import { apiConstants } from '../../constants/applicationConstants';
import AddressItem from './AddressItem';
import AddressRegister from './AddressRegister';
import { getAccessToken } from '../../helpers';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddAddress: false,
      addressList: [],
      isEditing: false,
    };
  }

  onCancel = () => {
    this.setState({ isEditing: false });
  };

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    try {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/profile/address`, options);
      const body = await response.json();
      if (body.success) {
        this.setState(() => ({ isLoading: false, addressList: body.data }));
      }
    } catch (e) {
      this.setState(() => ({ isLoading: false }));
    }
  }

  getViewMode = () => {
    const { isEditing } = this.state;
    return (
      <div className={css.ViewMode}>
        <p>Current Address</p>
        <p>
          Mustika Ratu Street No 34, Lampung <br/>
          Indonesia, 34381
        </p>
        <hr/>
        {isEditing && (
          <button text="Cancel" onClick={this.onCancel}>
            Cancel
          </button>
        )}
      </div>
    );
  };

  getEditMode = () => {
    const { record_id } = this.props;
    const { isOpenAddAddress, addressList } = this.state;
    return (
      <div>
        <div className={css.FormHeader}>
          Other Address List
          <div>(choose one to set the preferred email address)</div>
        </div>
        {
          addressList && addressList.length > 0 && addressList.map((item, idx) => <AddressItem key={idx} {...item}/>)
        }
        <div>
          <PrimaryButton text="Update" type="submit"/>
        </div>
        <div className={css.AddAddress}>
          <hr/>
          {!isOpenAddAddress && (
            <p onClick={() => this.setState({ isOpenAddAddress: true })}>
              <Icon iconName="CalculatorAddition"/>
              &ensp;&ensp;<span>Add New Address</span>
            </p>
          )}
          {isOpenAddAddress &&
          <AddressRegister student_id={record_id} onCancel={() => this.setState({ isOpenAddAddress: false })}
                           onSuccess={() => this.setState({ isOpenAddAddress: false })}/>}
          <hr/>
        </div>
      </div>
    );
  };

  render() {
    const { isEditing } = this.state;
    return (
      <div className={css.Address}>
        <div>Address</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => this.setState({ isEditing: true })}>
            <Icon iconName="EditSolid12"/>
            {'  '}
            Edit
          </div>
        )}
        <div className="card">
          <div className="card-body">
            {this.getViewMode()}
            {isEditing && this.getEditMode()}
          </div>
        </div>
      </div>
    );
  }
}

export default Address;
