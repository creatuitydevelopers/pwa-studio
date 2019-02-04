import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { object, array, bool, shape, string, func } from 'prop-types';

import classify from 'src/classify';
import {
    isCurrentStoreEnabledForSts,
    getStoreListForStsMethod,
    getDefaultRadius
} from 'src/models/DeliveryMethods';

import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import { SearchForm } from 'src/components/StoreLocator';
import StoresList from 'src/components/DeliveryMethods/components/StoresList';
import mapPin from 'react-feather/dist/icons/map-pin';

import defaultClasses from './shipToStoreOption.css';

class ShipToStoreOption extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            badge: string,
            label: string,
            pinIcon: string,
            radioInput: string,
            title: string,
            details: string,
            positiveMessage: string,
            alertMessage: string,
            separator: string,
            storeName: string,
            selectStoreButton: string,
            modal: string,
            modalHeader: string
        }),
        methodCode: string.isRequired,
        deliveryMessage: string,
        selectedStore: object,
        currentStore: object,
        allStores: array,
        isChecked: bool,
        onChange: func.isRequired
    };

    static defaultProps = {
        isChecked: false
    };

    state = {
        address: '',
        radius: getDefaultRadius(),
        latitude: 39.758949,
        longitude: -84.191605,
        modalOpen: false
    };

    handleRadiusChange = radius => {
        this.setState({ radius });
    };

    handlePlaceSelect = selected => {
        this.setState({ address: selected });

        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then(({ lat, lng }) => {
                this.setState({
                    latitude: lat,
                    longitude: lng
                });
            })
            .catch(error => {
                console.log('error', error); // eslint-disable-line no-console
            });
    };

    handleMethodChange = event => {
        const { methodInfo, currentStore, selectedStore } = this.props;
        const store = !!selectedStore ? selectedStore : currentStore;

        isCurrentStoreEnabledForSts({ allowedStores: methodInfo.stores, store })
            ? this.props.onChange(event.target.value, store)
            : this.setState({ modalOpen: true });
    };

    handleOpenModalClick = () => {
        this.setState({ modalOpen: true });
    };

    handleCloseModalClick = () => {
        this.setState({ modalOpen: false });
    };

    handleSelectStoreClick = store => {
        this.props.onChange(this.props.methodCode, store);
        this.setState({ modalOpen: false });
    };

    get inventoryMessage() {
        const {
            methodInfo,
            deliveryMessage,
            classes,
            currentStore,
            selectedStore
        } = this.props;
        const store = !!selectedStore ? selectedStore : currentStore;

        if (!store) {
            return (
                <span className={classes.alertMessage}>
                    <Icon src={mapPin} className={classes.pinIcon} />
                    <span>{`Please select a store to view availabilty`}</span>
                </span>
            );
        }

        if (
            isCurrentStoreEnabledForSts({
                allowedStores: methodInfo.stores,
                store
            })
        ) {
            return (
                <span>
                    <Icon src={mapPin} className={classes.pinIcon} />
                    <span className={classes.storeName}>
                        {store.company_name}
                    </span>
                    <span>
                        <span className={classes.separator}>|</span>
                        <span className={classes.positiveMessage}>
                            {deliveryMessage}
                        </span>
                    </span>
                </span>
            );
        }

        return (
            <span className={classes.alertMessage}>
                <Icon src={mapPin} className={classes.pinIcon} />
                <span>{`This item is not available for Ship to Store to ${
                    store.company_name
                }`}</span>
            </span>
        );
    }

    get detailsRender() {
        const {
            methodInfo,
            currentStore,
            selectedStore,
            allStores,
            classes
        } = this.props;
        const { latitude, longitude, radius, modalOpen } = this.state;

        const store = !!selectedStore ? selectedStore : currentStore;
        return (
            <div>
                <p>{this.inventoryMessage}</p>
                <p>
                    <Button
                        size={`small`}
                        priority={`normalSecondary`}
                        onClick={this.handleOpenModalClick}
                    >
                        {!!store ? `Choose Another Store` : `Select store`}
                    </Button>
                </p>
                <Modal
                    open={modalOpen}
                    onClose={this.handleCloseModalClick}
                    classNames={{
                        modal: classes.modal
                    }}
                    focusTrapped
                >
                    <h2 className={classes.modalHeader}>
                        Check Availability at Stores
                    </h2>
                    <SearchForm
                        radius={this.state.radius}
                        destination={`deliveryMethod`}
                        rangeStyle={`dropdown`}
                        onRadiusChange={this.handleRadiusChange}
                        handlePlaceSelect={this.handlePlaceSelect}
                    />
                    <StoresList
                        stores={getStoreListForStsMethod({
                            stores: allStores,
                            latitude,
                            longitude,
                            radius,
                            methodInfo
                        })}
                        onStoreSelectClick={this.handleSelectStoreClick}
                    />
                </Modal>
            </div>
        );
    }

    render() {
        const { methodCode, isChecked, classes } = this.props;
        const inputId = `delivery_method-${methodCode}`;

        return (
            <li className={classes.root}>
                <label className={classes.label} htmlFor={inputId}>
                    <input
                        id={inputId}
                        type="radio"
                        name="delivery_method"
                        className={classes.radioInput}
                        value={methodCode}
                        checked={isChecked}
                        onChange={this.handleMethodChange}
                    />
                    <span className={classes.title}>
                        <span className={classes.badge}>Free</span>
                        Ship To Store
                    </span>
                </label>
                <div className={classes.details}>{this.detailsRender}</div>
            </li>
        );
    }
}

export default classify(defaultClasses)(ShipToStoreOption);
