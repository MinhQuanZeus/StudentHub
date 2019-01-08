import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../components/LoadingComponent';

class LoadingContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Loading isLoading={this.props.isLoading} />;
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.LoadingState.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingContainer);
