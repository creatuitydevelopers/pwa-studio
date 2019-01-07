import { connect } from 'react-redux';
import EventList from './EventList';

const mapStateToProps = ({ store }) => {
    const { currentStore, allStores } = store;

    return {
        currentStore,
        allStores
    };
};

export default connect(mapStateToProps)(EventList);