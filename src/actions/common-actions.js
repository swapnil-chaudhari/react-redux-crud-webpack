import  {
    OPEN_MODAL,
    HIDE_MODAL,
    HIDE_ALERT,
} from 'src/action-types';

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

export default function hideAlert() {
    return function(dispatch){
        dispatch({ type:HIDE_ALERT });
    }
}
