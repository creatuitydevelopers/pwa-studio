import { createActions } from 'redux-actions';

const prefix = 'STORE';

const actionMap = {
    GET_CURRENT_STORE: {
        REQUEST: null,
        RECEIVE: null
    },
    SET_CURRENT_STORE: {
        REQUEST: null,
        RECEIVE: null
    },
    GET_ALL_STORES: {
        REQUEST: null,
        RECEIVE: null
    }
};

export default createActions(actionMap, { prefix });
