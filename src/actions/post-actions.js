import axios from "axios";
import { hashHistory } from 'react-router'
import  {
    FETCH_POSTS_STARTED,
    FETCH_POSTS_COMPLETED,
    FETCH_POSTS_ERROR,
    SAVE_POST_STARTED,
    SAVE_POST_COMPLETED,
    SAVE_POST_ERROR,
    EDIT_POST_STARTED,
    UPDATE_POST_STARTED,
    UPDATE_POST_COMPLETED,
    UPDATE_POST_ERROR,
    DELETE_POST_STARTED,
    DELETE_POST_COMPLETED,
    DELETE_POST_ERROR,
    FETCH_CATEGORIES_STARTED,
    FETCH_CATEGORIES_COMPLETED,
    FETCH_CATEGORIES_ERROR,
    OPEN_MODAL,
    HIDE_MODAL,
    HIDE_ALERT,
} from 'src/action-types';

export const postApi     = "http://192.168.1.127/react/react-demo-app/blog.php";
export const categoryApi = "http://192.168.1.127/react/react-demo-app/category.php";

export const fetchError = () => {
    return {
        type: FETCH_POSTS_ERROR,
        payload:[],
    }
}

export const fetchCompleted = () => {
    console.log('fetchCompleted actions')
    return {
        type: FETCH_POSTS_COMPLETED,
    }
}

function fetchPosts() {
    console.log('fetchPosts actions')
    return function(dispatch) {
        dispatch({type: FETCH_POSTS_STARTED, payload: []})

        axios.get(postApi)
        .then((response) => {
            dispatch({type: FETCH_POSTS_COMPLETED, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_POSTS_ERROR, payload: err})
        })
    }
}
export default fetchPosts;

export function savePost(post){
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch, getState) {
        dispatch({type: SAVE_POST_STARTED, payload: []})
        axios.post(postApi, post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: SAVE_POST_ERROR, payload: response.data.error})
            else {
                dispatch({type: SAVE_POST_COMPLETED, payload: response.data})
                dispatch(fetchPosts());
                // dispatch(fetchCategories());
            }

        })

    }
}

export function editPost(id) {
    return function(dispatch) {
        dispatch({type: EDIT_POST_STARTED, payload: id})
    }
}


export function updatePost(post, id) {
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch) {
        dispatch({type: UPDATE_POST_STARTED, payload: []})
        axios.put(postApi + '?id='+id, post, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: UPDATE_POST_ERROR, payload: response.data.error})
            else {
                dispatch({type: UPDATE_POST_COMPLETED, payload: response.data, post, id})
                dispatch(fetchPosts());
            }
        })
    }
}

export function deletePost(id) {
    return function(dispatch) {
        dispatch({type: DELETE_POST_STARTED})
        let endpoint = postApi + '?id='+id;

        axios.delete(endpoint)
        .then((response) => {
            dispatch({type: DELETE_POST_COMPLETED, payload: response.data})
            dispatch(fetchPosts());
            // dispatch(fetchCategories());
            // hashHistory.push('/posts');
        })
        .catch((err) => {
            dispatch({type: DELETE_POST_ERROR, payload: err})
        })
    }
}

export function openModal() {
    return function(dispatch){
        dispatch({ type:OPEN_MODAL });
    }
}

export function hideModal() {
    return function(dispatch){
        dispatch({ type:HIDE_MODAL });
    }
}

export function hideAlert() {
    return function(dispatch){
        dispatch({ type:HIDE_ALERT });
    }
}
