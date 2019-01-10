import React, { Component } from 'react';
import { Popup } from '../Popup';
// import ReactModal from 'react-modal';
// import classnames from 'classnames';
// import FlagNewTask1 from '../FlagNewTask/FlagNewTask1';
import { Stepper, Step } from '../Stepper';
import { DefaultButton, PrimaryButton } from '../../Button';
import { DEFAULT_FETCH_HEADERS } from '../../../helpers';
import { apiConstants } from '../../../constants/applicationConstants';
import css from './FlagCreator.module.scss';
import { withEmit } from 'react-emit';
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.emit('SHOW_LOADING');
    fetch(apiConstants.BACKEND_URL + 'student/flag_category', {
      method: 'GET',
      headers: DEFAULT_FETCH_HEADERS
    })
      .then(response => response.json())
      .then(json => {
        this.props.emit('HIDE_LOADING');
        this.categories = json.data.map(obj => {
          const subs = obj.subs.map(sub => ({
            id: sub.id,
            name: sub.category_name,
            parrentId: sub.parrent
          }));
          return { id: obj.id, name: obj.category_name, subs: subs };
        });
        this.setState(state => ({
          categories: this.categories.length > 0 ? this.categories : null,
          subCategories: null
        }));
      });

    this.onChangeCategory = this.onChangeCategory.bind(this);
  }

  onChangeCategory($event) {
    const subs = this.categories.filter(
      obj => obj.id === parseInt($event.target.value, 10)
    )[0].subs;
    this.setState(state => ({ subCategories: subs }));
  }

  render() {
    return (
      <form>
        <div className={css.FormItem}>
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            type="text"
            name="topic"
            placeholder="Meeting about Office"
          />
        </div>
        <div className={css.FormGroup}>
          <div className={css.FormItem} style={{ width: 205 }}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              type="text"
              name="category"
              placeholder="Choose Category"
              onChange={this.onChangeCategory}
            >
              <option value="-1" />
              {this.state.categories &&
                this.state.categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={css.FormItem} style={{ width: 205, marginLeft: 30 }}>
            <label htmlFor="subCategory">Sub Category</label>
            <select
              id="subCategory"
              type="text"
              name="subCategory"
              placeholder="Choose Sub-Category"
            >
              {this.state.subCategories &&
                this.state.subCategories.map(sub => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={css.FormItem} style={{ marginTop: 20 }}>
          <label>Severity</label>
          <select type="text" name="topic" placeholder="Choose Severity">
            <option name="low">Low</option>
            <option name="medium">Medium</option>
            <option name="hight">High</option>
          </select>
        </div>
        <div className={css.FormItem} style={{ marginTop: 20 }}>
          <label>Dispatch Type</label>
          <div className={css.Radio}>
            <input type="radio" name="dispatchType" value="public" />
            <span>Public</span>
            <input
              type="radio"
              name="dispatchType"
              value="private"
              style={{ marginLeft: 30 }}
            />
            <span>Private</span>
          </div>
        </div>
      </form>
    );
  }
}

const Step1WithEmit = withEmit(({ emit }) => <Step1 emit={emit} />);

export class FlagCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1
    };
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  previous($event) {
    this.setState(state => ({
      currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1
    }));
  }

  next($event) {
    this.setState(state => ({
      currentStep: state.currentStep < 4 ? state.currentStep + 1 : 4
    }));
  }

  render() {
    const { props, state } = this;
    return (
      <Popup
        title="Create New Flag"
        isOpen={props.isOpen}
        className={css.FlagCreator}
        onRequestClose={props.onRequestClose}
      >
        <Stepper className={css.Stepper} current={state.currentStep}>
          <Step
            index={1}
            title="Info"
            className={css.Step1}
            current={this.state.currentStep}
          />
          <Step
            index={2}
            title="Details"
            className={css.Step2}
            current={this.state.currentStep}
          />
          <Step
            index={3}
            title="Assign"
            className={css.Step3}
            current={this.state.currentStep}
          />
          <Step
            index={4}
            title="Receiver"
            className={css.Step4}
            current={this.state.currentStep}
          />
        </Stepper>
        <Step1WithEmit />

        <div className={css.Actions}>
          {state.currentStep > 1 && (
            <DefaultButton onClick={this.previous} className={css.Previous}>
              Previous
            </DefaultButton>
          )}
          <PrimaryButton onClick={this.next} className={css.Next}>
            Next
          </PrimaryButton>
        </div>
      </Popup>
    );
  }
}
