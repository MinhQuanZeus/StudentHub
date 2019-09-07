/* eslint-disable react/prop-types, camelcase */
/* global fetch */
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
      currentAddress: {},
      originalAddress: {},
    };
  }

  onCancel = () => {
    const { originalAddress } = this.state;
    this.setState({ isEditing: false, currentAddress: originalAddress });
  };

  filterCurrentAddress = (addressList) => {
    if (!addressList || addressList.length === 0) {
      this.setState({ currentAddress: {} });
    }

    const temp = addressList.filter((o) => o.current_address);
    const currentAddress = temp && temp.length > 0 ? temp[0] : {};
    this.props.setCurrentAddress(currentAddress);
    this.setState({ currentAddress: currentAddress, originalAddress: currentAddress });
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
        this.filterCurrentAddress(body.data);
      }
    } catch (e) {
      this.setState(() => ({ isLoading: false }));
    }
  }

  getViewMode = () => {
    const { isEditing, currentAddress } = this.state;
    return (
      <div className={css.ViewMode}>
        <p>Current Address</p>
        <p>
          {currentAddress.street_address1}, {currentAddress.city} <br />
          {currentAddress.country}, {currentAddress.post_code}
        </p>
        <hr />
        {isEditing && (
          <button text="Cancel" onClick={this.onCancel}>
            Cancel
          </button>
        )}
      </div>
    );
  };

  onSubmit = async () => {
    const { currentAddress } = this.state;
    if (!currentAddress || !currentAddress.address_id) {
      return;
    }
    try {
      const data = {
        address_id: currentAddress.address_id,
        current_address: true,
      };
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': getAccessToken(),
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`${apiConstants.BACKEND_URL}student/profile/address/current`, options);
      const body = await response.json();
      if (body.success) {
        this.setState({ isEditing: false });
      }
    } catch (e) {
      console.log(e);
    }
  };

  getEditMode = () => {
    const { record_id, viewMode } = this.props;
    const { isOpenAddAddress, addressList, currentAddress } = this.state;
    return (
      <div>
        <div className={css.FormHeader}>
          Other Address List
          <div>(choose one to set the preferred email address)</div>
        </div>
        {addressList &&
          addressList.length > 0 &&
          addressList.map((item, idx) => (
            <AddressItem
              student_id={record_id}
              currentAddress={currentAddress}
              onSetCurrentAddress={(address) => this.setState({ currentAddress: address })}
              key={idx}
              {...item}
              viewMode={viewMode}
              onSuccess={() => this.initialize()}
            />
          ))}
        <div>
          <PrimaryButton text="Update" type="button" onClick={this.onSubmit} />
        </div>
        <div className={css.AddAddress}>
          <hr />
          {!isOpenAddAddress && (
            <p onClick={() => this.setState({ isOpenAddAddress: true })}>
              <Icon iconName="CalculatorAddition" />
              &ensp;&ensp;<span>Add New Address</span>
            </p>
          )}
          {isOpenAddAddress && (
            <AddressRegister
              student_id={record_id}
              onCancel={() => this.setState({ isOpenAddAddress: false })}
              onSuccess={() => {
                this.setState({ isOpenAddAddress: false });
                this.initialize();
              }}
            />
          )}
          <hr />
        </div>
      </div>
    );
  };

  render() {
    const { isEditing } = this.state;
    const { editProfile, viewMode } = this.props;
    return (
      <div className={css.Address}>
        <div>Address</div>
        {!isEditing && (
          <div className={css.EditButton} onClick={() => this.setState({ isEditing: true })}>
            <Icon iconName="EditSolid12" />
            {'  '}
            Edit
          </div>
        )}
        <div className="card">
          <div className="card-body">
            {this.getViewMode()}
            {(viewMode === 'MOBILE' && editProfile) || (viewMode === 'DESKTOP' && isEditing) ? this.getEditMode() : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Address;
