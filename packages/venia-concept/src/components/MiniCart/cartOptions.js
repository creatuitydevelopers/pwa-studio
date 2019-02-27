import React, { Component, Suspense } from 'react';
import { array, object, func, number, shape, string } from 'prop-types';
import { Form } from 'informed';
import { Price } from 'src/components/Price';

import LoadingIndicator from 'src/components/LoadingIndicator';
import classify from 'src/classify';
import defaultClasses from './cartOptions.css';
import Button from 'src/components/Button';
import Quantity from 'src/components/ProductQuantity';
import DeliveryMethods from 'src/components/DeliveryMethods';

import appendOptionsToPayload from 'src/util/appendOptionsToPayload';

// TODO: get real currencyCode for cartItem
const currencyCode = 'USD';

const Options = React.lazy(() => import('../ProductOptions'));

class CartOptions extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            focusItem: string,
            price: string,
            form: string,
            quantity: string,
            quantityTitle: string,
            save: string,
            modal: string,
            modal_active: string,
            options: string
        }),
        product: object.isRequired,
        cartItem: shape({
            item_id: number.isRequired,
            name: string.isRequired,
            price: number.isRequired,
            qty: number.isRequired
        }),
        configItem: shape({
            configurable_options: array
        }),
        updateCart: func.isRequired,
        closeOptionsDrawer: func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            optionSelections: new Map(),
            quantity: props.cartItem.qty,
            deliveryMethodType: props.cartItem.extension_attributes.delivery_method,
            deliveryMethodStore: props.allStores.filter((store) => store.store_number == props.cartItem.extension_attributes.store_number)[0],
        };
    }

    get fallback() {
        return <LoadingIndicator>Fetching Data</LoadingIndicator>;
    }

    setQuantity = quantity => this.setState({ quantity });

    setDeliveryMethod = (type, store) => {
        this.setState({
            deliveryMethodType: type,
            deliveryMethodStore: store,
        });
    };

    handleSelectionChange = (optionId, selection) => {
        this.setState(({ optionSelections }) => ({
            optionSelections: new Map(optionSelections).set(
                optionId,
                Array.from(selection).pop()
            )
        }));
    };

    handleClick = async () => {
        const { updateCart, cartItem, configItem } = this.props;
        const { optionSelections, quantity, deliveryMethodType, deliveryMethodStore } = this.state;
        const { configurable_options } = configItem;
        const isConfigurable = Array.isArray(configurable_options);

        const productType = isConfigurable
            ? 'ConfigurableProduct'
            : 'SimpleProduct';

        const payload = {
            item: isConfigurable ? configItem : cartItem,
            productType,
            quantity: quantity,
            delivery_method: {
                type: deliveryMethodType,
                store: deliveryMethodStore
            }
        };

        if (productType === 'ConfigurableProduct') {
            appendOptionsToPayload(payload, optionSelections);
        }
        updateCart(payload, cartItem.item_id);
    };

    render() {
        const { fallback, handleSelectionChange, props } = this;
        const { classes, product, cartItem, configItem, isLoading } = props;
        const { name, price } = cartItem;
        const { configurable_options } = configItem;

        const modalClass = isLoading ? classes.modal_active : classes.modal;

        const options = Array.isArray(configurable_options) ? (
            <Suspense fallback={fallback}>
                <section className={classes.options}>
                    <Options
                        options={configurable_options}
                        onSelectionChange={handleSelectionChange}
                    />
                </section>
            </Suspense>
        ) : null;

        return (
            <Form className={classes.root}>
                <div className={classes.focusItem}>
                    <span className={classes.name}>{name}</span>
                    <span className={classes.price}>
                        <Price currencyCode={currencyCode} value={price} />
                    </span>
                </div>
                <div className={classes.form}>
                    {options}
                    <DeliveryMethods
                        productSku={product.sku}
                        defaultMethod={this.state.deliveryMethodType}
                        selectedStore={this.state.deliveryMethodStore}
                        validationMessage={''}
                        viewMode={'cart'}
                        onChange={this.setDeliveryMethod}
                    />
                    <section className={classes.quantity}>
                        <h2 className={classes.quantityTitle}>
                            <span>Quantity</span>
                        </h2>
                        <Quantity
                            initialValue={props.cartItem.qty}
                            onValueChange={this.setQuantity}
                        />
                    </section>
                </div>
                <div className={classes.save}>
                    <Button onClick={this.props.closeOptionsDrawer}>
                        <span>Cancel</span>
                    </Button>
                    <Button priority="high" onClick={this.handleClick}>
                        <span>Update Cart</span>
                    </Button>
                </div>
                <div className={modalClass}>
                    <LoadingIndicator>Updating Cart</LoadingIndicator>
                </div>
            </Form>
        );
    }
}

export default classify(defaultClasses)(CartOptions);
