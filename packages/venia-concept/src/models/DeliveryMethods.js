import geolib from "geolib";

const DEFAULT_METHOD_CODE = 'default';
const STS_METHOD_CODE = 'sts';
const VSTS_METHOD_CODE = 'vsts';

const RADIUS = 50;
const SEARCH_RADIUS_UNIT = 'mi';


export const getDefaultMethodCode = () => DEFAULT_METHOD_CODE;

export const getStstMethodCode = () => STS_METHOD_CODE;

export const getVstsMethodCode = () => VSTS_METHOD_CODE;

export const getDefaultRadius = () => RADIUS;

export const getStoreListForStsMethod = ({stores, latitude, longitude, radius, methodInfo}) => {
    if (!stores) {
        return [];
    }

    return stores.filter(store => {

        const distanceInMiles = geolib.convertUnit(SEARCH_RADIUS_UNIT, geolib.getDistance(
            {latitude: store.latitude, longitude: store.longitude},
            {latitude, longitude}
        ), 2);

        if (distanceInMiles < radius) {
            store.distance = distanceInMiles;
            store.inventoryLevel = isCurrentStoreEnabledForSts({
                allowedStores: methodInfo.enabled,
                storeNumber: store.store_number
            })
                ? methodInfo.inventoryLevel
                : 0;

            return store;
        }
    }).sort((a, b) => a.distance >= b.distance ? 1 : -1);
};

export const isCurrentStoreEnabledForSts = ({allowedStores, storeNumber}) => {
    return allowedStores.some(enabledStoreNumber => enabledStoreNumber == storeNumber);
};

