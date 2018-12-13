import React from "react";
import { compose } from 'redux';

import DefaultOption from 'src/components/DeliveryMethods/components/DefaultOption';
import StsOption from 'src/components/DeliveryMethods/components/StsOption';
import VstsOption from 'src/components/DeliveryMethods/components/VstsOption';
import PlaceholderOption from 'src/components/DeliveryMethods/components/PlaceholderOption';

const emptyData = Array.from({ length: 2 }).fill(null);

const withLoading = (Component) => (props) =>
    !!props.isLoading
        ? <Component {...props} methods={emptyData}/>
        : <Component {...props}/>

const withNoData= (Component) => (props) =>
    !Array.isArray(props.methods) || !props.methods.length
        ? <div>
            <p>No delivery methods found</p>
        </div>
        :  <Component {...props}/>

function DeliveryMethodsList({defaultMethod, selectedStore, onChange, methods}) {

    const optionsMap = {
        default: DefaultOption,
        sts: StsOption,
        vsts: VstsOption
    };

    return (
        <ul>
            {methods.map((method, index) => {
                    if (!method || !method.type || !optionsMap[method.type]) {
                        return <PlaceholderOption key={index}/>;
                    }
                    const OptionTagName = optionsMap[method.type];

                    return <OptionTagName key={index}
                                          isChecked={defaultMethod ? defaultMethod == method.type : !index}
                                          methodInfo={method.data}
                                          selectedStore={selectedStore}
                                          onChange={onChange}/>
                }
            )}
        </ul>
    )
}

export default compose(withLoading, withNoData)(DeliveryMethodsList);