import React from 'react';
import classify from 'src/classify';
import defaultClasses from './tile.css';
import { Title, Info, ChooseStoreButton, StoreDetailsButton } from 'src/components/RkStore';

const Tile = (props) => {
    const { 
        classes, 
        store, 
        setCurrentStore, 
        currentStore, 
        onSelectStore, 
        displayNumber,
        direction
    } = props;

    let classNames = [classes.root];

    if(!!direction){
        classNames.push(classes[direction]);
    }

    return (
        <div className={classNames.join(' ')}>
            <div className={classes.title}>
                {displayNumber && <span className={classes.storeNumber}>{store.store_number}</span>}
                <Title store={store} />
            </div>
            <div className={classes.photo}>
                <img src={store.baseimage} />
            </div>
            <Info store={store} className={classes.info} />
            <div className={classes.storeButtons}>
                <StoreDetailsButton store={store} size={`small`} />
                <ChooseStoreButton store={store} currentStore={currentStore} setCurrentStore={setCurrentStore} onSelectStore={onSelectStore}  size={`small`} />
            </div>
        </div>

    )
}

Tile.defaultProptypes = {
    direction: 'row'
}

export default classify(defaultClasses)(Tile);
