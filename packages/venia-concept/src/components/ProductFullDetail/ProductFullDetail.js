import React, { Component, Suspense } from 'react';
import { arrayOf, bool, func, number, shape, string } from 'prop-types';
import { Form } from 'informed';

import { resourceUrl } from 'src/drivers';
import classify from 'src/classify';
import Button from 'src/components/Button';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import ImageGallery from 'react-image-gallery';
import Quantity from 'src/components/ProductQuantity';
import RichText from 'src/components/RichText';
import DeliveryMethods from 'src/components/DeliveryMethods';
import { PriceWrapper, MoreInformation } from 'src/components/RkStore';
import { SingleRating } from 'src/components/Review';
import { Tabs, Tab} from 'src/components/Tabs';

import every from 'lodash/every';
import isEqual from 'lodash/isEqual';
import { isDeliveryMethodValid } from 'src/models/DeliveryMethods';

import defaultClasses from './productFullDetail.css';
import appendOptionsToPayload from 'src/util/appendOptionsToPayload';

import "./image-gallery.global.css";


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
            tabs: string,
            title: string
        }),
        product: shape({
            id: number,
            sku: string.isRequired,
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
        optionCodeSelection: new Map,
        quantity: 1,
        addToCardLoader: false,
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

        this.setState({
            addToCardLoader: true
        });

        if (
            !isDeliveryMethodValid(
                state.deliveryMethodType,
                state.deliveryMethodStore
            )
        ) {
            this.setState({
                addToCardLoader: false,
                deliveryMethodValidationMessage:
                    'Please select delivery method first'
            });
            return;
        }

        if (productType === 'ConfigurableProduct') {
            appendOptionsToPayload(payload, optionSelections, optionCodes);
        }

        if (this.props.cartItemId) {
            addToCart(payload, this.props.cartItemId)
                .then(() => {
                    this.setState({
                        addToCardLoader: false
                    });
                    this.props.history.goBack();
                }).catch(e => {
                    console.log(e);
                });
        } else {
            addToCart(payload)
                .then(() => {
                    this.setState({
                        addToCardLoader: false
                    });
                }).catch(e => {
                    console.log(e);
                });
        }
    };

    handleSelectionChange = (optionId, optionCode, selection) => {
        this.setState(({ optionSelections, optionCodeSelection }) => ({
            optionSelections: new Map(optionSelections).set(
                optionId,
                Array.from(selection).pop()
            ),
            optionCodeSelection: new Map(optionCodeSelection).set(
                optionCode,
                Array.from(selection).pop()
            )
        }));
    };

    hasAllOptionsSet = () => {
        return isEqual(
            Array.from(this.state.optionCodeSelection.keys()).sort(), 
            Array.from(this.state.optionCodes.values()).sort()
        );
    }

    getConfiguredProduct = () => {
        return this.props.product.variants.find(el => {
            const { product } = el;
            let matched = [];
            this.state.optionCodeSelection.forEach((val, key, map) => {
                matched.push(product[key] === val);
            })
            return every(matched, Boolean);
        }).product;
    }

    get deliveryMethods() {
        const { props } = this;
        const { product } = props;
    
        const { configurable_options } = product;
        const isConfigurable = Array.isArray(configurable_options);
        const productSku = isConfigurable && this.hasAllOptionsSet() ? this.getConfiguredProduct().sku : product.sku;

        if(isConfigurable && !this.hasAllOptionsSet()) {
            return null;
        }

        return (
            <DeliveryMethods
                productSku={productSku}
                defaultMethod={this.state.deliveryMethodType}
                selectedStore={this.state.deliveryMethodStore}
                validationMessage={
                    this.state.deliveryMethodValidationMessage
                }
                onChange={this.setDeliveryMethod}
            />
        );
    }

    get fallback() {
        return loadingIndicator;
    }

    get productOptions() {
        const { fallback, handleSelectionChange, props } = this;
        const { configurable_options, variants } = props.product;
        const isConfigurable = Array.isArray(configurable_options);
        const {optionCodeSelection, optionSelections } = this.state;

        if (!isConfigurable) {
            return null;
        }

        let configurableOptions = configurable_options.map((option) => {
            const newValues = option.values.map((value) => {
                value.disabled = false;
                return value;
            });
            option.values = newValues;
            return option;
        });

        if(optionCodeSelection.size > 0){
            const optionsToFiltr = configurable_options.filter((option) => {
                return !optionSelections.get(option.attribute_id);
            }).map((option) => option.attribute_code);

            const availableVariants = variants.filter((variant) => {
                for (var key of optionCodeSelection.keys()) {
                   if(variant.product.hasOwnProperty(key) && variant.product[key] == optionCodeSelection.get(key)){
                       return true;
                   }
                }
                return false;
            });

            configurableOptions = configurable_options.map((option) => {
                if(!optionsToFiltr.includes(option.attribute_code)){
                    return option;
                }

                const newValues = option.values.map((value) => {
                    const index = value.value_index;

                    value.disabled = availableVariants.every((variant) => {
                       return variant.product.hasOwnProperty(option.attribute_code) && variant.product[option.attribute_code] != index;
                    });

                    return value;
                });

                option.values = newValues;
                return option;
            });
        }
        return (
            <Suspense fallback={fallback}>
                <Options
                    options={configurableOptions}
                    onSelectionChange={handleSelectionChange}
                />
            </Suspense>
        );
    }

    render() {
        const { productOptions, props, deliveryMethods } = this;
        const { classes, product } = props;
        const { addToCardLoader } = this.state;
    
        const { configurable_options } = product;
        const isConfigurable = Array.isArray(configurable_options);
        const productId = isConfigurable && this.hasAllOptionsSet() ? this.getConfiguredProduct().id : product.id;

        const images = product.media_gallery_entries.map((item) => {
            return {
                original: resourceUrl(item.file, { type: 'image-product', width: 640 }),
                originalAlt: '',
                thumbnail: resourceUrl(item.file, { type: 'image-product', width: 240 }),
                thumbnailAlt: ''
            }
        });

        return (
            <Form className={classes.root}>
                <section className={classes.title}>
                    <h1 className={classes.productName}>
                        <strong>{product.name}</strong>
                    </h1>
                    <div className={classes.productPrice}>
                        <PriceWrapper productId={productId} placeholderStyle={{minHeight: '58px'}} />
                    </div>
                    <div className={classes.productRating}>
                        <SingleRating item={product} />
                        <strong className={classes.productSku}>{`SKU`}: {product.sku}</strong>
                    </div>
                </section>
                <section className={classes.imageCarousel}>
                    <ImageGallery items={images}
                                  thumbnailPosition={`left`}
                                  showPlayButton={false}
                                  showBullets={true}
                    />
                </section>
                <section className={classes.options}>{productOptions}</section>
                {deliveryMethods}
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
                    {!!addToCardLoader && loadingIndicator}
                    {!addToCardLoader &&
                    <React.Fragment>
                        {
                            this.props.cartItemId &&
                            <Button priority="normal" size="big" onClick={this.props.history.goBack}>
                                <span>Cancel</span>
                            </Button>
                        }
                        <Button priority="high" size="big" onClick={this.addToCart} aria-label="Add to Cart">
                            <span>{this.props.cartItemId ? 'Update Cart' : 'Add to Cart'}</span>
                        </Button>
                    </React.Fragment>
                    }
                </section>
                <section className={classes.tabs}>
                    <Tabs>
                        <Tab title={`Details`}>
                            <RichText content={product.description} />
                        </Tab>
                        {!!product.front_attributes &&
                        <Tab title={`More Information`}>
                            <MoreInformation attributes={product.front_attributes}/>
                        </Tab>}
                        {!!product.product_specs &&
                        <Tab title={`Specs`}>
                            <RichText content={product.product_specs} />
                        </Tab>}
                        {!!product.product_warranty &&
                        <Tab title={`Warranty`}>
                            <RichText content={product.product_warranty} />
                        </Tab>}
                        {!!product.product_manual &&
                        <Tab title={`Product Manual`}>
                            <RichText content={product.product_manual} />
                        </Tab>}
                        {!!product.product_warnings_restrictions &&
                        <Tab title={`Warnings & Restrictions`}>
                            <RichText content={product.product_warnings_restrictions} />
                        </Tab>}
                        {!!product.product_qa &&
                        <Tab title={`Q & A`}>
                            <RichText content={product.product_qa} />
                        </Tab>}
                    </Tabs>
                </section>
            </Form>
        );
    }
}
export default classify(defaultClasses)(ProductFullDetail);
