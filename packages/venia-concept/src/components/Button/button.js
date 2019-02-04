import React, { Component } from 'react';
import { oneOf, shape, string } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './button.css';

const getRootClassName = priority => `root_${priority}Priority`;

export class Button extends Component {
    static propTypes = {
        classes: shape({
            content: string,
            root: string,
            root_highPriority: string,
            root_highSecondaryPriority: string,
            root_normalPriority: string
        }).isRequired,
        priority: oneOf(['high', 'normal', 'highSecondary', 'normalSecondary'])
            .isRequired,
        type: oneOf(['button', 'reset', 'submit']).isRequired,
        size: oneOf(['small', 'normal', 'medium', 'big']).isRequired
    };

    static defaultProps = {
        priority: 'normal',
        type: 'button',
        size: 'normal'
    };

    render() {
        const {
            children,
            classes,
            priority,
            type,
            size,
            ...restProps
        } = this.props;

        const rootClassName = [
            classes[getRootClassName(priority)],
            classes[`root_${size}Size`]
        ];

        return (
            <button
                className={rootClassName.join(' ')}
                type={type}
                {...restProps}
            >
                <span className={classes.content}>{children}</span>
            </button>
        );
    }
}

export default classify(defaultClasses)(Button);
