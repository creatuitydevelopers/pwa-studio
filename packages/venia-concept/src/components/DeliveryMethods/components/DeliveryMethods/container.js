import { connect } from 'react-redux';
import DeliveryMethods from './DeliveryMethods';

const mapStateToProps = ({ store }) => {
    const { currentStore } = store;

    return {
        currentStore
    };
};

export default connect(mapStateToProps)(DeliveryMethods);
