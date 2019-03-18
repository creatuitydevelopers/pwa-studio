import React from 'react';
import {withApollo} from 'react-apollo';
import urlResolver from 'src/queries/urlResolver.graphql'
import resolveUnknownRoute from '@magento/peregrine/dist/Router/resolveUnknownRoute';

import gql from 'graphql-tag';
import productQuery from 'src/queries/getProductDetail.graphql';


class Prefetcher extends React.Component {
    state = {
        fetchStarted: false,
        results: null,
    }

    fetchOnIdle = () => {
        const {urlKey, client} = this.props;
        resolveUnknownRoute({route: `/${urlKey}.html`, apiBase: new URL('/graphql', location.origin).toString() })
            .then(data => {
                client.query({query: productQuery, fetchPolicy: 'cache-first', variables: {urlKey: urlKey, onServer: false}});
            });
    }

    componentDidMount() {
        window.requestIdleCallback(this.fetchOnIdle, {timeout:3000 });
    }

    componentWillUnmount() {
        window.requestIdleCallback(this.fetchOnIdle);
    }

    onMouseEnter = () => {
        // const {urlKey, client} = this.props;
        // resolveUnknownRoute({route: `/${urlKey}.html`, apiBase: new URL('/graphql', location.origin).toString() })
        //     .then(data => {
        //         console.log(data);
        //     });
        // client.query({query: productQuery, fetchPolicy: 'cache-first', variables: {urlKey: urlKey, onServer: false}});
    }

    render() {
        const {children, urlKey, ...rest} = this.props;
        return (
            <div {...rest} onMouseEnter={this.onMouseEnter}>
                {children}
            </div>
        )
    }
 }
 export default withApollo(Prefetcher);