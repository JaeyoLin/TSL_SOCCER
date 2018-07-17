import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';
import MenuIcon from '@material-ui/icons/Menu';
import styles from '../utils/styles';
import classNames from 'classnames';

const Header = props => {
  const { classes, open, handleDrawerOpen } = props;

  const reflesh = () => {
    location.reload();
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classes.navIconHide}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          TSL SOCCER
        </Typography>

        <IconButton
          color="inherit"
          className={classes.avatar}
          onClick={() => {
            reflesh();
          }}
        >
          <Refresh />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
