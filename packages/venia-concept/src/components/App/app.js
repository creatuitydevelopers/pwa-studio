import React, { Component, Fragment } from 'react';
import { bool, func, shape, string } from 'prop-types';

import Main from 'src/components/Main';
import Mask from 'src/components/Mask';
import { Helmet } from 'react-helmet';
import MiniCart from 'src/components/MiniCart';
import Navigation from 'src/components/Navigation';
import StoreWidget from 'src/components/StoreWidget';
import OnlineIndicator from 'src/components/OnlineIndicator';
import renderRoutes from './renderRoutes';

class App extends Component {
    static propTypes = {
        app: shape({
            drawer: string,
            overlay: bool.isRequired
        }).isRequired,
        closeDrawer: func.isRequired
    };

    get onlineIndicator() {
        const { app } = this.props;
        const { hasBeenOffline, isOnline } = app;

        // Only show online indicator when
        // online after being offline
        return hasBeenOffline ? <OnlineIndicator isOnline={isOnline} /> : null;
    }

    render() {
        const { app, closeDrawer } = this.props;
        const { onlineIndicator } = this;
        const { drawer, overlay } = app;
        const navIsOpen = drawer === 'nav';
        const cartIsOpen = drawer === 'cart';
        const storeWidgetIsOpen = drawer === 'storeWidget';

        return (
            <Fragment>
                <Helmet>
                    <link rel="stylesheet" href="https://use.typekit.net/uca6omh.css" />
                    <link rel="stylesheet" type="text/css" media="all" href="https://pwa-files.preview2.creatuity.com/bluefoot.min.css" />
                    <link rel="stylesheet" type="text/css" media="all" href="https://pwa-files.preview2.creatuity.com/pageBuilderAndCms-mobile.min.css" />
                    <link rel="stylesheet" type="text/css" media="screen and (min-width: 768px)" href="https://pwa-files.preview2.creatuity.com/pageBuilderAndCms-desktop.min.css" />
                </Helmet>
                <Main isMasked={overlay}>
                    {onlineIndicator}
                    {renderRoutes()}
                </Main>
                <Mask isActive={overlay} dismiss={closeDrawer} />
                <Navigation isOpen={navIsOpen} />
                <MiniCart isOpen={cartIsOpen} />
                <StoreWidget isOpen={storeWidgetIsOpen} />
            </Fragment>
        );
    }
}

export default App;
