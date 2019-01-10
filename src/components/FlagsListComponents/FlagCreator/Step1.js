import React, { Component } from 'react';
import { withEmit } from 'react-emit';
import { DEFAULT_FETCH_HEADERS } from '../../../helpers';
import { apiConstants } from '../../../constants/applicationConstants';
import css from './Step1.module.scss';
import classnames from 'classnames';
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
      <div
        className={classnames(
          css.Step1,
          this.props.current !== 1 && css.Hidden
        )}
      >
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
      </div>
    );
  }
}

export default withEmit(Step1);
