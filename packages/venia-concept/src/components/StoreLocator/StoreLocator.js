import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classify from 'src/classify';
import { findStoresWithinRadius } from 'src/models/Store';
import { setCurrentStore, getAllStores } from 'src/actions/store';
import { StoresList } from 'src/components/RkStore';
import defaultClasses from './storeLocator.css';
import { MapContainer, Filters } from 'src/components/StoreLocator';
import WindowDimensions from 'src/components/Utils/WindowDimensions';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { SearchPopup, SearchForm } from 'src/components/StoreLocator';
import { loadingIndicator } from 'src/components/LoadingIndicator';

export const mobileViewport = 560;
const searchRadiusUnit = 'mi';

const initialState = {
    address: null,
    radiusLatitude: null,
    radiusLongitude: null,
    radius: 50,
    latitude: 39.7345203,
    longitude: -84.2594939,
    selectedPlace: {},
    zoom: 9,
    isGeocoding: false
};

class StoreLocator extends React.Component {
    
    state = {
        allStores: this.props.allStores,
        ...initialState
    };

    async componentDidMount() {
        !this.props.allStores ? await getAllStores() : null;
    }

    componentDidUpdate() {
        if (this.props.allStores && !this.state.allStores) {
            this.setState({
                allStores: this.props.allStores
            });
        }
    }

    handleRadiusChange = radius => {
        if (!!this.state.address) {
            this.setState({ radius });
        }
    };

    handleDetailsClick = () => {
        window.scrollTo(0, 0);
    };

    handlePlaceSelect = selected => {
        if (!selected) {
            this.setState({
                ...initialState
            });
            return;
        }

        geocodeByAddress(selected)
            .then(res => getLatLng(res[0]))
            .then(({ lat, lng }) => {
                this.setState({
                    address: selected,
                    latitude: lat,
                    longitude: lng,
                    isGeocoding: false,
                    radiusLatitude: lat,
                    radiusLongitude: lng,
                    zoom: 9
                });
            })
            .catch(error => {
                this.setState({ isGeocoding: false });
            });
    };

    handleFilter = stores => {
        this.setState({
            allStores: stores
        });
    };

    get Filters() {
        const { allStores } = this.state;
        return (
            !!allStores && (
                <WindowDimensions>
                    {({ width }) => {
                        if (width > mobileViewport) {
                            return (
                                <Filters
                                    stores={this.props.allStores}
                                    filterList={`tags`}
                                    onFilter={this.handleFilter}
                                />
                            );
                        } else {
                            return <React.Fragment />;
                        }
                    }}
                </WindowDimensions>
            )
        );
    }

    get StoresList() {
        const { allStores } = this.state;
        const { currentStore, setCurrentStore } = this.props;
        const { address } = this.state;
        let stores;

        if (!allStores) {
            return loadingIndicator;
        }

        if (
            !address ||
            (!this.state.radiusLatitude || !this.state.radiusLongitude)
        ) {
            stores = allStores;
        } else {
            stores = findStoresWithinRadius({
                stores: allStores,
                currentLocation: {
                    latitude: this.state.radiusLatitude,
                    longitude: this.state.radiusLongitude
                },
                radius: this.state.radius,
                radiusUnit: searchRadiusUnit
            });
        }

        return (
            <StoresList
                stores={stores}
                onDetailsClick={this.handleDetailsClick}
                currentStore={currentStore}
                setCurrentStore={setCurrentStore}
                displayNumber={true}
                direction={`row`}
            />
        );
    }

    get Map() {
        const {
            allStores,
            radius,
            radiusLatitude,
            radiusLongitude,
            latitude,
            longitude,
            selectedPlace,
            address,
            zoom
        } = this.state;
        const { currentStore, setCurrentStore } = this.props;

        return allStores ? (
            <WindowDimensions>
                {({ width }) => {
                    if (width > mobileViewport) {
                        return (
                            <MapContainer
                                allStores={allStores}
                                currentStore={currentStore}
                                setCurrentStore={setCurrentStore}
                                radius={radius}
                                latitude={latitude}
                                longitude={longitude}
                                address={address}
                                zoom={zoom}
                                selectedPlace={selectedPlace}
                                radiusLatitude={radiusLatitude}
                                radiusLongitude={radiusLongitude}
                            />
                        );
                    } else {
                        return <React.Fragment />;
                    }
                }}
            </WindowDimensions>
        ) : (
            <React.Fragment />
        );
    }

    render() {
        const {
            Map,
            StoresList,
            Filters,
            handleRadiusChange,
            handlePlaceSelect,
            state,
            props
        } = this;
        const { classes } = props;
        const { radius } = state;

        return (
            <div className={classes.root}>
                <div className={classes.mapContainer}>{Map}</div>
                <SearchPopup>
                    <SearchForm
                        radius={radius}
                        onRadiusChange={handleRadiusChange}
                        handlePlaceSelect={handlePlaceSelect}
                    />
                </SearchPopup>
                <div className={classes.filters}>{Filters}</div>
                <div className={classes.storeListContainer}>{StoresList}</div>
            </div>
        );
    }
}

const mapStateToProps = ({ store }) => {
    const { currentStore, allStores } = store;
    return {
        allStores,
        currentStore
    };
};

const mapDispatchToProps = {
    getAllStores,
    setCurrentStore
};

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(StoreLocator);
