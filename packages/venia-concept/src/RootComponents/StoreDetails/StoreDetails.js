import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import { setCurrentStore } from 'src/actions/store';
import gql from 'graphql-tag';
import { DetailsPage } from 'src/components/RkStore';
import getUrlKey from 'src/util/getUrlKey';

const query = gql`
    query storeLocator($urlKey: String) {
        storeLocator(rewrite_request_path: $urlKey) {
            storelocator_id
            store_number
            latitude
            longitude
            address
            city
            store_manager
            state
            phone
            email
            zipcode
            baseimage
            rewrite_request_path
            tags {
                tag_name
                tag_icon
            }
            specialdays {
                specialday_id
                time_open
                date_from
                date_to
            }
            upcoming_events {
                month
                day
                day_name
                time_start
                time_end
                description
                name
                link
            }
            holidays {
                holiday_id
                holiday_name
                holiday_comment
                date_from
                date_to
            }
            schedule {
                day
                open
                close
            }
        }
    }
`;

class StoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStore: props.currentStore
        };
    }

    render() {
        const { currentStore, setCurrentStore } = this.props;

        return (
            <Query query={query} variables={{ urlKey: getUrlKey() }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return loadingIndicator;

                    const store = data.storeLocator[0];
                    console.log(store);
                    return (
                        <DetailsPage
                            store={store}
                            currentStore={currentStore}
                            setCurrentStore={setCurrentStore}
                        />
                    );
                }}
            </Query>
        );
    }
}

const mapStateToProps = ({ store }) => {
    const { currentStore } = store;

    return {
        currentStore
    };
};

const mapDispatchToProps = {
    setCurrentStore
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(StoreDetails);
