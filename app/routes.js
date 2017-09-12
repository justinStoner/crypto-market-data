/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
// import IconButton from 'material-ui/IconButton';
// import MenuIcon from 'material-ui-icons/Menu';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  }),
});

const styles = theme => ({
  root: {
    marginTop: 0,
    width: '100%'
  },
  flex: {
    flex: 1,
  },
});
// <div className={classes.root}>
//   <AppBar position="static">
//     <Toolbar>
//       <Typography type="title" color="inherit" className={classes.flex}>
//         Crypto Market Data
//       </Typography>
//     </Toolbar>
//   </AppBar>
// </div>
function routes (props) {
  const classes=props.classes
  return (
    <App>
      <MuiThemeProvider theme={theme} >
        <div>
          <Switch>
            <Route path="/counter" component={CounterPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    </App>
  )
};
routes.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(routes);
