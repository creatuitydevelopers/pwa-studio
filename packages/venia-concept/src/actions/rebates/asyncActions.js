import actions from './actions';

export const setCurrentPage = payload =>
    async function thunk(dispatch) {
        dispatch(actions.setCurrentPage.receive(payload));
        window.scrollTo(0, 0);
    };

export const setPrevPageTotal = payload =>
    async function thunk(dispatch) {
        dispatch(actions.setPrevPageTotal.receive(payload));
    };

export const setPageSize = payload =>
    async function thunk(dispatch) {
        dispatch(actions.setPageSize.receive(payload));
        window.scrollTo(0, 0);
    };
