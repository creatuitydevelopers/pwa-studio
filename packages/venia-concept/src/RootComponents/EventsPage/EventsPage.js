import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getQueryParameterValue from 'src/util/getQueryParameterValue';

import {EventList} from "src/components/Events";

const searchQuery = gql`
    query($id: Int) {
        upcomingEvents(id: $id) {
            event{
                id
                name
                date_start
                date_end
                description
            }   
            attachments {
                attachment_type
                file
            }
            stores
        }
    }
`;

export class EventsPage extends Component {
    static propTypes = {
        classes: shape({
            noResult: string,
            root: string,
            totalPages: string
        }),
        history: object,
        location: object.isRequired,
        match: object
    };

    render() {
        const { location } = this.props;
        const storeNumber = parseInt(getQueryParameterValue({
            location,
            queryParameter: 'store'
        }));

        return (
            <Query query={searchQuery} variables={{ id: null }}>
                {({ loading, error, data }) => {

                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return <div>Fetching Data</div>;

                    const items = !!storeNumber ? data.upcomingEvents.filter(item => item.stores.includes(storeNumber)) : data.upcomingEvents;

                    if (items.length === 0) {
                        return (<div>No results found!</div>);
                    }

                    return (<EventList items={items} storeNumber={storeNumber}/>);
                }}
            </Query>
        );
    }
}

export default EventsPage;
