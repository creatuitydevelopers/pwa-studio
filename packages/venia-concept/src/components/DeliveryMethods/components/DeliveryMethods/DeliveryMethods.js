import React, { Component } from 'react';
import { func, object, shape, string, oneOf, number } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';
import DeliveryMethodsList from 'src/components/DeliveryMethods/components/DeliveryMethodsList';
import { isStsMethod, isCurrentStoreEnabledForSts, isDeliveryMethodValid } from 'src/models/DeliveryMethods';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const searchQuery = gql`
    query($sku: String) {
        deliveryMethods(sku: $sku) {
            method
            delivery_options {
                name
                value
            }
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
        productSku: string.isRequired,
        onChange: func.isRequired,
        viewMode: oneOf(['product-page', 'cart'])
    };

    static defaultProps = {
        viewMode: 'product-page'
    };

    async componentDidUpdate(prevProps) {
        const {currentStore, onChange} = this.props;

        if (!!prevProps.currentStore && !!currentStore && prevProps.currentStore.store_number != currentStore.store_number) {
            onChange(null, null);
        }
    };

    render() {
        const {
            defaultMethod,
            productSku,
            currentStore,
            selectedStore,
            validationMessage,
            onChange,
            classes,
            viewMode
        } = this.props;
        const store = !!selectedStore ? selectedStore : currentStore;

        return (
            <section className={classes.root}>
                <h2 className={classes.header}>
                    <span>Delivery Methods</span>
                </h2>
                <Query query={searchQuery} variables={{ sku: productSku }}>
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
                        const methods = data.deliveryMethods;

                        if (methods.length > 0 && !defaultMethod) {
                            methods.every(method => {
                                if(isStsMethod(method.method) && !isCurrentStoreEnabledForSts(method.stores, store)) return true;
                                if (!isDeliveryMethodValid(method.method, store)) return true;

                                onChange(method.method, store);
                                return false;
                            });
                        }

                        return (
                            <DeliveryMethodsList
                                viewMode={viewMode}
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
