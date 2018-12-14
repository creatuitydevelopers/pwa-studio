import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import classify from 'src/classify';
import { toggleDrawer } from 'src/actions/app';
import defaultClasses from './storeWidgetTrigger.css';


class Trigger extends Component {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        openStoreWidget: PropTypes.func.isRequired
    };

    render() {
        const { children, classes, openStoreWidget } = this.props;

        return (
            <button className={classes.root} onClick={openStoreWidget}>
                {children}
            </button>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    openStoreWidget: () => dispatch(toggleDrawer('storeWidget'))
});

export default compose(
    classify(defaultClasses),
    connect(
        null,
        mapDispatchToProps
    )
)(Trigger);