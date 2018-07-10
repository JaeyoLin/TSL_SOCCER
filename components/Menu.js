import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from '../utils/styles';

const Header = props => {
  const { classes, data, open, handleDrawerClose } = props;
  const listItems = [];

  if (data) {
    let tmpDate = null;

    data.forEach(item => {
      const title = `${item.code} - ${item.teams.ai} @ ${item.teams.hi}`;

      if (!tmpDate) {
        tmpDate = item.date; // 這次日期時間
        listItems.push(<Divider />);
        listItems.push(
          <ListItemText primary={tmpDate} className={classes.drawDateTime} />
        );
        listItems.push(<Divider />);
      } else if (tmpDate !== item.date) {
        tmpDate = item.date; // 新的日期時間
        listItems.push(<Divider />);
        listItems.push(
          <ListItemText primary={tmpDate} className={classes.drawDateTime} />
        );
        listItems.push(<Divider />);
      }

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
      open={open}
      variant="persistent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{listItems}</List>
    </Drawer>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  selectGame: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
