import React from 'react';
import classify from 'src/classify';
import defaultClasses from './info.css';
import { getScheduleForToday } from 'src/models/Store';
import { shape, string } from 'prop-types';

const Info = ({ classes, store }) => {
    const { address, city, zipcode, phone, store_manager, state } = store;

    const schedule = getScheduleForToday(store);

    return (
        <ul className={classes.root}>
            {address && <li>{address}</li>}
            <li>
                {city}, {state} {zipcode}
            </li>
            {phone && (
                <li>
                    <a href={`tel:${phone}`}>{phone}</a>
                </li>
            )}
            {!!schedule && 
                <li>
                    <strong>Hours:</strong>{schedule.open} - {schedule.close}
                </li>
            }
            {store_manager && (
                <li>
                    <strong>Store Manager:</strong> {store_manager}
                </li>
            )}
        </ul>
    );
};

Info.propTypes = {
    classes: shape({
        root: string
    }),
    store: shape({
        address: string,
        city: string,
        state: string,
        zipcode: string,
        phone: string,
        store_manager: string
    })
};

export default classify(defaultClasses)(Info);
