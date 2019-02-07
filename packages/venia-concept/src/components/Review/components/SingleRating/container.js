import { connect } from 'react-redux';
import SingleRating from './SingleRating';

import { setRating, getRating } from 'src/actions/rating';

const mapStateToProps = ({ app }) => {
    const { isOnline } = app;

    return {
        isOnline
    };
};

const mapDispatchToProps = { setRating, getRating };


export default connect(mapStateToProps, mapDispatchToProps)(SingleRating);
