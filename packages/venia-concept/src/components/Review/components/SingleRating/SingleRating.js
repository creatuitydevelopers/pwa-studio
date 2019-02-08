import React from 'react';
import {bool, shape, number} from 'prop-types';
import {Rating} from 'src/components/Review';

import {getReviewFetchUrl} from 'src/models/Reviews';

class SingleRating extends React.Component {
    static propTypes = {
        item: shape({
            id: number
        }),
        showAverage: bool
    };

    static defaultProps = {
        showAverage: true
    };

    state = {
        error: null,
        rating: null,
        isLoading: true
    };

    async fetchDataFromApi() {
        const {setRatings, item} = this.props;

        return await fetch(getReviewFetchUrl(item.sku))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({
                        error: 'Something went wrong',
                        isLoading: false
                    });
                }
            })
            .then(response => {
                const result = response.BatchedResults.r.Results[0];
                const review = !!result ? result.ProductStatistics.ReviewStatistics : {};
                const rating = {
                    avgRating: !!review.AverageOverallRating
                        ? review.AverageOverallRating
                        : 0,
                    overallRating: !!review.OverallRatingRange
                        ? review.OverallRatingRange
                        : 0
                };


                setRatings([{sku: item.sku, ...rating}]);

                this.setState({
                    rating: rating,
                    error: null,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err);
                console.log(this.state.error);
            });
    }

    async getDataFromStorage() {
        const { getRatings, item} = this.props;
        const ratingFromStorage = await getRatings([item.sku]);

        if (!!ratingFromStorage[0]) {
            this.setState({
                rating: ratingFromStorage[0],
                error: null,
                isLoading: false
            });
        }else{
            this.setState({
                rating: {},
                error: 'No internet found',
                isLoading: false
            });
        }
    }

    async componentDidMount() {
        const {isOnline} = this.props;


        if (isOnline) {
            await this.fetchDataFromApi();
        } else {
            await this.getDataFromStorage();
        }
    }

    render() {
        const {showAverage} = this.props;
        const {isLoading, rating, error} = this.state;


        if (isLoading) {
            return <Rating placeHolder={isLoading}/>;
        }

        return (
            <Rating
                showAverage={showAverage}
                avgRating={rating.avgRating}
                overallRating={rating.overallRating}
                error={error}
            />
        );
    }
}

export default SingleRating;
