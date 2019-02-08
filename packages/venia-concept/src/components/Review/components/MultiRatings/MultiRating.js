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

        const {setRatings, items} = this.props;
        const skus = items.map(item => item.sku).join(',');

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
                const ratings = getRatingsForProducts(reviews.BatchedResults.r.Results);
                setRatings(ratings);
                this.setState({
                    ratings: ratings,
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
        const {getRatings, items} = this.props;
        const ratingFromStorage = await getRatings(items.map(item => item.sku));
        if (!!ratingFromStorage.length) {
            this.setState({
                ratings: ratingFromStorage,
                error: null,
                isLoading: false
            });
        }else{
            this.setState({
                ratings: [],
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
        const { children, showAverage } = this.props;
        const { ratings, error, isLoading } = this.state;

        const updatedChildren = React.Children.map(children, child => {
            const rating =
                ratings.find(
                    rating => rating.sku == child.props.item.sku
                ) || {};

            rating.showAverage = showAverage;
            rating.isLoading = isLoading;
            rating.error = error;
            return React.cloneElement(child, { rating });
        });

        return <React.Fragment>{updatedChildren}</React.Fragment>;
    }
}

export default MultiRating;
