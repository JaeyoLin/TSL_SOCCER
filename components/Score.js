import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Container, Row, Collapse } from 'reactstrap';
import Divider from '@material-ui/core/Divider';

import DataCell from './DataCell';

const styles = theme => ({
  main: {
    backgroundColor: 'khaki',
  },
  hr: {
    marginTop: '10px',
    marginBottom: '10px',
    border: 0,
    height: '1px',
    background: '#333',
    backgroundImage: 'linear-gradient(to right, #ccc, #333, #ccc)',
  },
  hr1: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  convertFloat(rate) {
    return parseFloat(Math.round(rate * 100) / 100).toFixed(2);
  }

  /**
   * getRowHistoryRecord
   *
   * @param {*} row
   */
  getRowHistoryRecord(row) {
    const { classes, data } = this.props;

    let returnComponent = null;
    let key1 = '';
    let key2 = '';
    let key3 = '';

    switch (row) {
      case 1:
        key1 = '1_0';
        key2 = '0_0';
        key3 = '0_1';
        break;
      case 2:
        key1 = '2_0';
        key2 = '1_1';
        key3 = '0_2';
        break;
      case 3:
        key1 = '2_1';
        key2 = '2_2';
        key3 = '1_2';
        break;
      case 4:
        key1 = '3_0';
        key2 = '3_3';
        key3 = '0_3';
        break;
      case 5:
        key1 = '3_1';
        key2 = '4_4';
        key3 = '1_3';
        break;
      case 6:
        key1 = '3_2';
        key2 = '5_5';
        key3 = '2_3';
        break;
    }

    returnComponent = data.map((item, index) => {
      if (index !== data.length - 1) {
        const rate = data[index];
        let compareRate = rate;
        if (data[index - 1]) {
          compareRate = data[index - 1];
        }

        return (
          <Row>
            <DataCell rate={rate[key1]} compareRate={compareRate[key1]} />
            <DataCell rate={rate[key2]} compareRate={compareRate[key2]} />
            <DataCell rate={rate[key3]} compareRate={compareRate[key3]} />
          </Row>
        );
      }
    });

    return returnComponent;
  }

  render() {
    const { classes, openDetail, data } = this.props;
    const rate = data[data.length - 1];

    let compareRate = rate;
    if (data.length > 1) {
      compareRate = data[data.length - 2];
    }

    // 歷史比分賠率

    return (
      <Container>
        <Divider className={classes.hr} />
        <Collapse isOpen={openDetail}>
          {this.getRowHistoryRecord(1)}
          <Divider className={classes.hr1} />
        </Collapse>
        <Row className={openDetail ? classes.main : null}>
          <DataCell
            title="1 : 0"
            rate={rate['1_0']}
            compareRate={compareRate['1_0']}
          />
          <DataCell
            title="0 : 0"
            rate={rate['0_0']}
            compareRate={compareRate['0_0']}
          />
          <DataCell
            title="0 : 1"
            rate={rate['0_1']}
            compareRate={compareRate['0_1']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Collapse isOpen={openDetail}>
          {this.getRowHistoryRecord(2)}
          <Divider className={classes.hr1} />
        </Collapse>
        <Row className={openDetail ? classes.main : null}>
          <DataCell
            title="2 : 0"
            rate={rate['2_0']}
            compareRate={compareRate['2_0']}
          />
          <DataCell
            title="1 : 1"
            rate={rate['1_1']}
            compareRate={compareRate['1_1']}
          />
          <DataCell
            title="0 : 2"
            rate={rate['0_2']}
            compareRate={compareRate['0_2']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Collapse isOpen={openDetail}>
          {this.getRowHistoryRecord(3)}
          <Divider className={classes.hr1} />
        </Collapse>
        <Row className={openDetail ? classes.main : null}>
          <DataCell
            title="2 : 1"
            rate={rate['2_1']}
            compareRate={compareRate['2_1']}
          />
          <DataCell
            title="2 : 2"
            rate={rate['2_2']}
            compareRate={compareRate['2_2']}
          />
          <DataCell
            title="1 : 2"
            rate={rate['1_2']}
            compareRate={compareRate['1_2']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Collapse isOpen={openDetail}>
          {this.getRowHistoryRecord(4)}
          <Divider className={classes.hr1} />
        </Collapse>
        <Row className={openDetail ? classes.main : null}>
          <DataCell
            title="3 : 0"
            rate={rate['3_0']}
            compareRate={compareRate['3_0']}
          />
          <DataCell
            title="3 : 3"
            rate={rate['3_3']}
            compareRate={compareRate['3_3']}
          />
          <DataCell
            title="0 : 3"
            rate={rate['0_3']}
            compareRate={compareRate['0_3']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Collapse isOpen={openDetail}>
          {this.getRowHistoryRecord(5)}
          <Divider className={classes.hr1} />
        </Collapse>
        <Row className={openDetail ? classes.main : null}>
          <DataCell
            title="3 : 1"
            rate={rate['3_1']}
            compareRate={compareRate['3_1']}
          />
          <DataCell
            title="4 : 4"
            rate={rate['4_4']}
            compareRate={compareRate['4_4']}
          />
          <DataCell
            title="1 : 3"
            rate={rate['1_3']}
            compareRate={compareRate['1_3']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Collapse isOpen={openDetail}>
          {this.getRowHistoryRecord(6)}
          <Divider className={classes.hr1} />
        </Collapse>
        <Row className={openDetail ? classes.main : null}>
          <DataCell
            title="3 : 2"
            rate={rate['3_2']}
            compareRate={compareRate['3_2']}
          />
          <DataCell
            title="5+ : 5+"
            rate={rate['5_5']}
            compareRate={compareRate['5_5']}
          />
          <DataCell
            title="2 : 3"
            rate={rate['2_3']}
            compareRate={compareRate['2_3']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="4 : 0"
            rate={rate['4_0']}
            compareRate={compareRate['4_0']}
          />
          <DataCell />
          <DataCell
            title="0 : 4"
            rate={rate['0_4']}
            compareRate={compareRate['0_4']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="4 : 1"
            rate={rate['4_1']}
            compareRate={compareRate['4_1']}
          />
          <DataCell />
          <DataCell
            title="1 : 4"
            rate={rate['1_4']}
            compareRate={compareRate['1_4']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="4 : 2"
            rate={rate['4_2']}
            compareRate={compareRate['4_2']}
          />
          <DataCell />
          <DataCell
            title="2 : 4"
            rate={rate['2_4']}
            compareRate={compareRate['2_4']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="4 : 3"
            rate={rate['4_3']}
            compareRate={compareRate['4_3']}
          />
          <DataCell />
          <DataCell
            title="3 : 4"
            rate={rate['3_4']}
            compareRate={compareRate['3_4']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="5+ : 0"
            rate={rate['5_0']}
            compareRate={compareRate['5_0']}
          />
          <DataCell />
          <DataCell
            title="0 : 5+"
            rate={rate['0_5']}
            compareRate={compareRate['0_5']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="5+ : 1"
            rate={rate['5_1']}
            compareRate={compareRate['5_1']}
          />
          <DataCell />
          <DataCell
            title="1 : 5+"
            rate={rate['1_5']}
            compareRate={compareRate['1_5']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="5+ : 2"
            rate={rate['5_2']}
            compareRate={compareRate['5_2']}
          />
          <DataCell />
          <DataCell
            title="2 : 5+"
            rate={rate['2_5']}
            compareRate={compareRate['2_5']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="5+ : 3"
            rate={rate['5_3']}
            compareRate={compareRate['5_3']}
          />
          <DataCell />
          <DataCell
            title="3 : 5+"
            rate={rate['3_5']}
            compareRate={compareRate['3_5']}
          />
        </Row>
        <Divider className={classes.hr} />
        <Row>
          <DataCell
            title="5+ : 4"
            rate={rate['5_4']}
            compareRate={compareRate['5_4']}
          />
          <DataCell />
          <DataCell
            title="4 : 5+"
            rate={rate['4_5']}
            compareRate={compareRate['4_5']}
          />
        </Row>
        <Divider className={classes.hr} />
      </Container>
    );
  }
}

Score.propTypes = {
  openDetail: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(Score);
