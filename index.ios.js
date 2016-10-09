// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AwesomeProject from './src/App';
import { reducer } from './src/store';

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AwesomeProject />
  </Provider>
)

AppRegistry.registerComponent('AwesomeProject', () => App);
