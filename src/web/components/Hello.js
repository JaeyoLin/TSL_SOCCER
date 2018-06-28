import React from 'react';
import PropTypes from 'prop-types';

class Hello extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

Hello.propTypes = {
  hello: PropTypes.string
};

export default Hello;
