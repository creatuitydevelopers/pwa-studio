export const showZeroPrice = (productType) => {
    if(productType == 'giftcard') return true;

    return false;
}

export const isPriceMoreThanZero = (priceData) => {
    const {final_price, regular_price, min_price, max_price} = priceData;
    if(!!final_price && final_price > 0) return true;
    if(!!regular_price && regular_price > 0) return true;
    if(!!max_price && max_price > 0 && !!min_price && min_price > 0) return true;

    return false;
}