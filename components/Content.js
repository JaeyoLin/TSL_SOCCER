import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Table } from 'reactstrap';

// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PollIcon from '@material-ui/icons/Poll';
import GroupIcon from '@material-ui/icons/Group';
import CasinoIcon from '@material-ui/icons/Casino';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { Container, Row, Col } from 'reactstrap';

import Score from './Score';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 1,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    textAlign: 'center',
  },
  title: {
    backgroundColor: '#4caf50',
    padding: '10px 24px 10px',
    flex: '0 0 auto',
    minHeight: '48px',
  },
  title_button: {
    display: 'grid',
    backgroundColor: '#4caf50',
    padding: '10px 24px 10px',
    flex: '0 0 auto',
    minHeight: '48px',
  },
  draw: {},
  down: {
    color: 'red',
  },
  up: {
    color: 'green',
  },
  test: {
    color: 'green',
  },
  avatar: {
    right: '20px',
    position: 'absolute',
    backgroundColor: '#4caf50',
  },
  menuIcon: {
    color: 'white',
    backgroundColor: '#00acc1',
  },
});

const Content = props => {
  const { openDetail, toggleScoreDetail, classes, gameData } = props;

  let code = '';
  let date = '';
  let aiName = '';
  let hiName = '';
  let mins = null;

  let rates_single = []; // 不讓球
  let rates_handicap = []; // 讓球
  let rates_total_over_25 = []; // 2.5 大小
  let rates_point = []; // 進球數
  let rates_score = []; // 進球數

  if (gameData) {
    code = gameData.code;
    date = gameData.date;
    aiName = gameData.teams.ai;
    hiName = gameData.teams.hi;
    mins = gameData.mins;

    rates_single = gameData.rates_single;
    rates_handicap = gameData.rates_handicap;
    rates_total_over_25 = gameData.rates_total_over_25;
    rates_point = gameData.rates_point;
    rates_score = gameData.rates_score;
  }

  // 讓球 title 顯示
  let aiHandicap = aiName; // 客
  let hiHandicap = hiName; // 主

  if (rates_handicap && rates_handicap.length && rates_handicap.length > 0) {
    const v1 = rates_handicap[rates_handicap.length - 1].v1;

    if (v1 === -1) {
      aiHandicap = `(+1)`;
      hiHandicap = `(-1)`;
    } else {
      aiHandicap = `(-1)`;
      hiHandicap = `(+1)`;
    }
  }

  // 判斷上升或下降
  const getCell = (rate, compareRate) => {
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
          <i class="fas fa-1g">
            {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
          </i>
        </span>
      );
    }

    return returnComponent;
  };

  let scoreComponent = null;
  if (openDetail) {
    scoreComponent = <ExpandMoreIcon />;
  } else {
    scoreComponent = <ExpandLessIcon />;
  }

  return (
    <div>
      <Container>
        <Row>
          {mins ? (
            <Col xs="12" sm="6">
              <ListItem>
                <Avatar className={classes.menuIcon}>
                  <CasinoIcon />
                </Avatar>
                <ListItemText primary="過關數量" secondary={mins} />
              </ListItem>
            </Col>
          ) : null}

          <Col xs="12" sm="6">
            <ListItem>
              <Avatar className={classes.menuIcon}>
                <PollIcon />
              </Avatar>
              <ListItemText primary="賽事編號" secondary={code} />
            </ListItem>
          </Col>
          <Col xs="12" sm="6">
            <ListItem>
              <Avatar className={classes.menuIcon}>
                <DateRangeIcon />
              </Avatar>
              <ListItemText primary="比賽日期" secondary={date} />
            </ListItem>
          </Col>
          <Col xs="12" sm="6">
            <ListItem>
              <Avatar className={classes.menuIcon}>
                <GroupIcon />
              </Avatar>
              <ListItemText
                primary="比賽隊伍"
                secondary={`${aiName} @ ${hiName}`}
              />
            </ListItem>
          </Col>
        </Row>
      </Container>

      {rates_single.length > 0 ? (
        <Paper className={classes.root}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              不讓球
            </Typography>
          </div>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>{aiName}</th>
                <th>和局</th>
                <th>{hiName}</th>
                <th>更新時間</th>
              </tr>
            </thead>
            <tbody>
              {rates_single.map((n, index) => {
                let aiCompare = n.ai;
                let drawCompare = n.draw;
                let hiCompare = n.hi;

                if (index !== 0) {
                  aiCompare = rates_single[index - 1].ai;
                  drawCompare = rates_single[index - 1].draw;
                  hiCompare = rates_single[index - 1].hi;
                }

                return (
                  <tr key={`rates_single_${index}`}>
                    <td>{getCell(n.ai, aiCompare)}</td>
                    <td>{getCell(n.draw, drawCompare)}</td>
                    <td>{getCell(n.hi, hiCompare)}</td>
                    <td className={classes.time}>{n.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Paper>
      ) : null}

      {rates_handicap.length > 0 ? (
        <Paper className={classes.root}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              讓球
            </Typography>
          </div>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>
                  {aiName}
                  <br />
                  {aiHandicap}
                </th>
                <th>和局</th>
                <th>
                  {hiName}
                  <br />
                  {hiHandicap}
                </th>
                <th>更新時間</th>
              </tr>
            </thead>
            <tbody>
              {rates_handicap.map((n, index) => {
                let aiCompare = n.ai;
                let drawCompare = n.draw;
                let hiCompare = n.hi;

                if (index !== 0) {
                  aiCompare = rates_handicap[index - 1].ai;
                  drawCompare = rates_handicap[index - 1].draw;
                  hiCompare = rates_handicap[index - 1].hi;
                }

                return (
                  <tr key={`rates_handicap_${index}`}>
                    <td>{getCell(n.ai, aiCompare)}</td>
                    <td>{getCell(n.draw, drawCompare)}</td>
                    <td>{getCell(n.hi, hiCompare)}</td>
                    <td className={classes.time}>{n.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Paper>
      ) : null}

      {rates_total_over_25.length > 0 ? (
        <Paper className={classes.root}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              2.5 大小
            </Typography>
          </div>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>大</th>
                <th>小</th>
                <th>更新時間</th>
              </tr>
            </thead>
            <tbody>
              {rates_total_over_25.map((n, index) => {
                let overCompare = n.over;
                let underCompare = n.under;

                if (index !== 0) {
                  overCompare = rates_total_over_25[index - 1].over;
                  underCompare = rates_total_over_25[index - 1].under;
                }

                return (
                  <tr key={`rates_total_over_25_${index}`}>
                    <td>{getCell(n.over, overCompare)}</td>
                    <td>{getCell(n.under, underCompare)}</td>
                    <td className={classes.time}>{n.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Paper>
      ) : null}

      {rates_point.length > 0 ? (
        <Paper className={classes.root}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              進球數
            </Typography>
          </div>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>0 - 1</th>
                <th>2 - 3</th>
                <th>4 +</th>
                <th>更新時間</th>
              </tr>
            </thead>
            <tbody>
              {rates_point.map((n, index) => {
                let aCompare = n.A;
                let bCompare = n.B;
                let cCompare = n.C;

                if (index !== 0) {
                  aCompare = rates_point[index - 1].A;
                  bCompare = rates_point[index - 1].B;
                  cCompare = rates_point[index - 1].C;
                }

                return (
                  <tr key={`rates_point_${index}`}>
                    <td>{getCell(n.A, aCompare)}</td>
                    <td>{getCell(n.B, bCompare)}</td>
                    <td>{getCell(n.C, cCompare)}</td>
                    <td className={classes.time}>{n.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Paper>
      ) : null}

      {rates_score.length > 0 ? (
        <Paper className={classes.root}>
          <div className={classes.title_button}>
            <Typography variant="title" id="tableTitle">
              正確比分 ({rates_score[rates_score.length - 1].time})
            </Typography>

            {rates_score.length > 1 ? (
              <IconButton
                color="inherit"
                className={classes.avatar}
                onClick={() => {
                  toggleScoreDetail();
                }}
              >
                {scoreComponent}
              </IconButton>
            ) : null}
          </div>
          <Score openDetail={openDetail} data={rates_score} />
        </Paper>
      ) : null}
    </div>
  );
};

Content.propTypes = {
  openDetail: PropTypes.bool.isRequired,
  toggleScoreDetail: PropTypes.func.isRequired,
  gameData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
