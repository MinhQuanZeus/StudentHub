import React, { Component } from 'react';
import css from './AddEmailStep3.m.scss';
import { PrimaryButton } from 'office-ui-fabric-react';
import VerifiedImage from '../../images/verified.svg';

class AddEmailStep3 extends Component {
  componentDidMount() {}

  render() {
    const { email } = this.props;
    return (
      <div className={css.AddEmailStep3}>
        <div>
          <div className={css.VerifiedImage}>
            <img src={VerifiedImage} alt="image"/>
          </div>
        </div>
        <div className={css.Congratulations}>Congratulations</div>
        <div>
          Your Email <strong>{email}</strong> has been
        </div>
        <div>verification and added to your account</div>
        <div>
          <PrimaryButton text="Close" type="button" />
        </div>
      </div>
    );
  }
}

export default AddEmailStep3;
