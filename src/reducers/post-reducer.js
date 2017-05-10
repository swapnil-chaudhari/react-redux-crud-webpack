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

export default function reducer(state={
    posts      : [],
    categories : [],
    addPost    : [],
    message    : {
                    success : '',
                    fail    : '',
                 },
    errorClass : '',
    isOpen     : false,
    isCRUD     : false,
    isAlertVisible : false,
    modalAction: '',
}, action) {
    switch (action.type) {
        case FETCH_POSTS_STARTED: {
            return {...state }
        }
        case FETCH_POSTS_ERROR: {
            return {...state, message : {success: '', fail:action.payload.results}}
        }
        case FETCH_POSTS_COMPLETED: {
            let success = state.message.success;
            if (!state.isCRUD) {
                success = '';
            }
            return {...state , isCRUD:false, message : { success: success}, posts:action.payload}
        }
        case DELETE_POST_STARTED: {
            return {...state, deleteing:true}
        }
        case DELETE_POST_COMPLETED: {
            return {...state, isCRUD: true,isAlertVisible:true, message : {success: action.payload.results, fail:''}}
        }
        case FETCH_CATEGORIES_STARTED: {
            return {...state}
        }
        case FETCH_CATEGORIES_COMPLETED: {
            return {...state, categories:action.payload}
        }
        case OPEN_MODAL: {
            return {...state , message : {success:'', fail: ''}, errorClass: '', isOpen:true, modalAction: 'ADD'}
        }
        case HIDE_MODAL: {
            return {...state , isOpen:false, modalAction: ''}
        }
        case HIDE_ALERT: {
            return {...state , isAlertVisible:false}
        }
        case SAVE_POST_STARTED: {
            return {...state }
        }
        case SAVE_POST_COMPLETED: {
            return {...state , isOpen:false,modalAction:'',isCRUD: true,isAlertVisible:true, message : {success: action.payload.results, fail:''}}
        }
        case SAVE_POST_ERROR: {
            return {...state ,errorClass: 'alert alert-danger' , message : {success:'', fail: action.payload}}
        }
        case EDIT_POST_STARTED: {
            const index = state.posts.findIndex(x => x.id === action.payload);
            const editPost  = state.posts[index];
            return {...state , isOpen:true,modalAction:'EDIT', editPost : editPost, message : {success : '', fail : ''}, errorClass: ''}
        }
        case UPDATE_POST_STARTED: {
            return {...state}
        }
        case UPDATE_POST_COMPLETED: {
            return {...state , isOpen:false,modalAction:'',isCRUD: true,isAlertVisible:true, message : {success: action.payload.results, fail:''}}
        }
        case UPDATE_POST_ERROR: {
            return {...state ,errorClass: 'alert alert-danger' , message : {success:'', fail: action.payload}}
        }
        default : {
            return state;
        }
    }

}
