import React, {Component} from 'react';
import {func, object, shape, string, oneOf} from 'prop-types';
import classify from 'src/classify';

import {withApollo} from 'react-apollo';
import gql from 'graphql-tag';

import DeliveryMethodsList from 'src/components/DeliveryMethods/components/DeliveryMethodsList';
import {isStsMethod, isCurrentStoreEnabledForSts, isDeliveryMethodValid} from 'src/models/DeliveryMethods';

import defaultClasses from './deliveryMethods.css';


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

    state = {
        errors: false,
        loading: true,
        methods: []
    };

    async componentDidMount() {
        const {client, defaultMethod, onChange, selectedStore, currentStore, productSku} = this.props;

        client.query({
            query: searchQuery,
            variables: {
                sku: productSku
            }
        }).then((response) => {
            const store = !!selectedStore ? selectedStore : currentStore;
            const methods = response.data.deliveryMethods;

            if (methods.length > 0 && !defaultMethod) {
                methods.every(method => {
                    if (isStsMethod(method.method) && !isCurrentStoreEnabledForSts(method.stores, store)) return true;
                    if (!isDeliveryMethodValid(method.method, store)) return true;

                    onChange(method.method, store);
                    return false;
                });
            }

            this.setState({
                methods,
                loading: response.loading,
                error: false
            })
        }).catch((error) =>{
            this.setState({
                error: !!error
            });
        });
    }

    async componentDidUpdate(prevProps) {
        const {currentStore, onChange} = this.props;

        if (!!prevProps.currentStore && !!currentStore && prevProps.currentStore.store_number !== currentStore.store_number) {
            onChange(null, null);
        }
    };

    get content(){
        const {
            currentStore,
            defaultMethod,
            onChange,
            productSku,
            selectedStore,
            viewMode
        } = this.props;

        const {loading, methods, error} = this.state;

        if(!!error) return <div>Something went wrong. Please refresh page.</div>;
        if(!!loading) return <DeliveryMethodsList methods={Array.from({length: 1}).fill(null)}/>;

        //Temporary, until checkout process on backend size would resolve problem with one product with multi delivery methods
        // const methods = response.data.deliveryMethods;
        const filteredMethods = methods.filter((method) => {
            const cartItems = this.props.cart.details.items;

            if (typeof cartItems === 'undefined' || cartItems.length === 0) return true;

            const productItems =  cartItems.filter((item) => item.sku === productSku);

            if(!productItems.length) return true;

            return productItems.some((item) => method.method === item.extension_attributes.delivery_method);
        });

        return <DeliveryMethodsList
            viewMode={viewMode}
            methods={filteredMethods}
            defaultMethod={defaultMethod}
            selectedStore={!!selectedStore ? selectedStore : currentStore}
            onChange={onChange}
        />
    }


    render() {
        const { validationMessage, classes } = this.props;

        return (
            <section className={classes.root}>
                <h2 className={classes.header}>
                    <span>Delivery Methods</span>
                </h2>
                {this.content}
                {!!validationMessage && <p className={classes.validationMessage}>{validationMessage}</p>}
            </section>
        );
    }
}

export default withApollo(classify(defaultClasses)(DeliveryMethods));
