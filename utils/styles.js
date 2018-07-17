const drawerWidth = 280;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    background: 'cadetblue',
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatar: {
    right: '12px',
    position: 'absolute',
    backgroundColor: 'cadetblue',
  },
  drawerPaper: {
    width: drawerWidth,
    height: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      height: '64px',
    },
    [theme.breakpoints.down('md')]: {
      height: '56px',
    },
    ...theme.mixins.toolbar,
  },
  drawDateTime: {
    textAlign: 'center',
    backgroundColor: 'darkgray',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 1,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginLeft: 0,
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
});

export default styles;
