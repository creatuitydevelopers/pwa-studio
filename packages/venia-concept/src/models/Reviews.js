// bazaarvoice consts

export const URL_ADDRESS = 'https://api.bazaarvoice.com/data/batch.json';
export const PASS_KEY = 'cavYXG7YTBHgEHTW3tlWsgRqHCxBTqq3Sa1Gf2tucJuYo';
export const API_VERSION = 5.5;

export const getReviewFetchUrl = products =>
    `${URL_ADDRESS}?passkey=${PASS_KEY}&apiversion=${API_VERSION}&resource.r=statistics&stats.r=reviews&filter.r=productid:eq:${products}`;

export const getRatingsForProducts = (reviews) => {
    if (!reviews) {
        return [];
    }

    return reviews.map(results => {
        const avgRating =
            results.ProductStatistics.ReviewStatistics.AverageOverallRating;
        const overallRating =
            results.ProductStatistics.ReviewStatistics.OverallRatingRange;
        return {
            productId: results.ProductStatistics.ProductId,
            avgRating: !!avgRating ? avgRating : 0,
            overallRating: !!overallRating ? overallRating : 0,
        };
    });
};
