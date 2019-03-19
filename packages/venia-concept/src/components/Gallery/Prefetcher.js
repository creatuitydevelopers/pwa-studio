import React from 'react';
import {withApollo} from 'react-apollo';
import resolveUnknownRoute from '@magento/peregrine/dist/Router/resolveUnknownRoute';
import productQuery from 'src/queries/getProductDetail.graphql';

const mouseTresholdTimout = 300;

class Prefetcher extends React.Component {

    fetchOnIdle = () => {
        const {urlKey, client} = this.props;

        resolveUnknownRoute({
            route: `/${urlKey}.html`, 
            apiBase: new URL('/graphql', location.origin).toString()
        }).then(() => {
            try {
                client.readQuery({ 
                    query: productQuery, 
                    variables: {
                        urlKey: urlKey, 
                        onServer: false
                    }
                });
            } catch (e) {
                client.query({
                    query: productQuery, 
                    fetchPolicy: 'cache-first', 
                    variables: {
                        urlKey: urlKey, 
                        onServer: false
                    }
                });
            }
        });
    }

    componentWillUnmount() {
        clearTimeout(this.fetchTimeout);
        if ('cancelIdleCallback' in window) {
            window.cancelIdleCallback(this.fetchCallback);
        }
    }

    onMouseEnter = () => {
        if ('requestIdleCallback' in window) {
            this.fetchTimeout = setTimeout(() => {
                this.fetchCallback = window.requestIdleCallback(this.fetchOnIdle);
            },mouseTresholdTimout)
        }
    }

    onMouseLeave = () => {
        clearTimeout(this.fetchTimeout);
    }

    render() {
        const {props: {
            children, 
            urlKey, 
            ...rest
        }, onMouseEnter, onMouseLeave} = this;

        return (
            <div 
                onMouseEnter={onMouseEnter} 
                onMouseLeave={onMouseLeave}
                {...rest} 
            >
                {children}
            </div>
        )
    }
 }
 export default withApollo(Prefetcher);