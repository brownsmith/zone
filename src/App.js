import React, { Component } from 'react';
import Content from './Containers/Content.js';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Content />
        </div>
      </Provider>
    );
  }
}

export default App;
