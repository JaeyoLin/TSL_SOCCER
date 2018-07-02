import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    fontSize: '20px',
  },
  title: {
    flex: '0 0 auto',
  },
  tablecell: {
    fontSize: '20px',
  },
  draw: {
    fontSize: '20px',
  },
  desc: {
    color: 'red',
    fontSize: '20px',
  },
  asc: {
    color: 'green',
    fontSize: '20px',
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

  if (gameData) {
    code = gameData.code;
    date = gameData.date;
    aiName = gameData.teams.ai;
    hiName = gameData.teams.hi;

    rates_single = gameData.rates_single;
    rates_handicap = gameData.rates_handicap;
    rates_total_over_25 = gameData.rates_total_over_25;
    rates_point = gameData.rates_point;
  }

  return (
    <div>
      <h2>賽事編號 {code}</h2>
      <h2>日期 {date}</h2>
      <h2>
        {aiName} @ {hiName}
      </h2>
      <Paper className={classes.root}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              不讓球
            </Typography>
          </div>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Time</TableCell>
              <TableCell className={classes.tablecell} numeric>
                {aiName}
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                Draw
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                {hiName}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow key={n.id}>
                  <TableCell
                    className={classes.tablecell}
                    component="th"
                    scope="row"
                  >
                    {n.time}
                  </TableCell>
                  <TableCell className={aiClass} numeric>
                    {parseFloat(Math.round(n.ai * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={drawClass} numeric>
                    {parseFloat(Math.round(n.draw * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={hiClass} numeric>
                    {parseFloat(Math.round(n.hi * 100) / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper className={classes.root}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              讓球
            </Typography>
          </div>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Time</TableCell>
              <TableCell className={classes.tablecell} numeric>
                {aiName}
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                Draw
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                {hiName}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow key={n.id}>
                  <TableCell
                    className={classes.tablecell}
                    component="th"
                    scope="row"
                  >
                    {n.time}
                  </TableCell>
                  <TableCell className={aiClass} numeric>
                    {parseFloat(Math.round(n.ai * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={drawClass} numeric>
                    {parseFloat(Math.round(n.draw * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={hiClass} numeric>
                    {parseFloat(Math.round(n.hi * 100) / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper className={classes.root}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              2.5 大小
            </Typography>
          </div>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Time</TableCell>
              <TableCell className={classes.tablecell} numeric>
                Over
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                Under
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow key={n.id}>
                  <TableCell
                    className={classes.tablecell}
                    component="th"
                    scope="row"
                  >
                    {n.time}
                  </TableCell>
                  <TableCell className={overClass} numeric>
                    {parseFloat(Math.round(n.over * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={underClass} numeric>
                    {parseFloat(Math.round(n.under * 100) / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper className={classes.root}>
        <Toolbar>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              進球數
            </Typography>
          </div>
        </Toolbar>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Time</TableCell>
              <TableCell className={classes.tablecell} numeric>
                0 - 1
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                2 - 3
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                4 +
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
                <TableRow key={n.id}>
                  <TableCell
                    className={classes.tablecell}
                    component="th"
                    scope="row"
                  >
                    {n.time}
                  </TableCell>
                  <TableCell className={aClass} numeric>
                    {parseFloat(Math.round(n.A * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={bClass} numeric>
                    {parseFloat(Math.round(n.B * 100) / 100).toFixed(2)}
                  </TableCell>
                  <TableCell className={cClass} numeric>
                    {parseFloat(Math.round(n.C * 100) / 100).toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

Content.propTypes = {
  gameData: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);
