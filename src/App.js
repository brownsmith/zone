import React, { Component } from 'react';
import Content from './Containers/Content.js';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Eggs
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Content />
            </Grid>
          </Grid>
        </div>
      </Provider>
    );
  }
}

export default App;
