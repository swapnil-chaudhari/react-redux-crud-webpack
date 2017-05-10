import { combineReducers } from 'redux';
import posts from './post-reducer';
import categories from './category-reducer';

export default combineReducers({
    posts,
    categories,
})
