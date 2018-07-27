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
    background: 'black',
    opacity: '0.8',
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
    backgroundColor: 'black',
  },
  drawerPaper: {
    paddingTop: '0px',
    width: drawerWidth,
    height: '100%',
    background: 'black',
    opacity: '0.8',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  drawerHeader: {
    paddingTop: '0px',
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
    backgroundColor: 'cadetblue',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
  menu: {
    paddingTop: '0px',
  },
  menuIcon: {
    color: 'white',
    backgroundColor: '#00acc1',
  },
  menuTitle: {
    color: 'white',
    fontSize: '14px',
  },
  content: {
    backgroundColor: '#fafafa',
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      padding: theme.spacing.unit * 2,
    },
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '95%',
    },
  },
  toolbar: theme.mixins.toolbar,
  selectMenu: {
    background: 'linear-gradient(60deg, #ffa726, #fb8c00)',
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 10,
  },
  hide: {
    display: 'none',
  },
});

export default styles;
