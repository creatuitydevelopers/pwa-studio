/**
 * @fileoverview This component uses the BrainTree Web Drop In to
 * hook into Web Payments and the Payment Request API to
 * submit payments via BrainTree.
 *
 * See:
 * https://github.com/braintree/braintree-web-drop-in
 * https://braintree.github.io/braintree-web-drop-in/docs/current/index.html
 * https://developers.braintreepayments.com/guides/drop-in/overview/javascript/v3
 */

import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { Util } from '@magento/peregrine';

import defaultClasses from './braintreeDropin.css';
import classify from 'src/classify';

const { BrowserPersistence } = Util;
const storage = new BrowserPersistence();
const { BRAINTREE_TOKEN } = process.env;

class BraintreeDropin extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        isRequestingPaymentNonce: bool,
        onError: func.isRequired,
        onSuccess: func.isRequired
    };

    state = {
        isError: false
    };

    async componentDidMount() {
        let isError;
        console.log('DID MOUNT!!!')

        try {
            this.dropinInstance = await this.createDropinInstance();
            isError = false;
        } catch (err) {
            console.error(
                `Unable to initialize Credit Card form (Braintree). \n${err}`
            );
            isError = true;
        }

        this.setState({ isError });
    }

    componentDidUpdate(prevProps) {
        const { dropinInstance } = this;
        const { isRequestingPaymentNonce } = this.props;
        console.log('DID UPDATE!!!')
        if (
            dropinInstance &&
            isRequestingPaymentNonce &&
            !prevProps.isRequestingPaymentNonce
        ) {
            console.log('DID UPDATE AND REQUESTED PAYMENT NONCE!!!')
            // Our parent is telling us to request the payment nonce.
            this.requestPaymentNonce();
        }
    }

    render() {
        const { classes } = this.props;
        const { isError } = this.state;
        console.log('RENDER!!!')

        if (isError) {
            return (
                <span className={classes.error}>
                    There was an error loading payment options. Please try again
                    later.
                </span>
            );
        }

        return (
            <div className={classes.root}>
                <div id="braintree-dropin-container" />
            </div>
        );
    }

    createDropinInstance = async () => {
        console.log('create DropIn Instance!!!')
        // import the dropin API
        const { default: dropin } = await import('braintree-web-drop-in');

        // Create an instance of the BrainTree Web Drop In.
        return dropin.create({
            authorization: BRAINTREE_TOKEN,
            // Note: this selector must match to some part of this component's rendered HTML.
            container: '#braintree-dropin-container',
            card: {
                overrides: {
                    fields: {
                        number: {
                            maskInput: {
                                // Only show the last four digits of the credit card number after focus exits this field.
                                showLastFour: true
                            }
                        }
                    }
                }
            }
        });
    };

    /*
     * @see https://developers.braintreepayments.com/guides/payment-method-nonces.
     * @see https://braintree.github.io/braintree-web-drop-in/docs/current/Dropin.html#requestPaymentMethod.
     */
    requestPaymentNonce = async () => {
        const { dropinInstance } = this;
        console.log('REQUESTING PAYMENT NONCE!!!')

        try {
            console.log('probujemy !!!!!!!');
            const paymentNonce = await dropinInstance.requestPaymentMethod();
            console.log('payment nonce : ');
            console.log(JSON.stringify(paymentNonce));
            this.props.onSuccess(paymentNonce);
        } catch (e) {
            // If payment details were missing or invalid but we have data from
            // a previous successful submission, use the previous data.
            // const storedPayment = storage.getItem('paymentMethod');
            // if (storedPayment) {
            //     this.props.onSuccess(storedPayment.data);
            //     return;
            // }

            // An error occurred and we have no stored data.
            // BrainTree will update the UI with error messaging,
            // but signal that there was an error.
            console.error(`Invalid Payment Details. \n${e}`);
            this.props.onError();
        }
    };
}

export default classify(defaultClasses)(BraintreeDropin);
