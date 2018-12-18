import React from "react";
import {Rating} from "src/components/Review";
import {bool, shape, number} from "prop-types";

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
        review: null,
        isLoading: true,
    };

    async componentDidMount() {
        const review = {
            "Limit": 1,
            "Offset": 0,
            "TotalResults": 1,
            "Locale": "en_US",
            "Results": [{
                "ProductStatistics": {
                    "ProductId": "data-gen-2s9kaf0ugzn0p2flzl73ahuys",
                    "NativeReviewStatistics": {},
                    "ReviewStatistics": {"AverageOverallRating": 4.55, "TotalReviewCount": 20, "OverallRatingRange": 5}
                }
            }],
            "Includes": {},
            "HasErrors": false,
            "Errors": []
        };




        this.setState({
            review,
            isLoading: false
        });
    }

    get errorContent() {
        return (<p>Error occurred</p>)
    }

    render() {
        const {showAverage} = this.props;
        const {isLoading, review} = this.state;

        if (isLoading) {
            return (<Rating placeHolder={isLoading}/>)
        }

        const avgRating = !!review ? review.Results[0].ProductStatistics.ReviewStatistics.AverageOverallRating : 0;
        const overallRating = !!review ? review.Results[0].ProductStatistics.ReviewStatistics.OverallRatingRange : 0;

        return (
            (!!review && !!review.HasErrors) ? this.errorContent :
                <Rating showAverage={showAverage} avgRating={avgRating} overallRating={overallRating}/>
        )
    }
};
export default SingleRating;