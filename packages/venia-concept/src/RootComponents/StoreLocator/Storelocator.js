import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getUrlKey from 'src/util/getUrlKey';
import StoreLocator from 'src/components/StoreLocator';


const queryStore = gql`
    query storeLocator($id: Int) {
        storeLocator(id: $id){
                storelocator_id,
                address,
                baseimage,
                latitude,
                longitude,
                tags
        }
    }
`;

export default class Storelocator extends Component {
    render() {
        return (
           <p>Store Locator Root Component</p>
        );
    }
}
