import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setCurrentStore } from 'src/actions/store';
import gql from 'graphql-tag';
import { DetailsPage } from 'src/components/RkStore';
import getUrlKey from 'src/util/getUrlKey';

const query = gql`
    query storeLocator($urlKey: String){
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
            zipcode
            baseimage
            rewrite_request_path
            tags
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
        }
    }

    render() {
        const {currentStore, setCurrentStore} = this.props;

        return (
            <Query
                query={query}
                variables={{ urlKey: getUrlKey() }}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return <div>Fetching Data</div>;

                    const store = data.storeLocator[0];
                    
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