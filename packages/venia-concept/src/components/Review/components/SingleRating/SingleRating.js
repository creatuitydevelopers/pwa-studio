import React from 'react';
import { bool, shape, number } from 'prop-types';
import { Rating } from 'src/components/Review';

import { getReviewFetchUrl } from 'src/models/Reviews';

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
        review: null,
        isLoading: true
    };

    async componentDidMount() {
        const { item } = this.props;

        await fetch(getReviewFetchUrl(item.sku))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.setState({
                        error: response,
                        isLoading: false
                    });
                }
            })
            .then(review => {
                const result = review.BatchedResults.r.Results[0];
                this.setState({
                    review: !!result
                        ? result.ProductStatistics.ReviewStatistics
                        : {},
                    error: null,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err);
                console.log(this.state.error);
            });
    }

    get errorContent() {
        return <p>Error occurred</p>;
    }

    render() {
        const { showAverage } = this.props;
        const { isLoading, review, error } = this.state;

        if (isLoading) {
            return <Rating placeHolder={isLoading} />;
        }

        const avgRating = !!review.AverageOverallRating
            ? review.AverageOverallRating
            : 0;
        const overallRating = !!review.OverallRatingRange
            ? review.OverallRatingRange
            : 0;

        return !!error ? (
            this.errorContent
        ) : (
            <Rating
                showAverage={showAverage}
                avgRating={avgRating}
                overallRating={overallRating}
            />
        );
    }
}
export default SingleRating;
