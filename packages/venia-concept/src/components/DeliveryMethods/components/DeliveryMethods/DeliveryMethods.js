import React, {Component} from "react";
import {func, object, shape, string} from "prop-types";

import classify from 'src/classify';
import defaultClasses from './deliveryMethods.css';
import DeliveryMethodsList from 'src/components/DeliveryMethods/components/DeliveryMethodsList';

class DeliveryMethods extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string
        }),
        defaultMethod: string,
        selectedStore: object,
        product: object.isRequired,
        onChange: func.isRequired
    };

    state = {
        error: null,
        methods: [],
        isLoading: true
    };


    async componentDidMount() {
        const {product, selectedStore, currentStore} = this.props;
        const store = !!selectedStore ? selectedStore : currentStore;

        if(!store){
            this.setState({
                methods: [],
                isLoading: false
            });

            return;
        }

        await fetch(`/rest/V1/delivery-method/product-delivery-methods/${product.id}/${store.store_number}`)
            .then(response => {
                if(response.ok){
                    return response.json();
                }else{
                    this.setState({
                        error: response,
                        isLoading: false
                    })
                }
            })
            .then(data => {
                const methods = JSON.parse(data);

                if(!!methods.length && methods[0].data.enabled.includes(store.store_number)){
                    this.props.onChange(methods[0].type, store)
                }

                this.setState({
                    methods,
                    isLoading: false
                })
            }).catch( err => {
                console.log(err);
                console.log(this.state.error);
            });
    };

    render() {
        const {defaultMethod, currentStore, selectedStore, onChange, classes} = this.props;
        const {methods, isLoading} = this.state;
        const store = !!selectedStore ? selectedStore : currentStore;

        return (
            <section className={classes.root}>
                <h2 className={classes.header}>
                    <span>Delivery Methods</span>
                </h2>
                {!!store
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