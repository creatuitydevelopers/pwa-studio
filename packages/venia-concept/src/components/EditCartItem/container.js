import { connect } from 'src/drivers';
import { closeDrawer } from 'src/actions/app';
import EditCartItem from './EditCartItem';

const mapDispatchToProps = {
    closeDrawer
};

export default connect(
    null,
    mapDispatchToProps
)(EditCartItem);
