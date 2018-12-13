import React from "react";
import StsOption from "src/components/DeliveryMethods/components/StsOption";
import {getVstsMethodCode} from "src/models/DeliveryMethods"

const VstsOption = ({children, ...restProps}) => {
    return (<StsOption {...restProps} methodCode={getVstsMethodCode()}>{children}</StsOption>)
};

export default VstsOption;