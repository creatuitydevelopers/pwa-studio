import React from "react";
import { compose } from 'redux';
import StoreItem from 'src/components/DeliveryMethods/components/StoreItem';
import {func, string, array, shape} from "prop-types";

import classify from 'src/classify';
import defaultClasses from './storeList.css';

const emptyData = Array.from({ length: 3 }).fill(null);

const withLoading = (Component) => (props) =>
    !!props.isLoading
        ? <Component {...props} stores={emptyData}/>
        : <Component {...props}/>

const withNoData= (Component) => (props) =>
    !Array.isArray(props.stores) || !props.stores.length
        ? <p>No delivery methods found</p>
        : <Component {...props} />


const StoreList = ({stores, onStoreSelectClick, classes}) => {
    return (
        <ul className={classes.root}>
            {stores.map((store, index) => <StoreItem key={index} store={store}
                                              onStoreSelectClick={onStoreSelectClick}/>)}
        </ul>
    );
}

StoreList.propTypes = {
    classes: shape({
        root: string
    }),
    stores: array,
    onStoreSelectClick: func.isRequired
};

export default compose(classify(defaultClasses), withLoading, withNoData)(StoreList);