import React from "react";
import {func, object, shape, string} from "prop-types";

import classify from 'src/classify';
import Button from "src/components/Button";
import defaultClasses from './storeItem.css';

const ItemPlaceholder = ({classes}) => (
    <li className={classes.root}>
        <div className={classes.details}>
            <p className={classes.placeholderParagraph}></p>
            <p className={classes.placeholderParagraph}></p>
            <p className={classes.placeholderParagraph}></p>
            <p className={classes.placeholderParagraph}></p>
        </div>
        <div className={classes.actions}>
            <div className={classes.placeholderButton}></div>
        </div>
    </li>
);


const StoreItem = ({store, onStoreSelectClick, classes}) => {
    return (
        !!store
            ? <li className={classes.root}>
                <div className={classes.details}>
                    <p>
                        <strong className={classes.name}>{store.company_name}</strong>
                        <span className={classes.distance}>{store.distance} mi</span>
                    </p>
                    <p className={classes.address}><span>{store.address}</span></p>
                    <p className={classes.address}><span>{store.city}</span>, <span>{store.state}</span>
                        <span>{store.zipcode}</span></p>
                    <p>
                        {!!store.inventoryLevel
                        ? <span className={classes.inStock}>{store.inventoryLevel} Available</span>
                        : <span className={classes.outOfStock}>Out of Stock</span>}
                    </p>
                </div>
                {!!store.inventoryLevel &&
                <div className={classes.actions}>
                    <Button onClick={() => onStoreSelectClick(store)}>Select Store</Button>
                </div>
                }
            </li>
            : <ItemPlaceholder classes={classes}/>
    )
};


StoreItem.propTypes = {
    classes: shape({
        root: string,
        details: string,
        name: string,
        distance: string,
        address: string,
        inStock: string,
        outOfStock: string,
        actions: string
    }),
    store: object,
    onStoreSelectClick: func.isRequired
};

export default classify(defaultClasses)(StoreItem);