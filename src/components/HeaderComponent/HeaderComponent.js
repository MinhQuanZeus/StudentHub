import React from 'react';

import sharedStyles from '../../styles/styles.module.css';
import styles from './HeaderComponent.module.css';

function HeaderComponent({ labels, children }) {
  const lastLabelIdx = labels.length - 1;
  let headerLabels = <h3 className={sharedStyles['content-label']}>{labels}</h3>;

  if (labels.length > 1) {
    headerLabels = (
      <ul className={styles['header-labels']}>
        {labels.map((label, idx) => {
          if (idx === lastLabelIdx) { return <li className={sharedStyles['content-label']} key={idx}>{label}</li> }

          return (
            <li className={sharedStyles['content-label']} key={idx}>
              <span style={!idx ? { 'color': '#352480' } : ''}>{label}</span>
              <i className={`${sharedStyles['header-angle-right']} fa fa-angle-right`}></i>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className={sharedStyles['content-header']}>
      {headerLabels}
      {children}
    </div>
  )
}

export default HeaderComponent;
