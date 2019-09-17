import React from 'react';
import css from './InvitationList.m.scss';
import PropTypes from 'prop-types';

export const InvitationList = (props) => {
  return (
    <div className={css.InvitationList}>
      <div>
        <h3>Invitation List</h3>
        <img
          onClick={() => props.onToggle('invitationListShow')}
          src={props.invitationListShow ? '/images/chevron-down.svg' : '/images/chevron-up.svg'}
          alt="Chevron Icon"
          className={css.ChevronIcon}
        />
      </div>
      {props.invitationListShow && (
        <div>
          <div className={css.Invitation}>
            <div>
              <p className={`${css.Oval} ${css.OvalRed}`}></p>
            </div>
            <div>
              <b>Joe</b> Invited you in his event <b>{`"Meeting Staff Only"`}</b>
              <br></br>
              <span className={css.InvitationBottom}>2 Hours Ago</span>
            </div>
          </div>
          <div className={css.Invitation}>
            <div>
              <p className={`${css.Oval} ${css.OvalGold}`}></p>
            </div>

            <div>
              <b>Risa</b> Invited you in his event <b>{`"Design Fest 2018"`}</b>
              <br></br>
              <span className={css.InvitationBottom}>Yesterday</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InvitationList.propTypes = {
  onToggle: PropTypes.func,
  invitationListShow: PropTypes.bool,
};

export default InvitationList;
