import React from 'react';
import {withApollo} from 'react-apollo';
import urlResolver from 'src/queries/urlResolver.graphql'
import resolveUnknownRoute from '@magento/peregrine/dist/Router/resolveUnknownRoute';

import gql from 'graphql-tag';
import productQuery from 'src/queries/getProductDetail.graphql';

import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloConsumer } from 'react-apollo';


class Prefetcher extends React.Component {
    state = {
        fetchStarted: false,
        results: null,
    }

    fetchOnIdle = () => {
        const {urlKey, client} = this.props;

        resolveUnknownRoute({route: `/${urlKey}.html`, apiBase: new URL('/graphql', location.origin).toString()})
            .then(data => {
                    try {
                        client.readQuery({ query: productQuery, variables: {urlKey: urlKey, onServer: false}});
                    } catch (e) {
                        client.query({query: productQuery, fetchPolicy: 'cache-first', variables: {urlKey: urlKey, onServer: false}});
                    }
            });
    }

    componentDidMount() {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(this.fetchOnIdle);
        }
        
    }

    componentWillUnmount() {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(this.fetchOnIdle);
        }
    }

    render() {
        const {children, urlKey, ...rest} = this.props;

        return (
            <div {...rest} >
                {children}
            </div>
        )
    }
 }
 export default withApollo(Prefetcher);