import React, { Component, Fragment } from 'react';
import { arrayOf, number, func, shape, string } from 'prop-types';
import { Price } from 'src/components/Price';
import { resourceUrl } from 'src/drivers';
import Kebab from './kebab';
import Section from './section';
import { withRouter } from 'react-router-dom';

import classify from 'src/classify';
import defaultClasses from './product.css';
import { Link } from 'react-router-dom';

import { connect } from 'src/drivers';
import { closeDrawer } from 'src/actions/app';

const imageWidth = 80;
const imageHeight = 100;

class Product extends Component {
    static propTypes = {
        classes: shape({
            image: string,
            modal: string,
            name: string,
            optionLabel: string,
            options: string,
            price: string,
            quantity: string,
            quantityOperator: string,
            quantityRow: string,
            quantitySelect: string,
            root: string
        }),
        item: shape({
            item_id: number.isRequired,
            name: string.isRequired,
            options: arrayOf(
                shape({
                    label: string,
                    value: string
                })
            ),
            price: number.isRequired,
            product_type: string,
            qty: number.isRequired,
            quote_id: string,
            sku: string.isRequired
        }).isRequired,
        currencyCode: string.isRequired,
        openOptionsDrawer: func.isRequired
    };

    // TODO: Manage favorite items using GraphQL/REST when it is ready
    constructor() {
        super();
        this.state = {
            isOpen: false,
            isFavorite: false
        };
    }

    get options() {
        const { classes, item } = this.props;
        const options = item.options;
console.log(item);

        return options && options.length > 0 ? (
            <dl className={classes.options}>
                {options.map(({ label, value }) => (
                    <Fragment key={`${label}${value}`}>
                        <dt className={classes.optionLabel}>
                            {label} : {value}
                        </dt>
                    </Fragment>
                ))}
            </dl>
        ) : null;
    }

    get modal() {
        const { classes } = this.props;
        return this.state.isOpen ? <div className={classes.modal} /> : null;
    }

    styleImage(image) {
        return {
            minHeight: imageHeight, // min-height instead of height so image will always align with grid bottom
            width: imageWidth,
            backgroundImage: `url(${resourceUrl(image.file, {
                type: 'image-product',
                width: imageWidth
            })})`
        };
    }

    render() {
        const { options, props, modal } = this;
        const { classes, item, currencyCode } = props;
        const rootClasses = this.state.isOpen
            ? classes.root + ' ' + classes.root_masked
            : classes.root;
        const favoritesFill = { fill: 'rgb(var(--venia-teal))' };

        return (
            <li className={rootClasses}>
                <div
                    className={classes.image}
                    style={this.styleImage(item.image)}
                />
                <div className={classes.name}>
                    <Link to={`${item.extension_attributes.url_key}`}>
                        {item.name}
                    </Link>
                </div>
                {options}
                <div className={classes.quantity}>
                    <div className={classes.quantityRow}>
                        <span>{item.qty}</span>
                        <span className={classes.quantityOperator}>{'×'}</span>
                        <span className={classes.price}>
                            <Price
                                currencyCode={currencyCode}
                                value={item.price}
                            />
                        </span>
                    </div>
                </div>
                {modal}
                <Kebab>
                    <Section
                        text="Add to favorites"
                        onClick={this.favoriteItem}
                        icon="Heart"
                        iconAttributes={
                            this.state.isFavorite ? favoritesFill : {}
                        }
                    />
                    <Section
                        text="Edit item"
                        onClick={this.editItem}
                        icon="Edit2"
                    />
                    <Section
                        text="Remove item"
                        onClick={this.removeItem}
                        icon="Trash"
                    />
                </Kebab>
            </li>
        );
    }

    favoriteItem = () => {
        this.setState({
            isFavorite: true
        });
    };

    editItem = () => {
        const { history } = this.props;
        const { product_type } = this.props.item;
        if(product_type === 'configurable') {
            history.push(`\/edit-cart-item\/${this.props.item.item_id}\/product\/${this.props.item.extension_attributes.url_key}`);
            this.props.closeDrawer();
        } else {
            this.props.openOptionsDrawer(this.props.item);
        }
    };

    removeItem = () => {
        // TODO: prompt user to confirm this action
        this.props.removeItemFromCart({
            item: this.props.item
        });
    };
}

const mapDispatchToProps = {
    closeDrawer
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(classify(defaultClasses)(Product)));
