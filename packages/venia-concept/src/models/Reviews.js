export const getRatingsForProducts = (reviews, showAverage, placeholder) => {
    if (!reviews || !reviews.Results) {
        return [];
    }

    return reviews.Results.map(results => {
        return {
            productId: results.ProductStatistics.ProductId,
            avgRating:
                results.ProductStatistics.NativeReviewStatistics
                    .AverageOverallRating,
            overallRating:
                results.ProductStatistics.NativeReviewStatistics
                    .OverallRatingRange,
            showAverage: showAverage,
            placeHolder: placeholder
        };
    });
};
