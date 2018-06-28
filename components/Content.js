import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
    fontSize: '20px',
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

  const data = gameData.rates;

  return (
    <div>
      <p>賽事編號 {gameData.code}</p>
      <p>日期 {gameData.date}</p>
      <p>
        {gameData.teams.ai} @ {gameData.teams.hi}
      </p>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tablecell}>Time</TableCell>
              <TableCell className={classes.tablecell} numeric>
                {gameData.teams.ai}
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                Draw
              </TableCell>
              <TableCell className={classes.tablecell} numeric>
                {gameData.teams.hi}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n, index) => {
              let aiClass = classes.draw;
              let drawClass = classes.draw;
              let hiClass = classes.draw;

              if (index !== 0) {
                if (n.ai > data[index - 1].ai) {
                  aiClass = classes.asc;
                } else if (n.ai < data[index - 1].ai) {
                  aiClass = classes.desc;
                }

                if (n.draw > data[index - 1].draw) {
                  drawClass = classes.asc;
                } else if (n.draw < data[index - 1].draw) {
                  drawClass = classes.desc;
                }

                if (n.hi > data[index - 1].hi) {
                  hiClass = classes.asc;
                } else if (n.hi < data[index - 1].hi) {
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
                    {n.ai}
                  </TableCell>
                  <TableCell className={drawClass} numeric>
                    {n.draw}
                  </TableCell>
                  <TableCell className={hiClass} numeric>
                    {n.hi}
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
