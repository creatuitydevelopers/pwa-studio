import React from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import productQuery from 'src/queries/getProductDetail.graphql';
import urlResolver from 'src/queries/urlResolver.graphql';



class anyComponent extends React.Component {
    state = {
        fetchStarted: false,
        results: null,
    }

    onMouseEnter = async () => {
        const {fetchStarted} = this.state;
        if(!fetchStarted) {
            this.setState({fetchStarted: true})
            const {client, urlKey} = this.props;
            fetch(`/${urlKey}.html`);
            await client.query({query: urlResolver, fetchPolicy: 'cache-first', variables: {urlKey: `/${urlKey}.html`,}});
            await client.query({query: productQuery, fetchPolicy: 'cache-first', variables: {urlKey: urlKey, onServer: false}});
        }
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
 export default withApollo(anyComponent);