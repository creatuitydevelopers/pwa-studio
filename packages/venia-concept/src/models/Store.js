import geolib from 'geolib';

export const getScheduleForToday = ({ schedule }) => {
    const currentDay = new Date()
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase();
    return !!schedule
        ? schedule.find(el => {
              return el.day === currentDay;
          })
        : false;
};

export const isCurrentStore = (store, currentStore) => {
    return (
        parseFloat(store.storelocator_id) ===
        parseFloat(currentStore.storelocator_id)
    );
};

export const findStoresWithinRadius = ({
    stores,
    currentLocation,
    radius,
    radiusUnit = 'mi'
}) => {
    return stores
        .map(store => {
            const distanceInMiles = geolib.convertUnit(
                radiusUnit,
                geolib.getDistance(
                    { latitude: store.latitude, longitude: store.longitude },
                    {
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude
                    }
                ),
                2
            );

            store.distance = distanceInMiles;
            return store;
        })
        .filter(store => {
            if (store.distance < radius) {
                return store;
            }
        })
        .sort((a, b) => {
            return a.distance - b.distance;
        });
};


export const getStoreByNumber = (stores, store_number) => {
    return stores.filter(store => store.store_number == store_number)[0];
};