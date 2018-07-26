import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Container, Row, Col } from 'reactstrap';

const styles = theme => ({
  col: {
    textAlign: 'center',
  },
  down: {
    color: 'red',
  },
  up: {
    color: 'green',
  },
});

const DataCell = props => {
  const { classes, title, rate, compareRate } = props;

  // 判斷上升或下降
  let returnComponent = null;
  if (rate > compareRate) {
    returnComponent = (
      <span className={classes.up}>
        <i class="fas fa-caret-up fa-1g">
          {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
        </i>
      </span>
    );
  } else if (rate < compareRate) {
    returnComponent = (
      <span className={classes.down}>
        <i class="fas fa-caret-down fa-1g">
          {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
        </i>
      </span>
    );
  } else {
    returnComponent = (
      <span>
        <i class="fas fa-caret-down fa-1g">
          {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
        </i>
      </span>
    );
  }

  if (!rate) {
    return <Col />;
  } else {
    return (
      <Col className={classes.col}>
        <Container>
          <Row>
            <Col className={classes.col}>{title}</Col>
            <Col className={classes.col}>{returnComponent}</Col>
          </Row>
        </Container>
      </Col>
    );
  }
};

export default withStyles(styles)(DataCell);
