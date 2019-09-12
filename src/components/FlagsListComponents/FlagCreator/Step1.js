import React, { Component } from 'react';
import { ChoiceGroup } from 'office-ui-fabric-react';
import PropTypes from 'prop-types';
import css from './Step1.module.scss';
import classnames from 'classnames';
import { withFormik } from 'formik';
import Actions from './Actions';
import Error from './Error';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subCategories: [],
    };
    this.category = React.createRef();

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  onChangeCategory($event) {
    this.props.setFieldValue('category', this.category.current.value);
    const category = this.props.categories.filter((obj) => obj.id === parseInt(this.category.current.value, 10));
    if (category && category.length > 0) {
      this.props.setFieldValue('sub_category', category[0].subs[0].id.toString());
      this.setState((state) => ({ subCategories: category[0].subs }));
    } else {
      this.setState((state) => ({ subCategories: [] }));
    }
  }

  onNext($event) {
    $event.preventDefault();
    this.props.onNext(this.props.values);
  }

  render() {
    const { values, setFieldValue, handleChange } = this.props;
    return (
      <form className={classnames(css.Step1, this.props.current !== 1 && css.Hidden)}>
        <div className={css.FormItem}>
          <label htmlFor="subject">Topic</label>
          <input
            id="subject"
            type="text"
            name="subject"
            placeholder="Meeting about Office"
            onChange={handleChange}
            value={values.subject}
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
                this.props.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className={css.FormItem} style={{ width: 205, marginLeft: 30 }}>
            <label htmlFor="sub_category">Sub Category</label>
            <select
              id="sub_category"
              type="text"
              name="sub_category"
              placeholder="Choose Sub-Category"
              onChange={handleChange}
              value={values.sub_category}
            >
              {this.state.subCategories &&
                this.state.subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className={css.FormItem} style={{ marginTop: 20 }}>
          <label>Priority</label>
          <select type="text" name="priority" placeholder="Choose Priority" onChange={handleChange} value={values.priority}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div className={css.FormItem} style={{ marginTop: 20 }}>
          <label>Dispatch Type</label>
          <div className={css.Radio}>
            <ChoiceGroup
              className={css.DispatchType}
              defaultSelectedKey={1}
              options={[
                {
                  key: 1,
                  text: 'Public',
                },
                {
                  key: 0,
                  text: 'Private',
                },
              ]}
              onChange={(event, option) => setFieldValue('is_public', option.key)}
            />
          </div>
        </div>
        <Error error={this.props.error} />
        <Actions current={this.props.current} onNext={this.onNext} />
      </form>
    );
  }
}

Step1.propTypes = {
  categories: PropTypes.array,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  handleChange: PropTypes.func,
  onNext: PropTypes.func,
  current: PropTypes.number,
  error: PropTypes.string,
};

export default withFormik({
  mapPropsToValues: () => ({
    subject: '',
    category: '',
    sub_category: '',
    priority: 'LOW',
    is_public: 1,
  }),
})(Step1);
