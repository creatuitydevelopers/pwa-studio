import { createActions } from 'redux-actions';

const prefix = 'REBATES';

const actionMap = {
    SET_CURRENT_PAGE: {
        REQUEST: null,
        RECEIVE: null
    },
    SET_PREV_PAGE_TOTAL: {
        REQUEST: null,
        RECEIVE: null
    },
    SET_PAGE_SIZE: {
        REQUEST: null,
        RECEIVE: null
    }
};

export default createActions(actionMap, { prefix });
