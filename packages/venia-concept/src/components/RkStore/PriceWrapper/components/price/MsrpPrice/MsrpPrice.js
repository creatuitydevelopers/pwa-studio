import React, {Component} from 'react';
import classify from 'src/classify';
import { oneOf, object, shape, string } from 'prop-types';
import Info from 'react-feather/dist/icons/info';
import Modal from 'react-responsive-modal';
import Icon from 'src/components/Icon';
import { Price } from 'src/components/Price';
import { MetaData } from "src/components/RkStore/PriceWrapper";
import Button from 'src/components/Button';

import defaultClasses from './msrpPrice.css'

class MsrpPrice extends Component {

    static propTypes = {
        priceConfig: shape({
            currencyCode: string.isRequired,
            partsClasses: object,
            locale: string.isRequired,
        }),
        classes: shape({
            button: string,
            root: string,
            label: string,
            modal: string,
            msrpPrice: string
        }),
        viewMode: oneOf(['product_page', 'category_page'])
    };

    state = {
        modalOpen: false
    };

    handleOpenModalClick = () => {
        this.setState({ modalOpen: true });
    };

    handleCloseModalClick = () => {
        this.setState({ modalOpen: false });
    };

    render() {
        const {priceData, priceConfig, viewMode, classes} = this.props;
        const {modalOpen} = this.state;

        const rootClassName = [
            classes.root,
            classes[`mode__${viewMode}`]
        ];

        return (
            <div className={rootClassName.join(' ')}>
                {viewMode ==  'product_page' && <div className={classes.msrpPrice}><Price value={priceData.msrp_price} {...priceConfig}/></div>}
                <label className={classes.label}>{`See in cart.`}
                    <Button
                        className={classes.button}
                        size={`small`}
                        onClick={this.handleOpenModalClick}>
                        <Icon src={Info}/>
                    </Button>
                </label>
                <Modal
                    open={modalOpen}
                    onClose={this.handleCloseModalClick}
                    classNames={{
                        modal: classes.modal
                    }}>
                    <p>Our price is lower than the manufacturer's "minimum advertised price." As a result, we cannot show you the price in catalog or the product page.</p>
                    <p>You have no obligation to purchase the product once you know the price. You can simply remove the item from your cart.</p>
                </Modal>
                {viewMode == 'product_page' && <MetaData price={priceData.msrp_price} currencyCode={priceConfig.currencyCode}/>}
            </div>
        );
    }
}

export default classify(defaultClasses)(MsrpPrice);