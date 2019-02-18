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

    console.log(product)

    const optionsMap = {
        simple: SimpleProductPrice,
        configurable: ConfigurableProductPrice,
        giftcard: GiftCardProductPrice,
        boundle: BoundleProductPrice
    };

    return (
        <Query query={searchQuery} variables={{ ids: [product.id] }}>
            {({ loading, error, data }) => {
                if (error) return (<div>Something went wrong. Please refresh page.</div>);
                if (loading) return (<div>Loading.</div>);

                const priceData = JSON.parse(data.priceData[0].priceData);
                const ProductOptionTagName = optionsMap[!!priceData.type_id ? priceData.type_id : 'simple'];
                return (
                    <React.Fragment>
                        <ProductOptionTagName priceData={priceData} {...props}/>
                        {viewMode == 'product_page' && <TierPrices items={priceData.tier_prices} priceConfig={priceConfig}/>}
                    </React.Fragment>
                )
            }}
        </Query>
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