import { connect } from 'react-redux';
import DeliveryMethods from './DeliveryMethods';

const mapStateToProps = ({ cart, store }) => {
    const { currentStore } = store;

    return {
        cart,
        currentStore
    };
};

export default connect(mapStateToProps)(DeliveryMethods);
