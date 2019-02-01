import React from 'react';
import ShipToStoreOption from 'src/components/DeliveryMethods/components/ShipToStoreOption';
import { getVstsMethodCode } from 'src/models/DeliveryMethods';

const VstsOption = ({ children, ...restProps }) => {

    const deliveryMessage = !!methodInfo.vsts_lead_time ? methodInfo.vsts_lead_time : ``;
    return (
        <ShipToStoreOption {...restProps}
                           selectedStore={selectedStore}
                           currentStore={currentStore}
                           methodCode={getVstsMethodCode()}
                           deliveryMessage={deliveryMessage}>
            {children}
        </ShipToStoreOption>
    );
};

export default VstsOption;
