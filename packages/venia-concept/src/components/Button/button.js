import React, { Component } from 'react';
import { oneOf, shape, string } from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './button.css';

const defaultSize = null;
const defaultGenre = 'primary';

class Button extends Component {
    static propTypes = {
        classes: shape({
            content: string,
            root: string
        }),
        size: oneOf(['small', 'big']),
        type: oneOf(['button', 'reset', 'submit']),
        genre: oneOf(['primary', 'secondary', 'empty', 'asLink'])
    };

    static defaultProps = {
        type: 'button',
        size: defaultSize,
        genre: defaultGenre
    };

    render() {
        const { children, classes, type, size = defaultSize, genre, ...restProps} = this.props;
        let classNames = [classes.root, classes[genre]];
        if(!!size){
            classNames.push(classes[size])
        }

        return (
            <button className={classNames.join(' ')} type={type} {...restProps}>
                <span className={classes.content}>{children}</span>
            </button>
        );
    }
}

export default classify(defaultClasses)(Button);
