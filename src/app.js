/**
 * @file Wrapper component that renders components from src/components.
 */

import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Post from './components/post/post';
import Category from './components/category/category';
import { Provider } from 'react-redux';
import store from "./store";
import './app.scss';
import { syncHistoryWithStore } from "react-router-redux";

if (!window.Intl)
    window.Intl = require('intl');

const history = syncHistoryWithStore(browserHistory, store);
/**
 * Renders App component.
 * @return {ReactElement} HelloWorld component
 */
const App = () =>
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={Category} />
            <Route path='/posts' component={Post} />
            <Route path='/categories' component={Category} />
        </Router>
    </Provider>

export default App;
