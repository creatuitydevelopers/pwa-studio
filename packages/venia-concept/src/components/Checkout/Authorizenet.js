import React from 'react';
import classify from 'src/classify';
import defaultStyles from './Authorizenet.css';
import { bool, func, shape, string } from 'prop-types';

import { FormContainer } from 'react-authorize-net-forked';
import { Number, Cvc, Expiration } from 'react-credit-card-primitives'

let clientKey = 'sdasdas';
let apiLoginId = 'asdasdasdsdasdas';

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
        isError: false
    };

    render() {
        const {
            props: {
                isRequestingPaymentNonce,
                onSuccess,
                onError,
                classes
            }
        } = this;


        return (
            <div className={classes.root}>
                <FormContainer
                    environment="sandbox"
                    onError={() => {}}
                    onSuccess={() => {}}
                    amount={23}
                    clientKey={clientKey}
                    apiLoginId={apiLoginId}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        validationErrors,
                        apiErrors
                    }) => {
                        console.log(values);

                        return (
                            <Number
                                onChange={({value, valid}) => console.log(`${value}, ${valid}`)}
                                masked={true}
                                render={({
                                    getInputProps,
                                    valid
                                }) => <input {...getInputProps()} name={`cardNumber`} className={valid ? '' : 'error'} />} 
                            />
                        )
                    }}
                </FormContainer>
            </div>
        )
    }
}

export default classify(defaultStyles)(Authorizenet);