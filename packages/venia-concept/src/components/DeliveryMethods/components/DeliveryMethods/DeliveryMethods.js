import React, {Component} from "react";
import {func, object, shape, string} from "prop-types";

import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';
import DeliveryMethodsList from 'src/components/DeliveryMethods/components/DeliveryMethodsList';

class DeliveryMethods extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string,
        }),
        defaultMethod: string,
        selectedStore: object,
        product: object.isRequired,
        onChange: func.isRequired
    };

    constructor() {
        super();
        this.state = {
            methods: null,
            isLoading: true,
        };
    };

    async componentDidMount() {
        const {default: methods} = await import('src/__mocks__/delivertMethods/methods');
        this.setState({
            methods,
            isLoading: false
        });
    };

    render() {
        const {defaultMethod, currentStore, selectedStore, onChange, classes} = this.props;
        const {methods, isLoading} = this.state;

        return (
            <section className={classes.root}>
                <h2 className={classes.header}>
                    <span>DeliveryMethods</span>
                </h2>
                {!!currentStore
                    ? <DeliveryMethodsList
                        methods={methods}
                        isLoading={isLoading}
                        defaultMethod={defaultMethod}
                        selectedStore={selectedStore}
                        onChange={onChange}
                    />
                    : <p>{`To view the available delivery methods, select the current store first.`}</p>
                }
            </section>
        )
    }
}

export default classify(defaultClasses)(DeliveryMethods);