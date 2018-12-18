import { handleActions } from 'redux-actions';
import { Util } from '@magento/peregrine';
import actions from 'src/actions/store';

export const name = 'store';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();
const initialState = {
    currentStore: storage.getItem('current_store'),
    allStores: storage.getItem('all_stores')
};

const reducerMap = {
    [actions.getAllStores.receive]: (state, { payload, error }) => {
        if (error) {
            return state;
        }

        return {
            ...state,
            allStores: payload
        };
    },

    [actions.setCurrentStore.receive]: (state, {payload, error}) => {
        if (error) {
            return state;
        }

        return {
            ...state,
            currentStore: payload
        }
    },
};

export default handleActions(reducerMap, initialState);


