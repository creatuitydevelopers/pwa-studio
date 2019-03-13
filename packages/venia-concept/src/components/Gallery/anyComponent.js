import React from 'react';
import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import productQuery from 'src/queries/getProductDetail.graphql';



class anyComponent extends React.Component {
    state = {
       results: null,
    }

    // componentDidMount = async () => {
    //     const {client, urlKey} = this.props;
    //     const res = await client.query({query: productQuery, variables: {urlKey: urlKey, onServer: false}});
    //     console.log(res);
    // }

    onMouseEnter = async () => {
        const {client, urlKey} = this.props;
        const res = await client.query({query: productQuery, fetchPolicy: 'cache-first', variables: {urlKey: urlKey, onServer: false}});
        console.log(res);
    }

    render() {
        const {children, urlKey, ...rest} = this.props;
        // check if any results exist (just an example)
        return (
            <div {...rest} onMouseEnter={this.onMouseEnter}>
                {children}
            </div>
            
        )
    }
 }
 export default withApollo(anyComponent);