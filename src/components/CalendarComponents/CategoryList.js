import React from 'react';
import css from './CategoryList.m.scss';
import PropTypes from 'prop-types';

export const CategoryList = (props) => {
  return (
    <div className={css.CategoryList}>
      <div>
        <h3>Category List</h3>
        <img
          onClick={() => props.onToggle('categoryListShow')}
          src={props.categoryListShow ? '/images/chevron-down.svg' : '/images/chevron-up.svg'}
          alt="Chevron Icon"
          className={css.ChevronIcon}
        />
      </div>
      {props.categoryListShow && (
        <div className="catagory-list-labels">
          <div>
            <span className={`${css.Dot} ${css.Red}`}></span> <p className="meeting-label">Meeting</p>
          </div>
          <div>
            <span className={`${css.Dot} ${css.Purple}`}></span> <p className="classes-label">Classes</p>
          </div>
          <div>
            <span className={`${css.Dot} ${css.Gold}`}></span> <p className="program-event-label">Program Event</p>
          </div>
          <div>
            <span className={`${css.Dot} ${css.Brown}`}></span> <p className="school-event-label">School Event</p>
          </div>
          <div>
            <span className={`${css.Dot} ${css.Green}`}></span> <p className="checklist-label">Checklist</p>
          </div>
        </div>
      )}
    </div>
  );
};

CategoryList.propTypes = {
  onToggle: PropTypes.func,
  categoryListShow: PropTypes.bool,
};

export default CategoryList;
