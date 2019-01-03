import React from 'react';
import classify from 'src/classify';
import defaultClasses from './tile.css';
import {
    Title,
    Info,
    ChooseStoreButton,
    StoreDetailsButton
} from 'src/components/RkStore';
import { Link } from 'react-router-dom';

const Tile = props => {
    const {
        classes,
        store,
        setCurrentStore,
        currentStore,
        onSelectStore,
        displayNumber,
        direction,
        onDetailsClick
    } = props;

    let classNames = [classes.root];

    if (!!direction) {
        classNames.push(classes[direction]);
    }

    return (
        <div className={classNames.join(' ')}>
            <Link
                to={`/${store.rewrite_request_path}`}
                className={classes.title}
            >
                {displayNumber && (
                    <span className={classes.storeNumber}>
                        {store.store_number}
                    </span>
                )}
                <Title store={store} />
            </Link>
            <div className={classes.photo}>
                {store.baseimage && (
                    <img
                        src={`https://ruralking.com/media/${store.baseimage}`}
                    />
                )}
            </div>
            <Info store={store} className={classes.info} />
            <div className={classes.storeButtons}>
                <StoreDetailsButton
                    store={store}
                    size={`small`}
                    onClick={onDetailsClick}
                />
                <ChooseStoreButton
                    store={store}
                    currentStore={currentStore}
                    setCurrentStore={setCurrentStore}
                    onSelectStore={onSelectStore}
                    size={`small`}
                />
            </div>
        </div>
    );
};

Tile.defaultProptypes = {
    direction: 'row'
};

export default classify(defaultClasses)(Tile);
