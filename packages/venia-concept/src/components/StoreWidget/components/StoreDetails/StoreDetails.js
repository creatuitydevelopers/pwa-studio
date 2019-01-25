import React from 'react';
import { IoMdNavigate, IoIosCall } from 'react-icons/io';
import classify from 'src/classify';
import { Map, Marker } from 'src/components/GoogleMaps';
import { MyStoreBadge } from 'src/components/RkStore';
import { getScheduleForToday } from 'src/models/Store';
import defaultClasses from './storeDetails.css';

const DIRECTIONS_URL = 'https://www.google.com/maps/dir/';

const StoreDetails = ({ classes, details }) => {
    const hours = getScheduleForToday(details);

    const getDirections = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
                const {
                    longitude, 
                    latitude
                } = details;
                const { coords } = position;
                return window.open(`${DIRECTIONS_URL}${coords.latitude},${coords.longitude}/${latitude},${longitude}/`);
            })
        }
    }

    return (
        <React.Fragment>
            <div style={{ height: '300px', position: 'relative' }}>
                <Map
                    minZoom={3}
                    style={{ height: '300px' }}
                    disableDefaultUI={true}
                    initialCenter={{
                        lat: details.latitude,
                        lng: details.longitude
                    }}
                >
                    <Marker
                        shouldRender={true}
                        position={{
                            lat: details.latitude,
                            lng: details.longitude
                        }}
                    />
                </Map>
            </div>
            <div className={classes.sticky}>
                <a href="#" onClick={getDirections} className={classes.buttonSticky}>
                    <IoMdNavigate />
                </a>
                <a
                    href={`tel:${details.phone}`}
                    className={classes.buttonSticky}
                >
                    <IoIosCall />
                </a>
            </div>
            <div className={classes.content}>
                <MyStoreBadge style={{ width: '100%' }} />
            </div>

            <div className={classes.content}>
                <h3 className={classes.detailsHeading}>
                    <strong>Address:</strong>
                </h3>
                <p>{details.address}</p>
                <p>
                    {details.city}, {details.state} {details.zipcode}
                </p>

                <h3 className={classes.detailsHeading}>
                    <strong>Contact Info:</strong>
                </h3>
                <p>
                    <a href={`tel:${details.phone}`}>{details.phone}</a>
                </p>
                <p>
                    <a href={`mailto:${details.email}`}>{details.email}</a>
                </p>

                <h3 className={classes.detailsHeading}>
                    <strong>Other Info:</strong>
                </h3>
                {!!hours && 
                    <p>
                        <strong>Opening Hours: </strong>
                        {hours.open} - {hours.close}
                    </p>
                }
                <p>
                    <strong>Store Manager: </strong>
                    {details.store_manager}
                </p>
            </div>
        </React.Fragment>
    );
};

export default classify(defaultClasses)(StoreDetails);
