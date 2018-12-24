import React from 'react';
import Button from 'src/components/Button';
import { isCurrentStore } from 'src/models/Store';
import { object, func, string, oneOf } from 'prop-types';
import { MyStoreBadge } from 'src/components/RkStore';

const defaultSize = null;

const ChooseStore = (props) => {

    const { store, currentStore, onSelectStore, setCurrentStore, size, children, title, ...rest } = props;
    const isCurrent = currentStore && isCurrentStore(store, currentStore);
    const content = children ? children : title;
    const handleClick = () => {
        setCurrentStore(store);
        onSelectStore(store);
    }
    
    return isCurrent ? <MyStoreBadge size={size} /> : <Button type="button" onClick={handleClick} size={size} {...rest}>{content}</Button>
}

ChooseStore.propTypes = {
    title: string,
    store: object.isRequired,
    currentStore: object,
    genre: string,
    setCurrentStore: func.isRequired,
    onSelectStore: func,
    size: oneOf(['small', 'big'])
};

ChooseStore.defaultProps = {
    title: 'Choose as My Store',
    genre: 'primary',
    onSelectStore: function(){},
    size: defaultSize
}

export default ChooseStore;