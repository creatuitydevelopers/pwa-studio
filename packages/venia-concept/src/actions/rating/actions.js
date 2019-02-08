import { createActions } from 'redux-actions';

const prefix = 'RATING';

const actionMap = {
    SET_RATINGS: {
        REQUEST: null,
        RECEIVE: null
    },
    GET_RATINGS: {
        REQUEST: null,
        RECEIVE: null
    }
};

export default createActions(actionMap, { prefix });
