import React from 'react';
import {compose} from "redux";
import {oneOf, object, shape, string} from 'prop-types';

import {SimpleProductPrice, ConfigurableProductPrice, GiftCardProductPrice, BoundleProductPrice, TierPrices} from "src/components/RkStore/PriceWrapper";

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const searchQuery = gql`
    query($ids: [Int]) {
        priceData(productIds: $ids) {
            priceData
        }
    }
`;

const PriceWrapper = (props) => {
    const {priceConfig, product, viewMode} = props;

    const optionsMap = {
        simple: SimpleProductPrice,
        configurable: ConfigurableProductPrice,
        giftcard: GiftCardProductPrice,
        boundle: BoundleProductPrice
    };

    const priceData = {
        "final_price": 1123.29,
        "regular_price": 1223.29,
        "special_price": 1112.29,
        "save_amount": 12.99,
        "save_percent": 11.2,
        // "min_price": 2.29,
        // "max_price": 3.29,
        // "show_range": true,
        // "tier_prices": [
        //     {
        //         price_qty: 5,
        //         price: 2.10
        //     },
        //     {
        //         price_qty: 10,
        //         price: 1.10
        //     },
        //     {
        //         price_qty: 15,
        //         price: 0.10
        //     }
        // ],
        "msrp": true,
        "msrp_ongesture": false,
        "msrp_price": 1.23,
        "type_id": "giftcard"
    };


    return (
        <div>
            <Query query={searchQuery} variables={{ ids: [product.id] }}>
                {({ loading, error, data }) => {
                    if (error) return (<div>Something went wrong. Please refresh page.</div>);
                    if (loading) return (<div>Loading.</div>);

                    //const priceData = JSON.parse(data.priceData[0].priceData);
                    //console.log(priceData);
                    const ProductOptionTagName = optionsMap[!!priceData.type_id ? priceData.type_id : 'simple'];
                    return (
                        <React.Fragment>
                            <ProductOptionTagName priceData={priceData} {...props}/>
                            {viewMode == 'product_page' && <TierPrices items={priceData.tier_prices} priceConfig={priceConfig}/>}
                        </React.Fragment>
                    )
                }}

            </Query>
        </div>
    );
}

PriceWrapper.propsType = {
    priceConfig: shape({
        currencyCode: string,
        partsClasses: object,
        locale: string,
    }),
    product: object.isRequired,
    viewMode: oneOf(['product_page', 'category_page'])
};

PriceWrapper.defaultProps = {
    priceConfig: {
        currencyCode: 'USD',
        partsClasses: {
            currency: 'upIdx',
            fraction: 'upIdx',
            decimal: 'hidden'
        },
        locale: `en-US`
    },
    viewMode: 'product_page'
};

export default PriceWrapper;