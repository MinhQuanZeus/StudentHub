import React, { Component } from 'react';
import css from './ChangePhoneNumberStep3.m.scss';
import { PrimaryButton } from 'office-ui-fabric-react';
import VerifiedImage from '../../images/verified.svg';

class ChangePhoneNumberStep3 extends Component {
  componentDidMount() {}

  render() {
    const { phone, onSuccess } = this.props;
    return (
      <div className={css.ChangePhoneNumberStep3}>
        <div>
          <div className={css.VerifiedImage}>
            <img src={VerifiedImage} alt=""/>
          </div>
        </div>
        <div className={css.Congratulations}>Congratulations</div>
        <div>
          Your Phone Number <strong>{phone}</strong>
        </div>
        <div>has been changed</div>
        <div>
          <PrimaryButton text="Close" type="button" onClick={onSuccess} />
        </div>
      </div>
    );
  }
}

export default ChangePhoneNumberStep3;
