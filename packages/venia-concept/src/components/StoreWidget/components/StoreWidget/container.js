import {connect} from 'react-redux';
import {closeDrawer} from 'src/actions/app';
import {getAllStores, setCurrentStore} from 'src/actions/store';
import StoreWidget from './StoreWidget';

const mapStateToProps = ({store}) => {
    const {currentStore, allStores} = store;

    return {
        currentStore,
        allStores
    };
};

const mapDispatchToProps = {closeDrawer, getAllStores, setCurrentStore};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoreWidget);
