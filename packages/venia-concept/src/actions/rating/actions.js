import { createActions } from 'redux-actions';

const prefix = 'RATING';

const actionMap = {
    SET_RATING: {
        REQUEST: null,
        RECEIVE: null
    },
    GET_RATING: {
        REQUEST: null,
        RECEIVE: null
    }
};

export default createActions(actionMap, { prefix });
