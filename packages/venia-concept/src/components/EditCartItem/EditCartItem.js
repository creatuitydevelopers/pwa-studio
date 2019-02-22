import React from 'react';
import { connect, Query } from 'src/drivers';
import getUrlKey from 'src/util/getUrlKey';
import productQuery from 'src/queries/getProductDetail.graphql';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import ProductFullDetail from 'src/components/ProductFullDetail';
import {
    updateItemInCart
} from 'src/actions/cart';
import { withRouter } from 'react-router-dom';

class EditCartItem extends React.Component {

    render() {
        const { match: {
            params: {
                cartItem
            }
        }} = this.props;

        return (
            <Query
                query={productQuery}
                variables={{ urlKey: getUrlKey(), onServer: false }}
            >
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return loadingIndicator;

                    const product = data.productDetail.items[0];

                    return (
                        <ProductFullDetail
                            product={product}
                            cartItemId={cartItem}
                            history={this.props.history}
                            referer={''}
                            addToCart={this.props.updateItemInCart}
                        />
                    );
                }}
            </Query>
        );
    }
}

const mapDispatchToProps = {
    updateItemInCart
}

export default withRouter(connect(
    null,
    mapDispatchToProps
)(EditCartItem));