import actions from './actions';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;

export const setRatings = (ratings) =>
    async function thunk(dispatch) {
        dispatch(actions.setRatings.request());
        try {
            await setRatingsInStorage(ratings);
            dispatch(actions.setRatings.receive(ratings));
        } catch (error) {
            dispatch(actions.setRatings.receive(error));
        }
    };

export const getRatings = (productSkus) =>
    async function thunk(dispatch) {
        dispatch(actions.getRatings.request());
        try {
            const rating = await getRatingsFromStorage(productSkus);
            if (rating) {
                dispatch(actions.getRatings.receive(rating));
                return rating;
            }

            return null
        } catch (error) {
            dispatch(actions.getRatings.receive(error));
        }
    };


async function getRatingsFromStorage(productSkus) {
    const storage = new BrowserPersistence();
    const ratings = storage.getItem('ratings');

    if(!ratings) return [];
    if(!productSkus) return ratings;

    return ratings.filter(rating => productSkus.includes(rating.sku));
}

async function setRatingsInStorage(ratings) {
    const storage = new BrowserPersistence();
    const storageRatings = await getRatingsFromStorage();
    ratings.forEach(({sku, avgRating, overallRating}) => {

        if(!!storageRatings.find(storageRating => storageRating.sku == sku)) return;

        storageRatings.push({
            sku,
            avgRating,
            overallRating
        });
    });

    storage.setItem('ratings', storageRatings, 216000);
}