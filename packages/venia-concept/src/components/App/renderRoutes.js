import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Page } from '@magento/peregrine';
import ErrorView from 'src/components/ErrorView/index';
import CreateAccountPage from 'src/components/CreateAccountPage/index';
import StoreLocator from 'src/components/StoreLocator';
import Search from 'src/RootComponents/Search';
import EventsPage from 'src/RootComponents/EventsPage';
import Rebates from 'src/RootComponents/Rebates';

const renderRoutingError = props => <ErrorView {...props} />;

const renderRoutes = () => (
    <Switch>
        <Route exact path="/search.html" component={Search} />
        <Route exact path="/create-account" component={CreateAccountPage} />
        <Route exact path="/storelocator" component={StoreLocator} />
        <Route exact path="/events" component={EventsPage} />
        <Route exact path="/rebates" component={Rebates} />
        <Route render={() => <Page>{renderRoutingError}</Page>} />
    </Switch>
);

export default renderRoutes;
