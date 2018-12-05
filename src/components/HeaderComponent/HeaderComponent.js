import React from 'react';
import sharedStyles from '../../styles/styles.css';

function HeaderComponent({ label, children }) {
  return (
    <div className={sharedStyles['content-header']}>
      <h3 className={sharedStyles['content-label']}>{label}</h3>
      {children}
    </div>
  )
}

export default HeaderComponent;
