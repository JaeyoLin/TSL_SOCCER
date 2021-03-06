import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
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
import Hidden from '@material-ui/core/Hidden';

import styles from '../utils/styles';

const Header = props => {
  const { classes, theme, data, gameCode, open, handleDrawerClose } = props;
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

      let className = null;
      if (gameCode === item.code) {
        className = classes.selectMenu;
      }

      listItems.push(
        <ListItem
          key={item.code}
          onClick={() => {
            props.selectGame(item.code);
          }}
          button
          className={className}
        >
          <Avatar className={classes.menuIcon}>{minsComponent}</Avatar>
          <ListItemText
            classes={{
              primary: classes.menuTitle,
              secondary: classes.menuTitle,
            }}
            primary={`${item.code} - ${item.league}`}
            secondary={`${item.teams.ai} @ ${item.teams.hi}`}
          />
        </ListItem>
      );
    });
  }

  const drawer = (
    <div>
      <div className={classes.drawerHeader}>
        <List>
          <ListItem>
            <Avatar />
            <ListItemText
              classes={{
                primary: classes.menuTitle,
                secondary: classes.menuTitle,
              }}
              primary="TSL"
              secondary="v1.0.0"
            />
          </ListItem>
        </List>
      </div>
      <List className={classes.menu}>{listItems}</List>
      <div className={classes.menuBack} />
    </div>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={open}
          onClose={handleDrawerClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          swipeAreaWidth={150}
          disableBackdropTransition
          disableDiscovery
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  selectGame: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(Header);
