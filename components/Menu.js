import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import styles from '../utils/styles';

const Header = props => {
  const { classes, data } = props;

  const listItems = [];
  if (data) {
    data.forEach(item => {
      const title = `${item.code} - ${item.teams.ai} @ ${item.teams.hi}`;
      listItems.push(
        <ListItem
          key={item.code}
          onClick={() => {
            props.selectGame(item.code);
          }}
          button
        >
          <ListItemText primary={title} />
        </ListItem>
      );
    });
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar} />
      <List>{listItems}</List>
    </Drawer>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  selectGame: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
