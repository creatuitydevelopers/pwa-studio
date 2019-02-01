import { createActions } from 'redux-actions';

const prefix = 'UPCOMING_EVENTS';

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
