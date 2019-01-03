import React from 'react';
import { string, object, shape, bool, func, array } from 'prop-types';
import classify from 'src/classify';
import defaultClasses from './list.css';
import { Tile } from 'src/components/RkStore';
import { compose } from 'redux';

const withNoData = Component => props =>
    !Array.isArray(props.stores) || !props.stores.length ? (
        <p className={props.classes.noItems}>No stores found</p>
    ) : (
        <Component {...props} />
    );

const StoreList = props => {
    const {
        classes,
        stores,
        currentStore,
        displayNumber,
        onSelectStore,
        setCurrentStore,
        direction,
        onDetailsClick,
        ...rest
    } = props;

    let classNames = [classes.root];
    if (!!direction) {
        classNames.push(classes[direction]);
    }

    return (
        <div className={classNames.join(' ')} {...rest}>
            {stores.map(singleStore => (
                <Tile
                    key={singleStore.storelocator_id}
                    onDetailsClick={onDetailsClick}
                    onSelectStore={onSelectStore}
                    displayNumber={displayNumber}
                    currentStore={currentStore}
                    store={singleStore}
                    setCurrentStore={setCurrentStore}
                    direction={direction}
                />
            ))}
        </div>
    );
};

StoreList.propTypes = {
    stores: array,
    classes: shape({
        root: string
    }),
    currentStore: object,
    displayNumber: bool,
    setCurrentStore: func
};

StoreList.defaultProptypes = {
    direction: 'row'
};

export default compose(
    classify(defaultClasses),
    withNoData
)(StoreList);
