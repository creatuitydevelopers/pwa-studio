import React from 'react';
import classify from 'src/classify';
import defaultStyles from './Authorizenet.css';
import { bool, func, shape, string } from 'prop-types';
import { Number, Cvc, Expiration } from 'react-credit-card-primitives';
import * as creditCardIcon from './creditCardIcons';
import Accept from './AcceptJs'

const AuthorizeNetScriptUrl = {
    Production: 'https://js.authorize.net/v1/Accept.js',
    Sandbox: 'https://jstest.authorize.net/v1/Accept.js'
}

const ERROR_MSG_EXPIRATION_MONTH = "Please provide valid expiration month."
const ERROR_MSG_EXPIRATION_YEAR = "Please provide valid expiration year."
const ERROR_MSG_EXPIRATION_PAST_DATE = "Please enter a date in the future."

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
            valid: false,
            dirty: false
        },
        cvv: {
            value: '',
            valid: false
        },
        apiErrors: [],
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
        let dirty = !isNaN(month) || !isNaN(year);
        this.setState({
            expiration: {
                month, 
                year, 
                valid,
                dirty
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
                expYear: this.state.expiration.year,
                expMonth: this.state.expiration.month,
                cc_cid: this.state.cvv.value
            },
            description: `Ending with ${this.state.card.value.slice(-2)}` 
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
                <div className={classes.header}>
                    <span className={classes.cardIcon} dangerouslySetInnerHTML={{
                        __html: !this.state.card.type ? creditCardIcon.emptyCard  
                            : !!creditCardIcon[this.state.card.type.replace(/\s/g, '').toLocaleLowerCase()] ?
                                creditCardIcon[this.state.card.type.replace(/\s/g, '').toLocaleLowerCase()]
                                : creditCardIcon.emptyCard
                    }} />
                    <h3>Pay with card</h3>
                </div>
                <div className={this.state.processing ? classes.loader : classes.border}></div>
                <div className={classes.content}>
                    <Number
                        onChange={({ value, valid, type }) => this.handleCardNumberChange(value, valid, type)}
                        masked={true}
                        render={
                            ({
                                getInputProps,
                                valid
                            }) => 
                                <div className={classes.inputRow}>
                                    <label htmlFor="cardNumber" className={classes.label}>Card Number</label>
                                    <input {...getInputProps()} name={`cardNumber`} placeholder={`•••• •••• •••• ••••`} className={valid ? '' : 'error'} />
                                    {
                                        (!!getInputProps().value && !valid) || (!!this.state.apiErrors.length && !valid)
                                        ? <p className={classes.errorMsg}>Please Provide Valid Credit Card Number</p> : ''
                                    }
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
                        }) => 
                            <div className={classes.inputRow}>
                                <label htmlFor="cc-exp" className={classes.label}>Expiration Date</label>
                                <input {...getInputProps()} className={valid ? '' : 'error'} />
                                <p className={classes.errorMsg}>
                                    {   
                                        !error || !this.state.apiErrors.length ? ''
                                            : (error === Expiration.ERROR_MONTH || this.state.apiErrors.includes(ERROR_MSG_EXPIRATION_MONTH)) ? ERROR_MSG_EXPIRATION_MONTH
                                                : (error === Expiration.ERROR_YEAR || this.state.apiErrors.includes(ERROR_MSG_EXPIRATION_YEAR)) ? ERROR_MSG_EXPIRATION_YEAR
                                                    : error === Expiration.ERROR_PAST_DATE ? ERROR_MSG_EXPIRATION_PAST_DATE
                                                        : ''
                                    }
                                </p>
                            </div>
                        } />
                    <Cvc
                        onChange={({ value, valid }) => this.handleCVVChange(value, valid)}
                        masked={false}
                        render={
                            ({
                                getInputProps,
                                valid
                            }) => 
                                <div className={classes.inputRow}>
                                    <label htmlFor="cvc" className={classes.label}>CVV</label>
                                    <input {...getInputProps()} className={valid ? '' : 'error'} />
                                    <p className={classes.errorMsg}>
                                        {
                                            !!this.state.apiErrors.length && !valid ? 
                                            'Please provide CVV Number': ''
                                        }
                                    </p>
                                </div>
                        } 
                    />
                </div>
            </div>
        )
    }
}

export default classify(defaultStyles)(Authorizenet);