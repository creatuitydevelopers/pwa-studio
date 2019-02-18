import React, { Component, Suspense } from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Form } from 'informed';

import classify from 'src/classify';
import Button from 'src/components/Button';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import Carousel from 'src/components/ProductImageCarousel';
import Quantity from 'src/components/ProductQuantity';
import RichText from 'src/components/RichText';
import DeliveryMethods from 'src/components/DeliveryMethods';
import {PriceWrapper} from 'src/components/RkStore';
import { SingleRating } from 'src/components/Review';

import { isDeliveryMethodValid } from 'src/models/DeliveryMethods';

import defaultClasses from './productFullDetail.css';
import appendOptionsToPayload from 'src/util/appendOptionsToPayload';

const Options = React.lazy(() => import('../ProductOptions'));

class ProductFullDetail extends Component {
    static propTypes = {
        classes: shape({
            cartActions: string,
            description: string,
            descriptionTitle: string,
            details: string,
            detailsTitle: string,
            imageCarousel: string,
            options: string,
            productName: string,
            productPrice: string,
            quantity: string,
            quantityTitle: string,
            root: string,
            title: string
        }),
        product: shape({
            id: number,
            sku: string.isRequired,
            price: shape({
                regularPrice: shape({
                    amount: shape({
                        currency: string.isRequired,
                        value: number.isRequired
                    })
                }).isRequired
            }).isRequired,
            media_gallery_entries: arrayOf(
                shape({
                    label: string,
                    position: number,
                    disabled: bool,
                    file: string.isRequired
                })
            ),
            description: string
        }).isRequired,
        addToCart: func.isRequired
    };

    static getDerivedStateFromProps(props, state) {
        const { configurable_options } = props.product;
        const optionCodes = new Map(state.optionCodes);

        // if this is a simple product, do nothing
        if (!Array.isArray(configurable_options)) {
            return null;
        }

        // otherwise, cache attribute codes to avoid lookup cost later
        for (const option of configurable_options) {
            optionCodes.set(option.attribute_id, option.attribute_code);
        }

        return { optionCodes };
    }

    state = {
        optionCodes: new Map(),
        optionSelections: new Map(),
        quantity: 1,
        deliveryMethodType: null,
        deliveryMethodStore: null,
        deliveryMethodValidationMessage: ''
    };

    setQuantity = quantity => this.setState({ quantity });

    setDeliveryMethod = (type, store) => {
        this.setState({
            deliveryMethodType: type,
            deliveryMethodStore: store,
            deliveryMethodValidationMessage: ''
        });
    };

    addToCart = () => {
        const { props, state } = this;
        const { optionSelections, quantity, optionCodes } = state;
        const { addToCart, product } = props;
        const { configurable_options } = product;
        const isConfigurable = Array.isArray(configurable_options);
        const productType = isConfigurable
            ? 'ConfigurableProduct'
            : 'SimpleProduct';

        const payload = {
            item: product,
            productType,
            product: product.id,
            quantity,
            delivery_method: {
                type: state.deliveryMethodType,
                store: state.deliveryMethodStore
            }
        };

        if (
            !isDeliveryMethodValid(
                state.deliveryMethodType,
                state.deliveryMethodStore
            )
        ) {
            this.setState({
                deliveryMethodValidationMessage:
                    'Please select delivery method first'
            });
            return;
        }

        if (productType === 'ConfigurableProduct') {
            appendOptionsToPayload(payload, optionSelections, optionCodes);
        }

        addToCart(payload);
    };

    handleSelectionChange = (optionId, selection) => {
        this.setState(({ optionSelections }) => ({
            optionSelections: new Map(optionSelections).set(
                optionId,
                Array.from(selection).pop()
            )
        }));
    };

    get fallback() {
        return loadingIndicator;
    }

    get productOptions() {
        const { fallback, handleSelectionChange, props } = this;
        const { configurable_options } = props.product;
        const isConfigurable = Array.isArray(configurable_options);

        if (!isConfigurable) {
            return null;
        }

        return (
            <Suspense fallback={fallback}>
                <Options
                    options={configurable_options}
                    onSelectionChange={handleSelectionChange}
                />
            </Suspense>
        );
    }

    render() {
        const { productOptions, props } = this;
        const { classes, product } = props;

        return (
            <Form className={classes.root}>
                <section className={classes.title}>
                    <h1 className={classes.productName}>
                        <strong>{product.name}</strong>
                    </h1>
                    <div className={classes.productPrice}>
                        <PriceWrapper product={product}/>
                    </div>
                    <div className={classes.productRating}>
                        <SingleRating item={product} />
                        <strong className={classes.productSku}>{`SKU`}: {product.sku}</strong>
                    </div>
                </section>
                <section className={classes.imageCarousel}>
                    <Carousel images={product.media_gallery_entries} />
                </section>
                <section className={classes.options}>{productOptions}</section>
                <DeliveryMethods
                    product={product}
                    defaultMethod={this.state.deliveryMethodType}
                    selectedStore={this.state.deliveryMethodStore}
                    validationMessage={
                        this.state.deliveryMethodValidationMessage
                    }
                    onChange={this.setDeliveryMethod}
                />
                <section className={classes.quantity}>
                    <h2 className={classes.quantityTitle}>
                        <span>Quantity</span>
                    </h2>
                    <Quantity
                        initialValue={this.state.quantity}
                        onValueChange={this.setQuantity}
                    />
                </section>
                <section className={classes.cartActions}>
                    <Button priority="high" size="big" onClick={this.addToCart}>
                        <span>Add to Cart</span>
                    </Button>
                </section>
                <section className={classes.description}>
                    <h2 className={classes.descriptionTitle}>
                        <span>Details</span>
                    </h2>
                    <RichText content={product.description} />
                </section>
            </Form>
        );
    }
}

export default classify(defaultClasses)(ProductFullDetail);
