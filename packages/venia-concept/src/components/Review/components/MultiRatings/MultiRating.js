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
        ratings: [],
        isLoading: true
    };

    async fetchDataFromApi() {
        const skus = this.props.items.map(item => item.sku).join(',');

        await fetch(getReviewFetchUrl(skus))
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
            .then(reviews => {
                this.setState({
                    ratings: getRatingsForProducts(reviews.BatchedResults.r.Results),
                    error: null,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err);
                console.log(this.state.error);
            });
    }

    async componentDidMount() {
        const {isOnline, items} = this.props;

        if (isOnline) {
            await this.fetchDataFromApi();
        } else {

        }
    }

    render() {
        const { children, showAverage } = this.props;
        const { ratings, isLoading } = this.state;

console.log(ratings);
        const updatedChildren = React.Children.map(children, child => {
            const rating =
                ratings.find(
                    rating => rating.productId == child.props.item.sku
                ) || {};

            rating.showAverage = showAverage;
            rating.isLoading = isLoading;
            return React.cloneElement(child, { rating });
        });

        return <React.Fragment>{updatedChildren}</React.Fragment>;
    }
}

export default MultiRating;
