import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import '../../globals.global.css';
import Homepage from './Homepage.js';

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

class CMS extends Component {
    render() {
        const { id } = this.props;

        if(id == 8) {
            return (
                <div dangerouslySetInnerHTML={{ __html: Homepage }} />
            )
        }

        return (
            <Query query={cmsPageQuery} variables={{ id: Number(id) }}>
                {({ loading, error, data }) => {
                    window.scrollTo(0, 0);
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

export default CMS;