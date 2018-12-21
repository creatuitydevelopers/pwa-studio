import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ProductFullDetail from 'src/components/ProductFullDetail';
import getUrlKey from 'src/util/getUrlKey';

const query = gql`
    query storeLocator($urlKey: String){
        storeLocator(rewrite_request_path: $urlKey) {
                storelocator_id
                store_number
                latitude
                longitude
                address
                city
                store_manager
                state
                phone
                zipcode
                baseimage
                rewrite_request_path
                tags
                schedule {
                    day
                    open
                    close
                }
        }
    }
`;

class StoreDetails extends Component {
    
    render() {
        return (
            <Query
                query={query}
                variables={{ urlKey: getUrlKey()}}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return <div>Fetching Data</div>;

                    const store = data.storeLocator[0];

                    console.log(store);

                    return (
                        <p>blablbabla</p>
                    );
                }}
            </Query>
        );
    }
}


export default StoreDetails;
