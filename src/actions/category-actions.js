import axios from "axios";
import { hashHistory } from 'react-router'
import  {
    FETCH_CATEGORIES_STARTED,
    FETCH_CATEGORIES_COMPLETED,
    FETCH_CATEGORIES_ERROR,
    SAVE_CATEGORY_STARTED,
    SAVE_CATEGORY_COMPLETED,
    SAVE_CATEGORY_ERROR,
    EDIT_CATEGORY_STARTED,
    UPDATE_CATEGORY_STARTED,
    UPDATE_CATEGORY_COMPLETED,
    UPDATE_CATEGORY_ERROR,
    DELETE_CATEGORY_STARTED,
    DELETE_CATEGORY_COMPLETED,
    DELETE_CATEGORY_ERROR,
    OPEN_MODAL,
    HIDE_MODAL,
    HIDE_ALERT,
} from 'src/action-types';

export const categoryApi = "http://192.168.1.127/react/react-demo-app/category.php";

export const fetchError = () => {
    return {
        type: FETCH_CATEGORIES_ERROR,
        payload:[],
    }
}

export const fetchCompleted = () => {
    console.log('fetchCompleted actions')
    return {
        type: FETCH_CATEGORIES_COMPLETED,
    }
}

function fetchCategories() {
    console.log('fetchCategories actions')
    return function(dispatch) {
        dispatch({type: FETCH_CATEGORIES_STARTED, payload: []})

        axios.get(categoryApi)
        .then((response) => {
            dispatch({type: FETCH_CATEGORIES_COMPLETED, payload: response.data})
        })
        .catch((err) => {
            dispatch({type: FETCH_CATEGORIES_ERROR, payload: err})
        })
    }
}
export default fetchCategories;

export function saveCategory(category){
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch, getState) {
        dispatch({type: SAVE_CATEGORY_STARTED, payload: []})
        axios.post(categoryApi, category, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: SAVE_CATEGORY_ERROR, payload: response.data.error})
            else {
                dispatch({type: SAVE_CATEGORY_COMPLETED, payload: response.data})
                dispatch(fetchCategories());
                // dispatch(fetchCategories());
            }

        })

    }
}

export function editCategory(id) {
    return function(dispatch) {
        dispatch({type: EDIT_CATEGORY_STARTED, payload: id})
    }
}


export function updateCategory(category, id) {
    const headers = {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }

    return function(dispatch) {
        dispatch({type: UPDATE_CATEGORY_STARTED, payload: []})
        axios.put(categoryApi + '?id='+id, category, headers)
        .then((response) => {
            if (response.data.error)
                dispatch({type: UPDATE_CATEGORY_ERROR, payload: response.data.error})
            else {
                dispatch({type: UPDATE_CATEGORY_COMPLETED, payload: response.data})
                dispatch(fetchCategories());
            }
        })
    }
}

export function deleteCategory(id) {
    return function(dispatch) {
        dispatch({type: DELETE_CATEGORY_STARTED})
        let endpoint = categoryApi + '?id='+id;

        axios.delete(endpoint)
        .then((response) => {
            dispatch({type: DELETE_CATEGORY_COMPLETED, payload: response.data})
            dispatch(fetchCategories());
        })
        .catch((err) => {
            dispatch({type: DELETE_CATEGORY_ERROR, payload: err})
        })
    }
}
