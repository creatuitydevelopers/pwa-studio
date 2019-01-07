import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import getQueryParameterValue from '../../util/getQueryParameterValue';

import {EventList} from "src/components/Events";
import classify from 'src/classify';

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

export class Events extends Component {
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
        const { classes, location } = this.props;
        console.log(this.props);
        const userInput = getQueryParameterValue({
            location,
            queryParameter: 'query'
        });

        return (
            <Query query={searchQuery} variables={{ id: null }}>
                {({ loading, error, data }) => {
                    console.log(loading, error, data);

                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return <div>Fetching Data</div>;

                    if (data.upcomingEvents.length === 0) {
                        return (
                            <div>
                                No results found!
                            </div>
                        );
                    }

                    return (
                           <EventList items={data.upcomingEvents}/>
                    );
                }}
            </Query>
        );
    }
}

export default Events;
