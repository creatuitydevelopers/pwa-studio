import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import classify from 'src/classify';
import getQueryParameterValue from 'src/util/getQueryParameterValue';

import { setCurrentPage, setPrevPageTotal } from 'src/actions/upcomingEvents';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import { EventList } from 'src/components/Events';
import { SORT_DEFAULT } from 'src/components/Events/consts';
import Pagination from 'src/components/Pagination';

import defaultClasses from "./events.css";

const searchQuery = gql`
    query($currentPage: Int!, $pageSize: Int!) {
        upcomingEvents(currentPage: $currentPage, pageSize: $pageSize) {
            page_info{
                page_size
                current_page
            }
            total_count
            items{
                id
                name
                date_start
                date_end
                description
                stores
                attachments{
                    attachment_type
                    file
                }
            }
        }
        
    }
`;

export class EventsPage extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            pagination: string
        }),
        history: object,
        location: object,
        match: object
    };

    state = {
        sort: SORT_DEFAULT
    };

    handleSortChange = sort => {
        this.setState({ sort });
    };

    getSortedItems = items => {
        return items.sort((a, b) => {
            const { sort } = this.state;

            if (sort == SORT_DEFAULT) {
                return new Date(b[sort]) - new Date(a[sort]);
            }
            return a[sort].localeCompare(b[sort]);
        });
    };

    getPreparedItems = items => {
        const {currentPage, pageSize} = this.props;
        return items.slice(((currentPage - 1) * pageSize),(currentPage * pageSize));
    }

    render() {
        const {
            classes,
            currentStore,
            currentPage,
            prevPageTotal,
            pageSize,
            location,
            setCurrentPage,
            setPrevPageTotal
        } = this.props;

        const pageControl = {
            currentPage: currentPage,
            setPage: setCurrentPage,
            updateTotalPages: setPrevPageTotal,
            totalPages: prevPageTotal
        };

        const paramStore = parseInt(
            getQueryParameterValue({
                location,
                queryParameter: 'store'
            })
        );

        const storeNumber = !!paramStore ? paramStore : (!!currentStore ? Number.parseInt(currentStore.store_number): false);

        return (
            <Query query={searchQuery} variables={{ currentPage: 1, pageSize: 99 }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return loadingIndicator;

                    const items = !!storeNumber
                        ? data.upcomingEvents.items.filter(item =>
                              item.stores.includes(storeNumber)
                          )
                        : data.upcomingEvents.items;

                    const totalPageControlWrapper = {
                        ...pageControl,
                        totalPages: Math.ceil(
                            items.length / Number(pageSize)
                        )
                    };

                    return (
                            <div>
                                <EventList
                                    items={this.getPreparedItems(this.getSortedItems(items))}
                                    totalItems={this.getSortedItems(items)}
                                    storeNumber={storeNumber}
                                    defaultSort={SORT_DEFAULT}
                                    handleSortChange={this.handleSortChange} />
                                <div className={classes.pagination}>
                                    <Pagination pageControl={totalPageControlWrapper}/>
                                </div>
                            </div>
                    );
                }}
            </Query>
        );
    }
}

const mapStateToProps = ({ upcomingEvents, store }) => {
    return {
        currentPage: upcomingEvents.currentPage,
        pageSize: upcomingEvents.pageSize,
        prevPageTotal: upcomingEvents.prevPageTotal,
        currentStore: store.currentStore
    };
};
const mapDispatchToProps = { setCurrentPage, setPrevPageTotal };

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(EventsPage);
