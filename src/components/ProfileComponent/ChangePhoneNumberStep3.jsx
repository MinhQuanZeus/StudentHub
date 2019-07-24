import React, { Component } from 'react';
import css from './ChangePhoneNumberStep3.m.scss';
import { PrimaryButton } from 'office-ui-fabric-react';
import VerifiedImage from '../../images/verified.svg';

class ChangePhoneNumberStep3 extends Component {
  componentDidMount() {}

  render() {
    const { phone } = this.props;
    return (
      <div className={css.ChangePhoneNumberStep3}>
        <div>
          <div className={css.VerifiedImage}>
            <img src={VerifiedImage} />
          </div>
        </div>
        <div className={css.Congratulations}>Congratulations</div>
        <div>
          Your Phone Number <strong>{ phone }</strong>
        </div>
        <div>has been changed</div>
        <div>
          <PrimaryButton text="Close" type="button" />
        </div>
      </div>
    );
  }
}

export default ChangePhoneNumberStep3;
