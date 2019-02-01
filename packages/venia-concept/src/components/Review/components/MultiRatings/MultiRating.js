import React from 'react';
import { array, bool } from 'prop-types';

import { getReviewFetchUrl, getRatingsForProducts } from 'src/models/Reviews';

class MultiRating extends React.Component {
    static propTypes = {
        items: array,
        showAverage: bool
    };

    static defaultProps = {
        items: [],
        showAverage: false
    };

    state = {
        reviews: null,
        isLoading: true
    };

    async componentDidMount() {
        const skus = this.props.items.map(item => item.sku).join(',');

        await fetch(getReviewFetchUrl(skus))
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
            .then(reviews => {
                this.setState({
                    reviews: reviews.BatchedResults.r.Results,
                    error: null,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err);
                console.log(this.state.error);
            });
    }

    render() {
        const { children, showAverage } = this.props;
        const { reviews, isLoading } = this.state;
        const ratings = getRatingsForProducts(reviews, showAverage, isLoading);

        const updatedChildren = React.Children.map(children, child => {
            const rating =
                ratings.find(
                    rating => rating.productId == child.props.item.sku
                ) || {};
            return React.cloneElement(child, { rating });
        });

        return <React.Fragment>{updatedChildren}</React.Fragment>;
    }
}

export default MultiRating;
