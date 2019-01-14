import React, { Component } from 'react';
import css from './Step1.module.scss';
import classnames from 'classnames';
import { withFormik } from 'formik';
import Actions from './Actions';
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: []
    };
    this.category = React.createRef();

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onChangeCategory($event) {
    this.props.setFieldValue('category', this.category.current.value);
    const category = this.props.categories.filter(
      obj => obj.id === parseInt(this.category.current.value, 10)
    );
    if (category && category.length > 0) {
      this.props.setFieldValue(
        'subCategory',
        category[0].subs[0].id.toString()
      );
      this.setState(state => ({ subCategories: category[0].subs }));
    } else {
      this.setState(state => ({ subCategories: [] }));
    }
  }

  onNext($event) {
    $event.preventDefault();
    this.props.onNext(this.props.values);
  }

  render() {
    const { values, handleChange } = this.props;
    return (
      <form
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
            onChange={handleChange}
            value={values.topic}
          />
        </div>
        <div className={css.FormGroup}>
          <div className={css.FormItem} style={{ width: 205 }}>
            <label htmlFor="cid">Category</label>
            <select
              ref={this.category}
              id="category"
              type="text"
              name="category"
              placeholder="Choose Category"
              value={values.category}
              onChange={this.onChangeCategory}
            >
              <option value="-1" />
              {this.props.categories &&
                this.props.categories.map(category => (
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
              onChange={handleChange}
              value={values.subCategory}
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
          <select
            type="text"
            name="severity"
            placeholder="Choose Severity"
            onChange={handleChange}
            value={values.severity}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className={css.FormItem} style={{ marginTop: 20 }}>
          <label>Dispatch Type</label>
          <div className={css.Radio}>
            <input
              type="radio"
              name="dispatchType"
              value="0"
              onChange={handleChange}
            />
            <span>Public</span>
            <input
              type="radio"
              name="dispatchType"
              value="1"
              style={{ marginLeft: 30 }}
              onChange={handleChange}
            />
            <span>Private</span>
          </div>
        </div>
        <Actions current={this.props.current} onNext={this.onNext} />
      </form>
    );
  }
}

export default withFormik({
  mapPropsToValues: () => ({
    topic: '',
    category: '',
    subCategory: '',
    severity: '',
    dispatchType: ''
  })
})(Step1);
