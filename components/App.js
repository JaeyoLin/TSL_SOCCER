import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Header from './Header';
import Menu from './Menu';
import Content from './Content';

import styles from '../utils/styles';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameCode: this.props.data[0].code,
    };
  }

  handleSelectGame = gameCode => {
    this.setState({
      gameCode,
    });
  };

  render() {
    const { classes, data } = this.props;
    const gameData = data.filter(item => item.code === this.state.gameCode);

    return (
      <div className={classes.root}>
        <Header />
        <Menu data={data} selectGame={this.handleSelectGame} />
        <main className={classes.content}>
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
