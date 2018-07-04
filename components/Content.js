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
  desc: {
    color: 'red',
  },
  asc: {
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

  return (
    <div>
      <h3>賽事編號 {code}</h3>
      <h3>日期 {date}</h3>
      <h3>
        {aiName} @ {hiName}
      </h3>
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
              let aiClass = classes.draw;
              let drawClass = classes.draw;
              let hiClass = classes.draw;

              if (index !== 0) {
                if (n.ai > rates_single[index - 1].ai) {
                  aiClass = classes.asc;
                } else if (n.ai < rates_single[index - 1].ai) {
                  aiClass = classes.desc;
                }

                if (n.draw > rates_single[index - 1].draw) {
                  drawClass = classes.asc;
                } else if (n.draw < rates_single[index - 1].draw) {
                  drawClass = classes.desc;
                }

                if (n.hi > rates_single[index - 1].hi) {
                  hiClass = classes.asc;
                } else if (n.hi < rates_single[index - 1].hi) {
                  hiClass = classes.desc;
                }
              }

              return (
                <tr key={`rates_single_${index}`}>
                  <td className={aiClass}>
                    {parseFloat(Math.round(n.ai * 100) / 100).toFixed(2)}
                  </td>
                  <td className={drawClass}>
                    {parseFloat(Math.round(n.draw * 100) / 100).toFixed(2)}
                  </td>
                  <td className={hiClass}>
                    {parseFloat(Math.round(n.hi * 100) / 100).toFixed(2)}
                  </td>
                  <td className={classes.time}>{n.time}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Paper>

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
              let aiClass = classes.draw;
              let drawClass = classes.draw;
              let hiClass = classes.draw;

              if (index !== 0) {
                if (n.ai > rates_handicap[index - 1].ai) {
                  aiClass = classes.asc;
                } else if (n.ai < rates_handicap[index - 1].ai) {
                  aiClass = classes.desc;
                }

                if (n.draw > rates_handicap[index - 1].draw) {
                  drawClass = classes.asc;
                } else if (n.draw < rates_handicap[index - 1].draw) {
                  drawClass = classes.desc;
                }

                if (n.hi > rates_handicap[index - 1].hi) {
                  hiClass = classes.asc;
                } else if (n.hi < rates_handicap[index - 1].hi) {
                  hiClass = classes.desc;
                }
              }

              return (
                <tr key={`rates_handicap_${index}`}>
                  <td className={aiClass}>
                    {parseFloat(Math.round(n.ai * 100) / 100).toFixed(2)}
                  </td>
                  <td className={drawClass}>
                    {parseFloat(Math.round(n.draw * 100) / 100).toFixed(2)}
                  </td>
                  <td className={hiClass}>
                    {parseFloat(Math.round(n.hi * 100) / 100).toFixed(2)}
                  </td>
                  <td className={classes.time}>{n.time}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Paper>

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
              let overClass = classes.draw;
              let underClass = classes.draw;

              if (index !== 0) {
                if (n.over > rates_total_over_25[index - 1].over) {
                  overClass = classes.asc;
                } else if (n.over < rates_total_over_25[index - 1].over) {
                  overClass = classes.desc;
                }

                if (n.under > rates_total_over_25[index - 1].under) {
                  underClass = classes.asc;
                } else if (n.under < rates_total_over_25[index - 1].under) {
                  underClass = classes.desc;
                }
              }

              return (
                <tr key={`rates_total_over_25_${index}`}>
                  <td className={overClass}>
                    {parseFloat(Math.round(n.over * 100) / 100).toFixed(2)}
                  </td>
                  <td className={underClass}>
                    {parseFloat(Math.round(n.under * 100) / 100).toFixed(2)}
                  </td>
                  <td className={classes.time}>{n.time}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Paper>

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
              let aClass = classes.draw;
              let bClass = classes.draw;
              let cClass = classes.draw;

              if (index !== 0) {
                if (n.A > rates_point[index - 1].A) {
                  aClass = classes.asc;
                } else if (n.A < rates_point[index - 1].A) {
                  aClass = classes.desc;
                }

                if (n.B > rates_point[index - 1].B) {
                  bClass = classes.asc;
                } else if (n.B < rates_point[index - 1].B) {
                  bClass = classes.desc;
                }

                if (n.C > rates_point[index - 1].C) {
                  cClass = classes.asc;
                } else if (n.C < rates_point[index - 1].C) {
                  cClass = classes.desc;
                }
              }

              return (
                <tr key={`rates_point_${index}`}>
                  <td className={aClass} numeric>
                    {parseFloat(Math.round(n.A * 100) / 100).toFixed(2)}
                  </td>
                  <td className={bClass} numeric>
                    {parseFloat(Math.round(n.B * 100) / 100).toFixed(2)}
                  </td>
                  <td className={cClass} numeric>
                    {parseFloat(Math.round(n.C * 100) / 100).toFixed(2)}
                  </td>
                  <td className={classes.time}>{n.time}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Paper>

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
    </div>
  );
};

Content.propTypes = {
  gameData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
