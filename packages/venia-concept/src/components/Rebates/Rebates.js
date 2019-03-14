import React, { Component } from 'react';
import { object, shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classify from 'src/classify';

import { setCurrentPage, setPrevPageTotal } from 'src/actions/rebates';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import { RebateList } from 'src/components/Rebates';
import Pagination from 'src/components/Pagination';
import defaultClasses from './rebates.css';

const searchQuery = gql`
    query($currentPage: Int!, $pageSize: Int!) {
        manufacturerRebates(currentPage: $currentPage, pageSize: $pageSize) {
            page_info {
                page_size
                current_page
            }
            total_count
            items {
                id
                title
                description
                start_date
                expiration_date
                image
                rebate_form
                conditions
            }
        }
    }
`;

class Rebates extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            pagination: string
        }),
        history: object,
        location: object,
        match: object
    };

    render() {
        const {
            classes,
            currentPage,
            prevPageTotal,
            pageSize,
            setCurrentPage,
            setPrevPageTotal
        } = this.props;

        const pageControl = {
            currentPage: currentPage,
            setPage: setCurrentPage,
            updateTotalPages: setPrevPageTotal,
            totalPages: prevPageTotal
        };

        return (
            <Query query={searchQuery} variables={{ currentPage, pageSize }}>
                {({ loading, error, data }) => {
                    const result = data.manufacturerRebates;

                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return loadingIndicator;

                    if (result.items.length === 0) {
                        return <div>No results found!</div>;
                    }

                    const totalPageControlWrapper = {
                        ...pageControl,
                        totalPages: Math.ceil(
                            result.total_count / Number(pageSize)
                        )
                    };

                    return (
                        <div>
                            <RebateList
                                items={result.items}
                                pageSize={Number(pageSize)}
                            />
                            <div className={classes.pagination}>
                                <Pagination
                                    pageControl={totalPageControlWrapper}
                                />
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

const mapStateToProps = ({ rebates }) => {
    return {
        currentPage: rebates.currentPage,
        pageSize: rebates.pageSize,
        prevPageTotal: rebates.prevPageTotal
    };
};
const mapDispatchToProps = { setCurrentPage, setPrevPageTotal };

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Rebates);
