import geolib from 'geolib';

const DEFAULT_METHOD_CODE = 'default';
const STS_METHOD_CODE = 'sts';
const VSTS_METHOD_CODE = 'vsts';

const RADIUS = 50;
const SEARCH_RADIUS_UNIT = 'mi';

export const getDefaultMethodCode = () => DEFAULT_METHOD_CODE;

export const getStstMethodCode = () => STS_METHOD_CODE;

export const getVstsMethodCode = () => VSTS_METHOD_CODE;

export const getDefaultRadius = () => RADIUS;

export const getStoreListForStsMethod = ({
    stores,
    latitude,
    longitude,
    radius,
    methodInfo
}) => {
    if (!stores) {
        return [];
    }

    return stores
        .filter(store => {
            const distanceInMiles = geolib.convertUnit(
                SEARCH_RADIUS_UNIT,
                geolib.getDistance(
                    { latitude: store.latitude, longitude: store.longitude },
                    { latitude, longitude }
                ),
                2
            );

            if (distanceInMiles < radius) {
                const storeFromMethodInfo = methodInfo.stores.find(obj => obj.store_number == store.store_number);
                store.inventoryLevel = !!storeFromMethodInfo ? storeFromMethodInfo.inventory_level : 0;
                store.distance = distanceInMiles;

                return store;
            }
        })
        .sort((a, b) => (a.distance >= b.distance ? 1 : -1));
};

export const isCurrentStoreEnabledForSts = ({ allowedStores, store }) => {
    if(!store){
        return false;
    }

    return allowedStores.some(enabledStore => enabledStore.store_number == store.store_number);
};

export const isDeliveryMethodValid = (method, store) => {
    return !!method && !!store;
}