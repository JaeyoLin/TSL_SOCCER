import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Table } from 'reactstrap';

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
  toolbar: {
    backgroundColor: 'skyblue',
  },
  title: {
    flex: '0 0 auto',
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
});

const Content = props => {
  const { classes, gameData } = props;

  let code = '';
  let date = '';
  let aiName = '';
  let hiName = '';

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
    const v1 = rates_handicap[0].v1;

    if (v1 === -1) {
      aiHandicap = `${aiHandicap} (+1)`;
      hiHandicap = `${hiHandicap} (-1)`;
    } else {
      aiHandicap = `${aiHandicap} (-1)`;
      hiHandicap = `${hiHandicap} (+1)`;
    }
  }

  // 判斷上升或下降
  const getCell = (rate, compareRate) => {
    let returnComponent = null;

    if (rate > compareRate) {
      returnComponent = (
        <span className={classes.up}>
          <i class="fas fa-caret-up fa-lg">
            {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
          </i>
        </span>
      );
    } else if (rate < compareRate) {
      returnComponent = (
        <span className={classes.down}>
          <i class="fas fa-caret-down fa-lg">
            {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
          </i>
        </span>
      );
    } else {
      returnComponent = (
        <span>
          <i class="fas fa-lg">
            {parseFloat(Math.round(rate * 100) / 100).toFixed(2)}
          </i>
        </span>
      );
    }

    return returnComponent;
  };

  return (
    <div>
      <h3>賽事編號 {code}</h3>
      <h3>日期 {date}</h3>
      <h3>
        {aiName} @ {hiName}
      </h3>

      {rates_single.length > 0 ? (
        <Paper className={classes.root}>
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                不讓球
              </Typography>
            </div>
          </Toolbar>
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
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                讓球
              </Typography>
            </div>
          </Toolbar>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>{aiHandicap}</th>
                <th>和局</th>
                <th>{hiHandicap}</th>
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
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                2.5 大小
              </Typography>
            </div>
          </Toolbar>
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
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                進球數
              </Typography>
            </div>
          </Toolbar>
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
          <Toolbar className={classes.toolbar}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                正確比分
              </Typography>
            </div>
          </Toolbar>
          <Score data={rates_score} />
        </Paper>
      ) : null}
    </div>
  );
};

Content.propTypes = {
  gameData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
