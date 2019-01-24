import { handleActions } from 'redux-actions';

import actions from 'src/actions/rebates';

export const name = 'rebates';

const initialState = {
    currentPage: 1,
    pageSize: 12,
    prevPageTotal: null
};

const reducerMap = {
    [actions.setCurrentPage.receive]: (state, { payload, error }) => {
        if (error) {
            return state;
        }

        return {
            ...state,
            currentPage: payload
        };
    },
    [actions.setPrevPageTotal.receive]: (state, { payload, error }) => {
        if (error) {
            return state;
        }

        return {
            ...state,
            prevPageTotal: payload
        };
    },
    [actions.setPageSize.receive]: (state, { payload, error }) => {
        if (error) {
            return state;
        }

        return {
            ...state,
            pageSize: payload
        };
    }

};

export default handleActions(reducerMap, initialState);