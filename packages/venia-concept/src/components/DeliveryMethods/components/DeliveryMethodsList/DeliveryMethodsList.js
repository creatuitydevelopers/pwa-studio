import React from 'react';
import { compose } from 'redux';
import classify from 'src/classify';

import DefaultOption from 'src/components/DeliveryMethods/components/DefaultOption';
import StsOption from 'src/components/DeliveryMethods/components/StsOption';
import VstsOption from 'src/components/DeliveryMethods/components/VstsOption';
import PlaceholderOption from 'src/components/DeliveryMethods/components/PlaceholderOption';

import defaultClasses from './deliveryMethodList.css';

const withNoData = Component => props =>
    !Array.isArray(props.methods) || !props.methods.length ? (
        <div>
            <p>No delivery methods found</p>
        </div>
    ) : (
        <Component {...props} />
    );

function DeliveryMethodsList({
    defaultMethod,
    selectedStore,
    onChange,
    methods,
    classes,
    viewMode
}) {
    const optionsMap = {
        default: DefaultOption,
        sts: StsOption,
        vsts: VstsOption
    };

    const itemClassName = [
        classes.item,
        classes[`mode__${viewMode}`]
    ];

    return (
        <ul>
            {methods.map((method, index) => {
                if (!method || !method.method || !optionsMap[method.method]) {
                    return <PlaceholderOption key={index} />;
                }
                const OptionTagName = optionsMap[method.method];

                return (
                    <li key={index} className={itemClassName.join(' ')}>
                        <OptionTagName
                            isChecked={
                                defaultMethod
                                    ? defaultMethod == method.method
                                    : false
                            }
                            methodInfo={method}
                            selectedStore={selectedStore}
                            onChange={onChange}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export default classify(defaultClasses)(compose(withNoData)(DeliveryMethodsList));
