import React from 'react';
import css from './index.module.scss';

export const SuccessHub = (props) => <img src="/images/success-hub-logo.svg" alt="SuccessHub" className={css.SuccessHub} />;

export const H1 = (props) => <h1 className={css.H1}>{props.children}</h1>;

export const H2 = (props) => <h2 className={css.H2}>{props.children}</h2>;
