import React from 'react';
import groupBy from 'lodash/groupBy';
import toPairs from 'lodash/toPairs'

class DeliveryMethods extends React.Component {

    getCarrierTitleByCode = (code) => {
        const { availableShippingMethods } = this.props;
        const o = availableShippingMethods.find((el) => {
            return el.carrier_code == code;
        })
        return o.carrier_title
    }

    render() {
        const { storeCode, items } = this.props;
        const dataGroupedByStoreNumber = toPairs(groupBy(items, item => item.extension_attributes.store_number));

        return (
            <div>
                <h3>{this.getCarrierTitleByCode(storeCode)}</h3>
                {dataGroupedByStoreNumber.map((store, idx) => {
                    const [storeNumber, items] = store;
                    console.log(storeNumber);
                    console.log(items);
                    return <p key={idx}>lasjhdjkashdkajshd</p>
                })}
            </div>
            
        )
    }

}

export default DeliveryMethods;