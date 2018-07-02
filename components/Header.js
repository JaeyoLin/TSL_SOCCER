import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import styles from '../utils/styles';
import classNames from 'classnames';

const Header = props => {
  const { classes, open, handleDrawerOpen } = props;

  const testModal = () => {
    alert('~~呆呆領域~~');
  };

  return (
    <AppBar
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" noWrap>
          TSL SOCCER
        </Typography>
        <Avatar
          alt="Remy Sharp"
          src="/static/assets/test.jpg"
          className={classes.avatar}
          onClick={() => {
            testModal();
          }}
        />
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
