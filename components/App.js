import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import Header from './Header';
import Menu from './Menu';
import Content from './Content';

import styles from '../utils/styles';

class App extends React.Component {
  constructor(props) {
    super(props);

    let gameCode = null;
    if (
      this.props.data &&
      this.props.data.length > 0 &&
      this.props.data[0].code
    ) {
      gameCode = this.props.data[0].code;
    }

    this.state = {
      open: false,
      gameCode,
    };
  }

  /**
   * handleSelectGame
   *
   */
  handleSelectGame = gameCode => {
    this.setState({
      gameCode,
      open: false,
    });
  };

  /**
   * handleDrawerOpen
   *
   */
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  /**
   * handleDrawerClose
   *
   */
  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, data } = this.props;
    let gameData = {
      code: '',
      date: '',
      teams: {
        ai: '',
        hi: '',
      },
    };
    if (data && data.length) {
      gameData = data.filter(item => item.code === this.state.gameCode);
    }

    return (
      <div className={classes.root}>
        <Header
          open={this.state.open}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        <Menu
          open={this.state.open}
          data={data}
          selectGame={this.handleSelectGame}
          handleDrawerClose={this.handleDrawerClose}
        />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.toolbar} />
          <Typography noWrap>
            <Content gameData={gameData[0]} />
          </Typography>
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(App);
