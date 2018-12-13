import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import StoreLocator from '../../components/StoreLocator/StoreLocator';


export default class CMS extends Component {
    render() {
        return  <StoreLocator />
        // return <CategoryList title="Shop by category" id={2} />;
    }
}
