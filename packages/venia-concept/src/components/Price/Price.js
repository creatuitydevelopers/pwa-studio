import React, { PureComponent, Fragment } from 'react';
import { number, string, shape } from 'prop-types';
import patches from './util/intlPatches';
import defaultClasses from './price.css';
import classify from 'src/classify';

class Price extends PureComponent {
    static propTypes = {
        value: number.isRequired,
        currencyCode: string.isRequired,
        locale: string.isRequired,
        partsClasses: shape({
            currency: string,
            integer: string,
            decimal: string,
            fraction: string
        })
    };

    static defaultProps = {
        partsClasses: {},
        locale: 'en-US'
    };

    render() {
        const {
            value,
            currencyCode,
            partsClasses,
            classes,
            locale
        } = this.props;

        const parts = patches.toParts.call(
            Intl.NumberFormat(locale, {
                style: 'currency',
                currency: currencyCode,
                currencyDisplay: 'symbol'
            }),
            value
        );

        const children = parts.map((part, i) => {
            const partClass = partsClasses[part.type];
            const key = `${i}-${part.value}`;

            return (
                <span key={key} className={classes[partClass]}>
                    {part.value}
                </span>
            );
        });

        return <div className={classes.priceContainer}>{children}</div>;
    }
}

export default classify(defaultClasses)(Price);
