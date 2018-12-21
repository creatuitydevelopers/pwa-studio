import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import {Link} from 'react-router-dom';

export default class CMS extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to={`/storelocator`}>Store Locator Page</Link>
                <CategoryList title="Shop by category" id={2} />
            </React.Fragment>
        );
    }
}
