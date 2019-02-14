import React from 'react';
import classify from 'src/classify';
import defaultStyles from './Authorizenet.css';
import { bool, func, shape, string } from 'prop-types';
import { Number, Cvc, Expiration } from 'react-credit-card-primitives'
import Accept from './AcceptJs'

const AuthorizeNetScriptUrl = {
    Production: 'https://js.authorize.net/v1/Accept.js',
    Sandbox: 'https://jstest.authorize.net/v1/Accept.js'
}

class Authorizenet extends React.Component {

    static propTypes = {
        classes: shape({
            root: string
        }),
        isRequestingPaymentNonce: bool,
        onError: func.isRequired,
        onSuccess: func.isRequired
    };

    state = {
        isError: false,
        card: {
            value: '',
            valid: false, 
            type: ''
        },
        expiration: {
            month: '',
            year: '',
            valid: false
        },
        cvv: {
            value: '',
            valid: false
        },
        processing: false
    };

    componentDidMount() {
        const script = document.createElement('script')

        switch (this.props.environment) {
            case 'production':
                script.src = AuthorizeNetScriptUrl.Production
                break
            case 'sandbox':
                script.src = AuthorizeNetScriptUrl.Sandbox
                break
        }
        document.head.appendChild(script)
    }

    componentDidUpdate(prevProps) {
        const { isRequestingPaymentNonce } = this.props;
        if (
            isRequestingPaymentNonce &&
            !prevProps.isRequestingPaymentNonce
        ) {
            // Our parent is telling us to request the payment nonce.
            this.requestPaymentNonce();
        }
    }

    componentWillUnmount() {
        const head = document.head
        const scripts = head.getElementsByTagName('script')

        Array.from(scripts)
            .filter(
                script =>
                    script.src === AuthorizeNetScriptUrl.Production ||
                    script.src === AuthorizeNetScriptUrl.Sandbox
            )
            .forEach(injectedScript => head.removeChild(injectedScript))
    }

    handleCardNumberChange = (value, valid, type) => {
        this.setState({
            card: {
                value,
                valid,
                type
            }
        })
    }

    handleExpirationChange = (month, year, valid) => {
        this.setState({
            expiration: {
                month, 
                year, 
                valid
            }
        })
    }

    handleCVVChange = (value, valid) => {
        this.setState({
            cvv: {
                value,
                valid
            }
        })
    }

    prepareResponse = (response) => {
        return {
            ...response,
            type: 'CreditCard',
            details: {
                cardType: this.state.card.type,
                lastFour: this.state.card.value.slice(-4),
                lastTwo: this.state.card.value.slice(-2),
                expYear: this.state.expiration.year,
                expMonth: this.state.expiration.month,
                cc_cid: this.state.cvv.value
            },
            description: 'Ending with 11'
        }
    }

    requestPaymentNonce = async () => {
            this.setState({
                processing: true
            });

            const authData = {
                apiLoginID: AUTHORIZENET_API_LOGIN_ID,
                clientKey: AUTHORIZENET_CLIENT_KEY
            }

            const {
                state: {
                    card,
                    expiration,
                    cvv
                }
            } = this;

            const cardData = {
                cardCode: cvv.value,
                cardNumber: card.value,
                month: `${expiration.month}`.replace(/^(\d)$/, '0$1'),
                year: `${expiration.year}`
            }
            const secureData = { 
                authData, 
                cardData 
            };

            Accept.dispatchData(secureData)
                .then(response => {
                    this.setState({processing: false})
                    const res = this.prepareResponse(response);
                    this.props.onSuccess(res);
                    return res;
                })
                .catch(res => {
                    this.setState({
                        processing: false,
                        apiErrors: res.messages.message.map((err) => err.text)
                    })
                    this.props.onError();
                })
    }

    render() {
        const {
            props: {
                classes
            }
        } = this;

        return (
            <div className={classes.root}>
                    <div className={this.state.processing ? classes.loader : classes.border}></div>
                    <Number
                        onChange={({ value, valid, type }) => this.handleCardNumberChange(value, valid, type)}
                        masked={true}
                        render={
                            ({
                                getInputProps,
                                valid
                            }) => 
                                <div>
                                    <input {...getInputProps()} name={`cardNumber`} className={valid ? '' : 'error'} />
                                    {!!getInputProps().value && !valid ? <p>Please Provide Valid Credit Card Number</p> : ''}
                                </div>
                                
                            }
                    />
                    <Expiration
                        onChange={({ month, year, valid }) => this.handleExpirationChange(month, year, valid)}
                        name={`expiration`}
                        render={({
                            getInputProps,
                            valid,
                            error
                        }) => (
                                <div>
                                    <input {...getInputProps()} className={valid ? '' : 'error'} />
                                    {valid ? ''
                                        : error === Expiration.ERROR_MONTHYEAR ? 'Please enter valid month and year'
                                            : error === Expiration.ERROR_MONTH ? 'Please enter valid month'
                                                : error === Expiration.ERROR_YEAR ? 'Please enter valid year'
                                                    : error === Expiration.ERROR_PAST_DATE ? 'Please enter a date in the future.'
                                                        : ''}
                                </div>
                            )} />
                    <Cvc
                        onChange={({ value, valid }) => this.handleCVVChange(value, valid)}
                        masked={false}
                        render={({
                            getInputProps,
                            valid
                        }) => <input {...getInputProps()} className={valid ? '' : 'error'} />} />
    
                </div>
        )
    }
}

export default classify(defaultStyles)(Authorizenet);