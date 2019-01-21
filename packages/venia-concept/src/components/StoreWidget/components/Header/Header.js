import React from 'react';
import { func, shape, string } from 'prop-types';

import classify from 'src/classify';

import Icon from 'src/components/Icon';
import Trigger from 'src/components/Trigger';
import ArrowLeftIcon from 'react-feather/dist/icons/arrow-left';
import CloseIcon from 'react-feather/dist/icons/x';

import defaultClasses from './header.css';

const Header = ({ classes, onBack, onClose, children }) => {
    return (
        <React.Fragment>
            <Trigger key="backButton" action={onBack}>
                <Icon src={ArrowLeftIcon} />
            </Trigger>
            <div className={classes.title}>{children}</div>
            <Trigger key="closeButton" action={onClose}>
                <Icon src={CloseIcon} />
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
