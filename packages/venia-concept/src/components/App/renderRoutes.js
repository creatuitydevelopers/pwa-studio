import React, {Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';
import { Page } from '@magento/peregrine';
import ErrorView from 'src/components/ErrorView/index';
import CreateAccountPage from 'src/components/CreateAccountPage/index';
import Search from 'src/RootComponents/Search';
import { loadingIndicator } from 'src/components/LoadingIndicator';

const renderRoutingError = props => <ErrorView {...props} />;

const Weeklyad = React.lazy(() => import('src/components/Weeklyad'));
const Rebates = React.lazy(() => import('src/components/Rebates'));
const Events = React.lazy(() => import('src/components/Events'));
const EditCartItem = React.lazy(() => import('src/components/EditCartItem'));
const StoreLocator = React.lazy(() => import('src/components/StoreLocator'));


const renderRoutes = () => (
    <Switch>
        <Route exact path="/search.html" component={Search} />
        <Route exact path="/create-account" component={CreateAccountPage} />
        <Route exact path="/storelocator" render={() => {
            return (
                <Suspense fallback={loadingIndicator}>
                    <StoreLocator />
                </Suspense>
            )
        }} />
        <Route path="/edit-cart-item/:cartItem" component={() => {
            return (
                <Suspense fallback={loadingIndicator}>
                    <EditCartItem />
                </Suspense>
            )
        }} />

        <Route exact path="/events" component={() => {
            return (
                <Suspense fallback={loadingIndicator}>
                    <Events />
                </Suspense>
            )
        }} />
        <Route exact path="/rebates" component={() => {
             return (
                <Suspense fallback={loadingIndicator}>
                    <Rebates />
                </Suspense>
            )
        }} />
        <Route exact path="/weeklyad" component={() => {
            return (
                <Suspense fallback={loadingIndicator}>
                    <Weeklyad />
                </Suspense>
            )
        }} />
        <Route render={() => <Page>{renderRoutingError}</Page>} />
    </Switch>
);

export default renderRoutes;
