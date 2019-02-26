import { connect } from 'react-redux';
import DeliveryMethodLabel from './DeliveryMethodLabel';

const mapStateToProps = ({ store }) => {
    const { allStores } = store;

    return {
        allStores
    };
};

export default connect(mapStateToProps)(DeliveryMethodLabel);
