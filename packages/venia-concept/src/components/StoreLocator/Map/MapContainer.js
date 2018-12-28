import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, InfoWindow, Circle } from 'src/components/GoogleMaps';
import { ChooseStoreButton, Info, StoreDetailsButton, Title as StoreTitle } from 'src/components/RkStore';
import classify from 'src/classify';
import defaultClasses from './mapContainer.css';
import markerIcon from 'src/components/StoreLocator/marker.png';
import markerActiveIcon from 'src/components/StoreLocator/markerActive.png';
import {Link} from "react-router-dom";

const mapHeight = '600px';
const metersInMile = 1609.34;


class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeMarker: {},
            showingInfoWindow: false,
            errorMessage: '',
            selectedPlace: this.props.selectedPlace,
        }
    }

    onMarkerClick = (props, marker) => {
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });
    }

    onInfoWindowClose = () => {
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });
    }

    onInfoWindowOpen = () => {
        const buttons = this.StoreButtons;
        ReactDOM.render(React.Children.only(buttons), document.getElementById("storeButtons"));
    }

    get StoreButtons() {
        const selectedStore = this.state.selectedPlace.store;
        const { setCurrentStore, currentStore } = this.props;

        return (
            <React.Fragment>
                <StoreDetailsButton
                    store={selectedStore}
                    size={`small`}
                    useStandardLink={true}
                    style={{ marginBottom: '5px' }} />
                <ChooseStoreButton
                    store={selectedStore}
                    currentStore={currentStore}
                    setCurrentStore={setCurrentStore}
                    size="small"
                />
            </React.Fragment>
        )
    }

    get InfoWindowContent() {
        const {state: {selectedPlace: {store}}, props: {classes}} = this;
        const selectedStore = store;

        return selectedStore ? 
            <React.Fragment>
                <a href={`/storelocator/${store.rewrite_request_path}`}>
                    <StoreTitle store={selectedStore} />
                </a>
                <Info store={selectedStore} />
                <div id="storeButtons" className={classes.infoWindowButtons}>
                    {this.StoreButtons}
                </div>
            </React.Fragment>
            : <React.Fragment/>
    }

    get Markers() {
        const { allStores, currentStore } = this.props;
        if (allStores) {
            return allStores.map(details => {
                const icon = currentStore && currentStore.storelocator_id === details.storelocator_id ? markerActiveIcon : markerIcon;
                const { storelocator_id, store_number } = details;

                return <Marker
                    key={storelocator_id}
                    store={details}
                    onClick={this.onMarkerClick}
                    shouldRender={true}
                    icon={icon}
                    label={{
                        text: `${store_number}`,
                        color: 'white',
                        fontWeight: 'bold',
                        fontFamily: 'korolev'
                    }}
                    position={{ lat: details.latitude, lng: details.longitude }}
                />
            })
        }
    }

    render() {
        const {latitude, longitude, radiusLatitude, radiusLongitude, radius, address} = this.props;
        const { zoom } = this.props;
        const radiusMiles = radius * metersInMile;
        const position = { lat: radiusLatitude, lng: radiusLongitude };
        const showRadius = radiusLatitude && radiusLongitude && !!address;
        return (
            <Map
                style={{ height: mapHeight }}
                initialCenter={{ lat: latitude, lng: longitude }}
                center={{ lat: latitude, lng: longitude }}
                zoom={zoom}
                streetViewControl={false}
                mapTypeControl={false}
            >
                {this.Markers}
                <InfoWindow
                    marker={this.state.activeMarker}
                    onClose={this.onInfoWindowClose}
                    visible={this.state.showingInfoWindow}
                    onOpen={e => {
                        this.onInfoWindowOpen(
                            this.props, 
                            this.state.selectedPlace
                        );
                    }}>
                    {this.InfoWindowContent}
                </InfoWindow>
                {showRadius &&
                    <Circle
                        center={position}
                        radius={radiusMiles}
                        strokeWeight={1}
                        strokeColor={'#000'}
                        strokeOpacity={0.2}
                        fillColor={'rgb(169 ,0 ,0)'}
                        fillOpacity={0.1}
                    />
                }
            </Map>
        )
    }
}

export default classify(defaultClasses)(MapContainer)