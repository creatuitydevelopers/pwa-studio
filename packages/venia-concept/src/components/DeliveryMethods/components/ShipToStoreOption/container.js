import { connect } from 'react-redux';
import ShipToStoreOption from './ShipToStoreOption';

const mapStateToProps = ({ store }) => {
    const { currentStore, allStores } = store;

    return {
        currentStore,
        allStores
    };
};

export default connect(mapStateToProps)(ShipToStoreOption);
