import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Container, Row, Col } from 'reactstrap';

const styles = theme => ({
  col: {
    textAlign: 'center',
  },
});

const DataCell = props => {
  const { classes, title, rate } = props;
  const showRate = parseFloat(Math.round(rate * 100) / 100).toFixed(2);

  if (!title || !rate) {
    return <Col />;
  } else {
    return (
      <Col className={classes.col}>
        <Container>
          <Row>
            <Col className={classes.col}>{title}</Col>
            <Col className={classes.col}>{showRate}</Col>
          </Row>
        </Container>
      </Col>
    );
  }
};

export default withStyles(styles)(DataCell);
