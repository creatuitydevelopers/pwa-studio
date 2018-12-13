import React from 'react';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';
import { shape, string, bool, any } from 'prop-types';

const defaultSize = null;

const StoreDetailsButton = (props) => {
    const { store, title, children, size, useStandardLink,  ...rest } = props;
    
    return children ? 
        <Button type="button" genre="empty" size={size} {...rest}>
            {children}
        </Button>
        :
        <Button type="button" genre="empty" size={size} {...rest}>
            { useStandardLink ?
                <a href={`/storelocator/${store.rewrite_request_path}`}>{title}</a>
                :
                <Link to={`/storelocator/${store.rewrite_request_path}`}>{title}</Link>
            }
        </Button>
}

StoreDetailsButton.propTypes = {
    title: string,
    store: shape({
        rewrite_request_path: any.isRequired
    }).isRequired,
    useStandardLink: bool
};

StoreDetailsButton.defaultProps = {
    title: 'Store Details',
    size: defaultSize
}

export default StoreDetailsButton;
