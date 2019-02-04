import React, { Component } from 'react';
import CategoryList from 'src/components/CategoryList';
import classify from 'src/classify';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { loadingIndicator } from 'src/components/LoadingIndicator';

const cmsPageQuery = gql`
    query cmsPage($id: Int!) {
        cmsPage(id: $id) {
            content
            url_key
            page_layout
            title
        }
    }
`;

export default class CMS extends Component {
    render() {
        const { id } = this.props;

        return (
            <Query query={cmsPageQuery} variables={{ id: Number(id) }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return loadingIndicator;

                    const {
                        cmsPage: { content }
                    } = data;

                    return (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    );
                }}
            </Query>
        );
    }
}
