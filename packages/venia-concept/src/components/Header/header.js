import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import classify from 'src/classify';
import Icon from 'src/components/Icon';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import StoreWidgetTrigger from './storeWidgetTrigger';
import defaultClasses from './header.css';
import logo from './logo.png';
import {StoreWidgetHeaderLabel} from "src/components/StoreWidget";

class Header extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            logo: PropTypes.string,
            primaryActions: PropTypes.string,
            root: PropTypes.string,
            searchBlock: PropTypes.string,
            searchInput: PropTypes.string,
            searchTrigger: PropTypes.string,
            secondaryActions: PropTypes.string,
            toolbar: PropTypes.string
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <header className={classes.root}>
                <div className={classes.toolbar}>
                    <Link to="/">
                        <img
                            className={classes.logo}
                            src={logo}
                            height="40"
                            alt="RuralKing"
                            title="RuralKing"
                        />
                    </Link>
                    <div className={classes.primaryActions}>
                        <NavTrigger>
                            <Icon name="menu" />
                        </NavTrigger>
                    </div>
                    <div className={classes.secondaryActions}>
                        <StoreWidgetTrigger>
                            <StoreWidgetHeaderLabel/>
                        </StoreWidgetTrigger>
                        <button className={classes.searchTrigger}>
                            <Icon name="search" />
                        </button>
                        <CartTrigger>
                            <Icon name="shopping-cart" />
                        </CartTrigger>
                    </div>
                </div>
                <div className={classes.searchBlock}>
                    <input
                        className={classes.searchInput}
                        type="text"
                        placeholder="I'm looking for..."
                    />
                </div>
            </header>
        );
    }
}

export default classify(defaultClasses)(Header);
