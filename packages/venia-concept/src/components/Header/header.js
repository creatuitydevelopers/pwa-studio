import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';

import classify from 'src/classify';
import { Link, resourceUrl, Route } from 'src/drivers';
import Icon from 'src/components/Icon';
import SearchIcon from 'react-feather/dist/icons/search';
import MenuIcon from 'react-feather/dist/icons/menu';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import StoreWidgetTrigger from './storeWidgetTrigger';
import defaultClasses from './header.css';
import logo from './logo.png';
import mapPin from 'react-feather/dist/icons/map-pin';

import SearchTrigger from './searchTrigger';
const SearchBar = React.lazy(() => import('src/components/SearchBar'));
const StoreWidgetHeaderLabel = React.lazy(() => import('src/components/StoreWidget/components/StoreWidgetHeaderLabel'));

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

    render() {
        const {
            autocompleteOpen,
            searchOpen,
            classes,
            toggleSearch
        } = this.props;

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
                            <Icon src={MenuIcon} />
                        </NavTrigger>
                    </div>
                    <div className={classes.secondaryActions}>
                        <StoreWidgetTrigger>
                            <Suspense fallback={<Icon src={mapPin} className={classes.icon} />}>
                                <StoreWidgetHeaderLabel />
                            </Suspense>
                        </StoreWidgetTrigger>
                        <SearchTrigger
                            searchOpen={searchOpen}
                            toggleSearch={toggleSearch}
                        >
                            <Icon src={SearchIcon} />
                        </SearchTrigger>
                        <CartTrigger />
                    </div>
                </div>
                <Suspense fallback={<Icon src={SearchIcon} className={classes.iconFallback} />}>
                    <Route
                        render={({ history, location }) => (
                            <SearchBar
                                autocompleteOpen={autocompleteOpen}
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
