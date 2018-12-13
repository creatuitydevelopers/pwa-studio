import { connect } from 'react-redux';
import StsOption from './StsOption';

const mapStateToProps = ({ store }) => {
    const { currentStore, allStores } = store;

    return {
        currentStore,
        allStores
    };
};

export default connect(
    mapStateToProps,
)(StsOption);
