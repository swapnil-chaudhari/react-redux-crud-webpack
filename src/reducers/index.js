<<<<<<< HEAD
import { combineReducers } from 'redux';
import posts from './post-reducer';
import categories from './category-reducer';
import { routerReducer } from "react-router-redux";
=======
import { combineReducers } from 'redux'

import posts from './post-reducer'
import categories from './category-reducer'
>>>>>>> 760c65b059ce469306daf4ab39b8a9abf7d373e0

export default combineReducers({
    posts,
    categories,
})
