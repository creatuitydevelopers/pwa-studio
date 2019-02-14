import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';

import chevronRight from 'react-feather/dist/icons/chevron-right';
import Icon from 'src/components/Icon';
import classify from 'src/classify';
import defaultClasses from './categoryBranch.css';

class Branch extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            text: string
        }),
        name: string.isRequired,
        path: string.isRequired,
        onDive: func.isRequired,
    };

    handleClick = () => {
        const { path, onDive, setChildCategoryUrl, urlPath } = this.props;
        setChildCategoryUrl(urlPath);
        onDive(path);
    };

    render() {
        const { classes } = this.props;

        return (
            <button className={classes.root} onClick={this.handleClick}>
                <Icon src={chevronRight}/>
            </button>
        );
    }
}

export default classify(defaultClasses)(Branch);
