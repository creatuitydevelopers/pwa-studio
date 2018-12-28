import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';

export default class CMS extends Component {
    render() {
        return (
            <React.Fragment>
                <CategoryList title="Shop by category" id={2} />
            </React.Fragment>
        );
    }
}
