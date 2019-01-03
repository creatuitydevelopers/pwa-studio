import actions from './actions';
import { Util, RestApi } from '@magento/peregrine';
const { request } = RestApi.Magento2;
const { BrowserPersistence } = Util;

export const getAllStores = () =>
    async function thunk(dispatch) {
        dispatch(actions.getAllStores.request());
        try {
            const allStores = await getStoresFromStorage();
            if (allStores) {
                dispatch(actions.getAllStores.receive(allStores));
                return;
            }

            const storesHash = await getStoresHashFromStorage();
            const storesHashOnServer = await request(
                '/rest/V1/storelocator/storeshash',
                {
                    method: 'GET'
                }
            );

            if (storesHash !== storesHashOnServer) {
                const response = await request('/rest/V1/storelocator/stores', {
                    method: 'GET'
                });

                const { hash, stores } = JSON.parse(response);
                setStoresHashInStorage(hash);
                setStoresInStorage(stores);

                const payload = await getStoresFromStorage();
                dispatch(actions.getAllStores.receive(payload));
            }
        } catch (error) {
            dispatch(actions.getAllStores.receive(error));
        }
    };

export const setCurrentStore = store =>
    async function thunk(dispatch) {
        dispatch(actions.setCurrentStore.request());
        try {
            await setCurrentStoreInStorage(store);
            dispatch(actions.setCurrentStore.receive(store));
        } catch (error) {
            dispatch(actions.setCurrentStore.receive(error));
        }
    };

async function setStoresHashInStorage(hash) {
    const storage = new BrowserPersistence();
    storage.setItem('stores_hash', hash, 99999);
}

async function getStoresHashFromStorage() {
    const storage = new BrowserPersistence();
    return storage.getItem('stores_hash');
}

async function getStoresFromStorage() {
    const storage = new BrowserPersistence();
    return storage.getItem('all_stores');
}

async function setStoresInStorage(stores) {
    const storage = new BrowserPersistence();
    storage.setItem('all_stores', stores, 99999);
}

async function setCurrentStoreInStorage(store) {
    const storage = new BrowserPersistence();
    storage.setItem('current_store', store, 3600);
}
