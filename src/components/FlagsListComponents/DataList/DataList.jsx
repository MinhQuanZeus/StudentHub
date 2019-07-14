/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Icon } from 'office-ui-fabric-react';
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames';
import css from './DataList.m.scss';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.sort = this.sort.bind(this);
  }

  sort(idx) {
    const { sort } = this.props;
    this.props.orderBy(Math.abs(sort) === idx ? -sort : idx);
  }

  render() {
    const { sort, headers, items, onRenderItem, className, orderBy } = this.props;

    return (
      <QueueAnim className={classnames(css.DataList, className)}>
        <table>
          <thead>
            <tr>
              {headers &&
                headers.length > 0 &&
                headers.map((o, idx) => (
                  <th className={sort !== 0 && Math.abs(sort) === idx + 1 ? css.Sort : null} key={idx} onClick={() => this.sort(idx + 1)}>
                    {o}
                    &nbsp;
                    {orderBy && Math.abs(sort) === idx + 1 && <Icon iconName={sort > 0 ? 'ChevronDown' : 'ChevronUp'} />}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>{items && items.length > 0 && items.map((o, idx) => onRenderItem(o, idx))}</tbody>
        </table>
      </QueueAnim>
    );
  }
}

export default DataList;
