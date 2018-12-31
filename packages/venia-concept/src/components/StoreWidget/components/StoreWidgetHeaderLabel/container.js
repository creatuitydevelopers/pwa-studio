import { connect } from 'react-redux';
import StoreWidgetHeaderLabel from './StoreWidgetHeaderLabel';

const mapStateToProps = ({ store }) => {
    const { currentStore } = store;

    return {
        currentStore
    };
};

export default connect(mapStateToProps)(StoreWidgetHeaderLabel);
