import React from 'react';
import { Link } from 'react-router-dom';
import classify from 'src/classify';
import defaultClasses from './detailsPage.css';
import storeImage from './image.jpg';
import { Title, ChooseStoreButton } from 'src/components/RkStore';

const tConv24 = (time24) => {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

const DetailsPage = (props) => {

    const {
        classes,
        store,
        setCurrentStore,
        currentStore
    } = props;

    const {
        address,
        city, 
        zipcode, 
        state,
        phone,
        email,
        schedule,
        store_manager
    } = store;
    
    return (
        <div className={classes.root}>
            <figure className={classes.header}>
                <img className={classes.image} src={storeImage} />
                <figcaption className={classes.caption}>
                    <Title
                        store={store}
                        tag={`h1`}
                        className={classes.title}
                    />
                    <ChooseStoreButton
                        title={`Make This My Store`}
                        store={store}
                        currentStore={currentStore}
                        setCurrentStore={setCurrentStore}
                        size={`big`}
                        genre={`secondary`}
                    />
                    <Link to={`/storelocator/`} className={classes.captionLink}>Find a Different Store</Link>
                </figcaption>
            </figure>

            <div className={classes.address}>
                <h3><strong>Address</strong></h3>
                <ul>
                    {address && <li>{address}</li>}
                    <li>{city}, {state} {zipcode}</li>
                </ul>
            </div>

            <div className={classes.contact}>
                <ul>
                    <li><strong>Phone: </strong><a href={`tel:${phone}`}>{phone}</a></li>
                    <li><strong>Email: </strong><a href={`mailto:${email}`}>{email}</a></li>
                </ul>
            </div>

            <div className={classes.openingHours}>
                <h3><strong>Hours</strong></h3>
                <table>
                    <tbody>
                        {schedule.map((el, idx) => 
                            <tr key={idx}>
                                <td>{el.day}:</td>
                                <td>{tConv24(el.open)} - {tConv24(el.close)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className={classes.manager}>
                <h3><strong>Manager</strong></h3>
                <ul>
                    <li>{store_manager}</li>
                </ul>
            </div>
        </div>
    )

    
}

export default classify(defaultClasses)(DetailsPage);