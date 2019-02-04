import React from 'react';
import ShipToStoreOption from 'src/components/DeliveryMethods/components/ShipToStoreOption';
import { getStstMethodCode } from 'src/models/DeliveryMethods';

const StsOption = ({ selectedStore, currentStore, children, ...restProps }) => {
    const store = !!selectedStore ? selectedStore : currentStore;
    const deliveryMessage = !!store
        ? `Estimated delivery in ${store.dc_minimum_days} to ${
              store.dc_maximum_days
          } business days`
        : ``;

    return (
        <ShipToStoreOption
            {...restProps}
            selectedStore={selectedStore}
            currentStore={currentStore}
            methodCode={getStstMethodCode()}
            deliveryMessage={deliveryMessage}
        >
            {children}
        </ShipToStoreOption>
    );
};

export default StsOption;
