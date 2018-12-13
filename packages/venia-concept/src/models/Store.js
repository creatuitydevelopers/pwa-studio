import geolib from 'geolib';

export const getScheduleForToday = ({schedule}) => {
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return schedule.find(el => {
        return el.day === currentDay;
    })
}

export const isCurrentStore = (store, currentStore) => {
    return store.storelocator_id === currentStore.storelocator_id;
}

export const findStoresWithinRadius = ({stores, currentLocation, radius, radiusUnit = 'mi'}) => {
    console.log(currentLocation, radius, radiusUnit);

    return stores.filter(store => {
        const distanceInMiles = geolib.convertUnit(radiusUnit, geolib.getDistance(
            { latitude: store.latitude, longitude: store.longitude },
            { latitude: currentLocation.latitude, longitude: currentLocation.longitude }
        ), 2);

        if (distanceInMiles < radius) {
            return store;
        }
    });
}
