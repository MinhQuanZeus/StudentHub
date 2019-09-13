import React from 'react';
import css from './CategoryList.m.scss';
import PropTypes from 'prop-types';

const removeSpace = (str) => {
  return str.replace(' ', '');
};

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
        <div>
          {props.categories.map((category, idx) => (
            <div key={idx} className={css.Category} onClick={() => props.onChangedCategoryFilter(category)}>
              <span className={`${css.Dot} ${css[removeSpace(category.displayValue)]} ${category.isActive ? css.Active : ''}`}></span>
              <p>{category.displayValue}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CategoryList.propTypes = {
  onToggle: PropTypes.func,
  categoryListShow: PropTypes.bool,
  categories: PropTypes.array,
  onChangedCategoryFilter: PropTypes.func,
};

export default CategoryList;
