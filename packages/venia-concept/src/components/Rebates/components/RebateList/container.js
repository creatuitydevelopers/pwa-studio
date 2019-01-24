import { connect } from 'react-redux';
import { setPageSize } from 'src/actions/rebates';
import RebateList from './RebateList';


const mapStateToProps = ({}) => {
    return {};
};

const mapDispatchToProps = { setPageSize };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RebateList);