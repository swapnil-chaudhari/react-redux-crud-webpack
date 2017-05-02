/**
 * @file Wrapper component that renders components from src/components.
 */

import React, { Component } from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Post from './components/post/post'
import { Provider } from 'react-redux'
import store from "./store"
import './app.scss';
// import './bootstrap.js';
//import './bootstrap.min.js';

if (!window.Intl)
    window.Intl = require('intl');

/**
 * Renders App component.
 * @return {ReactElement} HelloWorld component
 */
const App = () =>
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={Post} />
            <Route path='/posts' component={Post} />
        </Router>
    </Provider>

export default App;
