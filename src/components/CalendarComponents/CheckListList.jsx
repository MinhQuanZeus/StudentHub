import React, { Component } from 'react';
import css from './CheckListList.m.scss';
import { Icon } from 'office-ui-fabric-react';
import { navigate } from '../../helpers';
import Priority from './Priority';
import { RadialChart } from 'react-vis';

class CheckListList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: true,
      isShowDetails: false,
      itemDetails: {},
      isShowCompleted: true,
    };
  }

  goToChecklist = () => {
    navigate('/check-list');
  };

  render() {
    const { details } = this.props;
    const { isExpanded, itemDetails, isShowDetails, isShowCompleted } = this.state;
    let isCompleted = true;
    let percent = 0;
    let completed = 0;
    let total = 0;
    details &&
      details.data &&
      details.data.child &&
      details.data.child.length &&
      details.data.child.reduce((res, item) => {
        return res && item.is_completed;
      }, true);

    if (details && details.data && details.data.child && details.data.child.length) {
      total = details.data.child.length;
      details.data.child.forEach((item) => {
        isCompleted = isCompleted && item.is_completed;
        if (item.is_completed) {
          completed += 1;
        }
      });
      percent = Math.round((completed / details.data.child.length) * 100);
    }
    const myData = [{ angle: percent, color: '#917cfd' }, { angle: 100 - percent, color: '#dae8fd' }];

    return (
      <div className={`${css.CheckListList} ${isShowDetails ? css.DisplayFlex : ''}`}>
        <div>
          <div>
            <label className={css.checkbox} onClick={() => this.setState({ isShowCompleted: !isShowCompleted })}>
              Show Complete Item
              <input checked={isShowCompleted} type="checkbox" name="show_complete_item" disabled={true} />
              <span className={css.checkmark} />
            </label>
            <span>
              To Do List ({completed}/{total})
            </span>
          </div>
          <div className={css.General}>{details.data.category}</div>
          <div className={css.Details}>
            <label
              className={`${css.checkbox} ${css.DisplayFlex} ${itemDetails.id === details.data.id ? css.Selected : ''}`}
              onClick={(event) => {
                this.setState({ isExpanded: !isExpanded, isShowDetails: true, itemDetails: details.data });
              }}
            >
              {isExpanded ? (
                <Icon className={css.ExpandIcon} iconName="ChevronDown" />
              ) : (
                <Icon className={css.ExpandIcon} iconName="ChevronRight" />
              )}
              <span className={css.Label}>{details.data.check_list_name}</span>
              <Priority priority={details.data.priority && details.data.priority.toLowerCase()} />
              <div className={css.Chart}>
                <RadialChart data={myData} width={45} height={45} />
                <span>{percent}%</span>
              </div>
              <input checked={isCompleted} type="checkbox" name="show_complete_item" disabled={true} />
              <span className={css.checkmark} />
            </label>
            {isExpanded && (
              <div className={css.SubItems}>
                {details.data &&
                  details.data.child.length &&
                  details.data.child.map((obj, idx) => (
                    <label
                      key={idx}
                      className={`${css.checkbox} ${itemDetails.id === obj.id ? css.Selected : ''} ${
                        !isShowCompleted && obj.is_completed ? css.Hidden : ''
                      }`}
                      onClick={(event) => {
                        this.setState({ itemDetails: obj, isShowDetails: true });
                      }}
                    >
                      {obj.check_list_name}
                      <Priority priority={obj.priority && obj.priority.toLowerCase()} />
                      <input
                        checked={obj.is_completed}
                        type="checkbox"
                        name="show_complete_item"
                        value={obj.is_completed}
                        disabled={true}
                      />
                      <span className={css.checkmark} />
                    </label>
                  ))}
              </div>
            )}
          </div>
        </div>
        {isShowDetails && (
          <div className={css.DetailsTab}>
            <div className="right_side">
              <div className="upper_grid">
                <div className="grid_cell">
                  <p>Category</p>
                  <span>{itemDetails.category}</span>
                </div>
                <div className="grid_cell">
                  <p>Sub Category</p>
                  <span>{itemDetails.sub_category_value}</span>
                </div>
                <div className="grid_cell full_width">
                  <p>Description</p>
                  <span>{itemDetails.description}</span>
                </div>
              </div>
              <p className="contact_label">CONTACT INFO</p>
              <div className="lower_grid">
                <div className="grid_cell">
                  <p>Phone</p>
                  <span>{itemDetails.phone}</span>
                </div>
                <div className="grid_cell">
                  <p>Fax</p>
                  <span>{itemDetails.fax}</span>
                </div>
                <div className="grid_cell">
                  <p>Email</p>
                  <span>{itemDetails.email}</span>
                </div>
                <div className="grid_cell">
                  <p>Website</p>
                  <span>{itemDetails.website}</span>
                </div>
              </div>
              <div className="btn_container">
                <button className="checklist_btn" onClick={this.goToChecklist}>
                  Go To My Checklist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CheckListList;
