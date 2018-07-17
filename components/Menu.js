import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Looks1Icon from '@material-ui/icons/LooksOne';
import Looks2Icon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
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

      let minsComponent = null;
      switch (item.mins) {
        case 1:
          minsComponent = <Looks1Icon />;
          break;
        case 2:
          minsComponent = <Looks2Icon />;
          break;
        case 3:
          minsComponent = <Looks3Icon />;
          break;
      }

      listItems.push(
        <ListItem
          key={item.code}
          onClick={() => {
            props.selectGame(item.code);
          }}
          button
        >
          <Avatar>{minsComponent}</Avatar>
          <ListItemText
            primary={`${item.code} - ${item.league}`}
            secondary={`${item.teams.ai} @ ${item.teams.hi}`}
          />
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
