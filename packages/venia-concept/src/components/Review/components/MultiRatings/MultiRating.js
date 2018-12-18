import React from "react";
import {array, bool} from "prop-types";

import {getRatingsForProducts} from "src/models/Reviews";

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
        isLoading: true,
    };

    async componentDidMount() {
        // const {default: reviews} = await import('src/__mocks__/review/multi_review');
        const reviews = [];

        this.setState({
            reviews,
            isLoading: false
        });

    }

    render() {
        const {children, showAverage} = this.props;
        const {reviews, isLoading} = this.state;
        const ratings = getRatingsForProducts(reviews, showAverage, isLoading);

        const updatedChildren = React.Children.map(children, (child) => {
            return React.cloneElement(child, {ratings});
        });

        return <React.Fragment>{updatedChildren}</React.Fragment>
    }
};

export default MultiRating;