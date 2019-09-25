import React from 'react';
import css from './CategoryList.m.scss';
import PropTypes from 'prop-types';

const removeSpace = (str) => {
  return str.replace(' ', '');
};

const handleOnClick = (where, category, props) => {
  if (where === 'CHECKBOX' || (where === 'LABEL' && props.viewMode !== 'MOBILE')) {
    props.onCheckedCategory(category);
  }
};

export const CategoryList = (props) => {
  const { onApplyFilter, checkbox, onToggle, viewMode } = props;
  return (
    <div className={css.CategoryList}>
      <div>
        {props.label && <h3>{props.label}</h3>}
        {viewMode === 'DESKTOP' && (
          <img
            onClick={() => onToggle('categoryListShow')}
            src={props.categoryListShow ? '/images/chevron-down.svg' : '/images/chevron-up.svg'}
            alt="Chevron Icon"
            className={css.ChevronIcon}
          />
        )}
      </div>
      {props.categoryListShow && (
        <div>
          {props.categories.map((category, idx) => (
            <div key={idx} className={css.Category}>
              <div onClick={() => handleOnClick('LABEL', category, props)}>
                <span
                  className={`${css.Dot} ${css[removeSpace(category.displayValue)]} ${category.isActive || checkbox ? css.Active : ''}`}
                ></span>
                <span className={css.CategoryLabel}>{category.displayValue}</span>
              </div>

              {checkbox && (
                <span>
                  <input
                    className={css.Checkbox}
                    id={removeSpace(category.displayValue)}
                    checked={category.isActive}
                    type="checkbox"
                    onChange={() => handleOnClick('CHECKBOX', category, props)}
                  />
                  <label htmlFor={removeSpace(category.displayValue)}></label>
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {viewMode === 'MOBILE' && (
        <div className={css.ApplyFilter} onClick={onApplyFilter}>
          Apply Filter
        </div>
      )}
    </div>
  );
};

CategoryList.propTypes = {
  onToggle: PropTypes.func,
  categoryListShow: PropTypes.bool,
  categories: PropTypes.array,
  label: PropTypes.string,
  onCheckedCategory: PropTypes.func,
  checkbox: PropTypes.bool,
  onApplyFilter: PropTypes.func,
  viewMode: PropTypes.string,
};

export default CategoryList;
