import { connect } from 'react-redux';
import SingleRating from './SingleRating';

import { setRatings, getRatings } from 'src/actions/rating';

const mapStateToProps = ({ app }) => {
    const { isOnline } = app;

    return {
        isOnline
    };
};

const mapDispatchToProps = { setRatings, getRatings };


export default connect(mapStateToProps, mapDispatchToProps)(SingleRating);
