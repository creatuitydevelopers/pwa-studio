import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { toggleCart } from 'src/actions/cart';
import classify from 'src/classify';
import defaultClasses from './cartTrigger.css';

class Trigger extends Component {
    static propTypes = {
        children: PropTypes.node,
        classes: PropTypes.shape({
            root: PropTypes.string
        }),
        cart: PropTypes.object,
        toggleCart: PropTypes.func.isRequired
    };

    render() {
        const { children, classes, toggleCart, cart } = this.props;
        const {totals: {items_qty}} = cart;

        return (
            <button
                className={classes.root}
                aria-label="Toggle mini cart"
                onClick={toggleCart}
            >
                <span className={classes.counter}>
                    {items_qty ? items_qty : 0 }
                </span>
                {children}
            </button>
        );
    }
}

const mapStateToProps = ({cart}) => {
    return {
        cart
    }
}

const mapDispatchToProps = {
    toggleCart
};

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Trigger);
