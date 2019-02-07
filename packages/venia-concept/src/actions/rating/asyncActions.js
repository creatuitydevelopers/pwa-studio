import actions from './actions';
import { Util } from '@magento/peregrine';
const { BrowserPersistence } = Util;

export const setRating = (product, rating) =>
    async function thunk(dispatch) {
        dispatch(actions.setRating.request());
        try {
            await setRatingInStorage(product, rating);
            dispatch(actions.setRating.receive(product, rating));
        } catch (error) {
            dispatch(actions.setRating.receive(error));
        }
    };

export const getRating = (product) =>
    async function thunk(dispatch) {
        dispatch(actions.getRating.request());
        try {
            const rating = await getRatingFromStorage(product);
            if (rating) {
                dispatch(actions.getRating.receive(rating));
                return rating;
            }

            return null
        } catch (error) {
            dispatch(actions.getRating.receive(error));
        }
    };


async function getRatingFromStorage(product) {
    const storage = new BrowserPersistence();
    const ratings = storage.getItem('ratings');

    if(!ratings){
        return {};
    }

    if(Array.isArray(product)){
        return ratings.filter(rating => rating.hasOwnProperty(rating.productId));
    }

    return !!product ? ratings[product.id] : rating;

}

async function setRatingInStorage(product, rating) {
    const storage = new BrowserPersistence();
    const ratings = await getRatingFromStorage();
    ratings[product.id] = rating;

    storage.setItem('ratings', ratings, 216000);
}


async function setMultiplyRatingInStorage(ratings) {
    const storage = new BrowserPersistence();
    const storageRatings = await getRatingFromStorage();

    ratings.forEach(({productId, avgRating, overallRating}) => {
        storageRatings[productId] = {
            avgRating,
            overallRating
        }
    });

    storage.setItem('ratings', storageRatings, 216000);
}
