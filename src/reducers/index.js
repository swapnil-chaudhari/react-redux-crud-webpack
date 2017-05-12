import { combineReducers } from 'redux';
import posts from './post-reducer';
import categories from './category-reducer';
import { routerReducer } from "react-router-redux";

export default combineReducers({
    routing: routerReducer,
    posts,
    categories,
})
