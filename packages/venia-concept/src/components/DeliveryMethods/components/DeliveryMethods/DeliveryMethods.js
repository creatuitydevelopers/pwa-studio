import React, { Component } from 'react';
import { func, object, shape, string } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';
import DeliveryMethodsList from 'src/components/DeliveryMethods/components/DeliveryMethodsList';
import { isDeliveryMethodValid } from 'src/models/DeliveryMethods';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const searchQuery = gql`
    query($id: Int) {
        inStorePickupAvailability(product_id: $id) {
            method
            stores {
                store_number
                inventory_level
            }
        }
    }
`;

class DeliveryMethods extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string
        }),
        defaultMethod: string,
        selectedStore: object,
        validationMessage: string,
        product: object.isRequired,
        onChange: func.isRequired
    };

    render() {
        const {
            defaultMethod,
            product,
            currentStore,
            selectedStore,
            validationMessage,
            onChange,
            classes
        } = this.props;
        const store = !!selectedStore ? selectedStore : currentStore;

        return (
            <section className={classes.root}>
                <h2 className={classes.header}>
                    <span>Delivery Methods</span>
                </h2>
                <Query query={searchQuery} variables={{ id: product.id }}>
                    {({ loading, error, data }) => {
                        if (error)
                            return (
                                <div>
                                    Something went wrong. Please refresh page.
                                </div>
                            );
                        if (loading)
                            return (
                                <DeliveryMethodsList
                                    methods={Array.from({ length: 1 }).fill(
                                        null
                                    )}
                                />
                            );

                        const methods = data.inStorePickupAvailability;

                        if (methods.length > 0 && !defaultMethod) {
                            methods.every(method => {
                                if (
                                    isDeliveryMethodValid(method.method, store)
                                ) {
                                    onChange(method.method, store);
                                    return false;
                                }

                                return true;
                            });
                        }

                        return (
                            <DeliveryMethodsList
                                methods={methods}
                                defaultMethod={defaultMethod}
                                selectedStore={store}
                                onChange={onChange}
                            />
                        );
                    }}
                </Query>
                {!!validationMessage && (
                    <p className={classes.validationMessage}>
                        {validationMessage}
                    </p>
                )}
            </section>
        );
    }
}

export default classify(defaultClasses)(DeliveryMethods);
