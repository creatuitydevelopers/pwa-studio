import React from 'react';
import { func, shape, string } from 'prop-types';

import classify from 'src/classify';

import Icon from 'src/components/Icon';
import Trigger from 'src/components/Trigger';

import defaultClasses from './header.css';

const Header = ({ classes, onBack, onClose, children }) => {
    return (
        <React.Fragment>
            <Trigger key="backButton" action={onBack}>
                <Icon name="arrow-left" />
            </Trigger>
            <div className={classes.title}>{children}</div>
            <Trigger key="closeButton" action={onClose}>
                <Icon name="x" />
            </Trigger>
        </React.Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        title: string
    }),
    onBack: func.isRequired,
    onClose: func.isRequired
};

export default classify(defaultClasses)(Header);
