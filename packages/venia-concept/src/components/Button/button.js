

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
        priority: oneOf(['high', 'normal', 'highSecondary', 'normalSecondary']).isRequired,
        type: oneOf(['button', 'reset', 'submit']).isRequired,
        size: oneOf(['small', 'normal', 'medium', 'big']).isRequired,
    };

    static defaultProps = {
        priority: 'normal',
        type: 'button',
        size: 'normal'
    };

    render() {
        const { children, classes, priority, type, size, ...restProps } = this.props;

        const rootClassName = [classes[getRootClassName(priority)], classes[`root_${size}Size`]];

        return (
            <button className={rootClassName.join(' ')} type={type} {...restProps}>
                <span className={classes.content}>{children}</span>
            </button>
        );
    }
}

export default classify(defaultClasses)(Button);







// import React, { Component } from 'react';
// import { oneOf, shape, string } from 'prop-types';

// import classify from 'src/classify';
// import defaultClasses from './button.css';

// <<<<<<< HEAD
// const defaultSize = null;
// const defaultGenre = 'primary';

// class Button extends Component {
//     static propTypes = {
//         classes: shape({
//             content: string,
//             root: string
//         }),
//         size: oneOf(['small', 'big']),
//         type: oneOf(['button', 'reset', 'submit']),
//         genre: oneOf(['primary', 'secondary', 'empty', 'asLink'])
//     };

//     static defaultProps = {
//         type: 'button',
//         size: defaultSize,
//         genre: defaultGenre
//     };

//     render() {
//         const {
//             children,
//             classes,
//             type,
//             size = defaultSize,
//             genre,
//             ...restProps
//         } = this.props;
//         let classNames = [classes.root, classes[genre]];
//         if (!!size) {
//             classNames.push(classes[size]);
//         }

//         return (
//             <button className={classNames.join(' ')} type={type} {...restProps}>
// =======
// const getRootClassName = priority => `root_${priority}Priority`;

// export class Button extends Component {
//     static propTypes = {
//         classes: shape({
//             content: string,
//             root: string,
//             root_highPriority: string,
//             root_normalPriority: string
//         }).isRequired,
//         priority: oneOf(['high', 'normal']).isRequired,
//         type: oneOf(['button', 'reset', 'submit']).isRequired
//     };

//     static defaultProps = {
//         priority: 'normal',
//         type: 'button'
//     };

//     render() {
//         const { children, classes, priority, type, ...restProps } = this.props;

//         const rootClassName = classes[getRootClassName(priority)];

//         return (
//             <button className={rootClassName} type={type} {...restProps}>
// >>>>>>> 194ed0f7adab4933a379443f6cee6f716e0ff15b
//                 <span className={classes.content}>{children}</span>
//             </button>
//         );
//     }
// }

// export default classify(defaultClasses)(Button);



















