import React, { PureComponent } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import geolib from 'geolib';
import {geocodeByAddress, getLatLng} from "react-places-autocomplete";
import { withRouter } from 'react-router-dom';

import classify from 'src/classify';
import Button from 'src/components/Button';
import {StoresList, Title} from 'src/components/RkStore';
import { SearchForm } from 'src/components/StoreLocator';
import {Header, StoreDetails} from 'src/components/StoreWidget';

import { findStoresWithinRadius } from 'src/models/Store';
import defaultClasses from './storeWidget.css';

const searchRadius = 50;
const searchRadiusUnit = 'mi';
const noStoresFoundMessage = `Sorry, there are no Rural King stores within ${searchRadius} miles of your search. Please try searching another location.`;

class StoreWidget extends PureComponent {

    state = {
        address: '',
        lat: null,
        lng: null,
        storesNearBy: [],
        isFindAnotherVisible: false,
        showNoStoresFound: false
    };

    async componentDidMount() {
        const { currentStore } = this.props;
        console.log(this);
        await this.props.getAllStores();
        currentStore ? this.hideFindAnother() : this.showFindAnother();
    }

    componentDidUpdate() {
        const { isOpen, currentStore } = this.props;
        if (isOpen && !currentStore) {
            this.assignNearestStore();
        }
    }

    assignNearestStore = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                const { latitude, longitude } = position.coords;
                const { setCurrentStore, allStores } = this.props;
                const nearest = await geolib.findNearest({ latitude, longitude }, allStores, 1);
                setCurrentStore(allStores[nearest.key]);
                this.hideFindAnother();
            });
        }
    }

    isUserLocationSet = () => {
        const { address, lat, lng } = this.state;
        return address && lat && lng;
    }

    hideFindAnother = () => {
        if (this.state.isFindAnotherVisible) {
            this.setState({
                isFindAnotherVisible: false
            })
        }
    }

    showFindAnother = () => {
        if (!this.state.isFindAnotherVisible) {
            this.setState({
                isFindAnotherVisible: true
            });
        }
    }

    onSelectLocation  = selected => {
        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then(({ lat, lng }) => {
                this.setState({
                    lat,
                    lng,
                    address: selected,
                }, () => this.getStoresNearBy());
            })
            .catch(error => {
                console.log('error', error); // eslint-disable-line no-console
            });
    }

    onSelectStore = () => {
        this.hideFindAnother();
        this.setState({ storesNearBy: [] })
    }

    onSearchLocation = () => {
        this.getStoresNearBy();
    }

    onFindAnother = () => {
        this.showFindAnother();
    }

    getStoresNearBy = () => {
        const foundStores = findStoresWithinRadius({
            stores: this.props.allStores,
            currentLocation: { latitude: this.state.lat, longitude: this.state.lng },
            radius: searchRadius,
            radiusUnit: searchRadiusUnit
        });
        const showNoStoresFound = foundStores.length < 1;
        this.setState({
            storesNearBy: foundStores,
            showNoStoresFound
        });
    }

    handleViewAll = () => {
        const { closeDrawer } = this.props;
        closeDrawer();
        this.props.history.push('/storelocator');
    }

    handleBack = () => {
        const { storesNearBy, showNoStoresFound, isFindAnotherVisible } = this.state;
        const { closeDrawer } = this.props;
        if (isFindAnotherVisible) {
            if (!showNoStoresFound && storesNearBy.length > 0) {
                return this.setState({ storesNearBy: [] });
            }
            return closeDrawer();
        } else {
            return this.showFindAnother();
        }
    }

    handleTitleClick = () => {
        const { currentStore } = this.props;
        if (currentStore && this.state.isFindAnotherVisible) {
            return this.hideFindAnother();
        }
    }

    get content() {
        const { props, state } = this;
        const { currentStore, classes, setCurrentStore, closeDrawer } = props;
        const showDetails = currentStore && !this.state.isFindAnotherVisible;
        const showList = state.isFindAnotherVisible && !state.showNoStoresFound;

        return (
            <React.Fragment>
                {state.showNoStoresFound && <p className={classes.noStoresFound}>{noStoresFoundMessage}</p>}
                {showDetails && <StoreDetails details={currentStore} />}
                {showList && <StoresList 
                                onSelectStore={this.onSelectStore} 
                                onDetailsClick={closeDrawer}
                                setCurrentStore={setCurrentStore} 
                                displayNumber={false} 
                                currentStore={currentStore} 
                                stores={this.state.storesNearBy}
                                direction={`column`} />
                }
            </React.Fragment>
        )
    }

    get footer() {
        const { classes } = this.props;
        return (
            <div className={classes.actionBar}>
                <Button type="button" onClick={this.handleViewAll}>View All</Button>
                {this.state.isFindAnotherVisible && <Button type="button" disabled={!this.isUserLocationSet()} onClick={() => this.onSearchLocation()}>Search</Button>}
                {!this.state.isFindAnotherVisible && <Button type="button" onClick={this.onFindAnother}>Find Another</Button>}
            </div>
        )
    }

    render() {
        const { footer, content, state } = this;
        const { classes, closeDrawer, isOpen, currentStore, allStores } = this.props;
        const className = isOpen ? classes.root_open : classes.root;
        const showForm = state.isFindAnotherVisible && allStores;

        return (
            <aside className={className}>
                <div className={classes.header}>
                    <Header onBack={this.handleBack} onClose={closeDrawer}>
                        {!!currentStore
                            ? <Title store={currentStore} onClick={this.handleTitleClick}/>
                            : <h3>{`Browse nearby Stores`}</h3>
                        }
                    </Header>
                </div>
                <div className={classes.body}>{content}</div>
                {showForm && <SearchForm showRange={false} destination={`storewidget`} handlePlaceSelect={this.onSelectLocation} />}
                <div className={classes.footer}>{footer}</div>
            </aside>
        );
    }
}

export default withRouter(classify(defaultClasses)(StoreWidget));
