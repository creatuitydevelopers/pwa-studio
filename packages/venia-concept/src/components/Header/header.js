import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

import classify from 'src/classify';
import Icon from 'src/components/Icon';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import StoreWidgetTrigger from './storeWidgetTrigger';
import defaultClasses from './header.css';
import logo from './logo.png';
import { StoreWidgetHeaderLabel } from 'src/components/StoreWidget';

import SearchTrigger from './searchTrigger';
const SearchBar = React.lazy(() => import('src/components/SearchBar'));

class Header extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            logo: PropTypes.string,
            primaryActions: PropTypes.string,
            root: PropTypes.string,
            open: PropTypes.string,
            closed: PropTypes.string,
            secondaryActions: PropTypes.string,
            toolbar: PropTypes.string
        }),
        searchOpen: PropTypes.bool,
        toggleSearch: PropTypes.func.isRequired
    };

    get searchIcon() {
        return <Icon name="search" />;
    }

    render() {
        const { searchOpen, classes, toggleSearch } = this.props;

        const rootClass = searchOpen ? classes.open : classes.closed;

        return (
            <header className={rootClass}>
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
                            <StoreWidgetHeaderLabel />
                        </StoreWidgetTrigger>
                        <SearchTrigger
                            searchOpen={searchOpen}
                            toggleSearch={toggleSearch}
                        >
                            {this.searchIcon}
                        </SearchTrigger>
                        <CartTrigger>
                            <Icon name="shopping-cart" />
                        </CartTrigger>
                    </div>
                </div>
                <Suspense fallback={this.searchIcon}>
                    <Route
                        render={({ history, location }) => (
                            <SearchBar
                                isOpen={searchOpen}
                                history={history}
                                location={location}
                            />
                        )}
                    />
                </Suspense>
            </header>
        );
    }
}

export default classify(defaultClasses)(Header);
