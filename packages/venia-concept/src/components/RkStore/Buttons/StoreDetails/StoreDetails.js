import React from 'react';
import Button from 'src/components/Button';
import { Link } from 'react-router-dom';
import { shape, string, bool, any } from 'prop-types';
import { withRouter } from 'react-router-dom';

const defaultSize = null;

const StoreDetailsButton = props => {
    const {
        store,
        title,
        children,
        history,
        size,
        useStandardLink,
        onClick = function() {}
    } = props;

    const handleClick = () => {
        history.push(`\/${store.rewrite_request_path}`);
        onClick();
    };

    return (
        <Button type="button" genre="empty" size={size} onClick={handleClick}>
            {title}
        </Button>
    );
};

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
};

export default withRouter(StoreDetailsButton);
