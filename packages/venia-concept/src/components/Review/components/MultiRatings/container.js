import { connect } from 'react-redux';
import MultiRating from './MultiRating';

import { setRatings, getRatings } from 'src/actions/rating';

const mapStateToProps = ({ app }) => {
    const { isOnline } = app;

    return {
        isOnline
    };
};

const mapDispatchToProps = { setRatings, getRatings };


export default connect(mapStateToProps, mapDispatchToProps)(MultiRating);
