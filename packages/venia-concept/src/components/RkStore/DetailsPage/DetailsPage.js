import React from 'react';
import { Link } from 'react-router-dom';
import classify from 'src/classify';
import defaultClasses from './detailsPage.css';
import storeImage from './image.jpg';
import { Title, ChooseStoreButton } from 'src/components/RkStore';
import { object, func } from 'prop-types';
import {Rating} from 'src/components/Review'
import {Places} from 'src/components/GoogleMaps';
import moment from 'moment';
import { loadingIndicator } from 'src/components/LoadingIndicator';

const tConv24 = time24 => {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = H % 12 || 12;
    h = h < 10 ? '0' + h : h; // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? ' AM' : ' PM';
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
};

const getDates = (startDate, stopDate) => {
    let dateArray = [];
    let currentDate = moment(startDate);
    let endDate = moment(stopDate);
    while (currentDate <= endDate) {
        dateArray.push(moment(currentDate).format('dddd Do MMMM'));
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
};

const DetailsPage = props => {
    const { classes, store, setCurrentStore, currentStore } = props;

    const {
        address,
        city,
        zipcode,
        state,
        phone,
        email,
        schedule,
        store_manager,
        specialdays,
        upcoming_events,
        holidays,
        tags
    } = store;

    const Heading = ({ title }) => (
        <h2>
            <strong>{title}</strong>
        </h2>
    );

    const sectionClass = (cssClass = null) => {
        const classNames = [classes.section];
        cssClass ? classNames.push(classes[cssClass]) : classNames;
        return classNames.join(' ');
    };

    return (
        <div className={classes.root}>
            <figure className={classes.header}>
                <img className={classes.image} src={storeImage} />
                <figcaption className={classes.caption}>
                    <Title store={store} tag={`h1`} className={classes.title} />
                    <ChooseStoreButton
                        title={`Make This My Store`}
                        store={store}
                        currentStore={currentStore}
                        setCurrentStore={setCurrentStore}
                        size={`big`}
                        priority={`highSecondary`}
                    />
                    <Link to={`/storelocator/`} className={classes.captionLink}>
                        Find a Different Store
                    </Link>
                </figcaption>
            </figure>

            <div className={classes.leftColumn}>
                <div className={sectionClass('address')}>
                    <Heading title={`Address`} />
                    <div className={classes.sectionContent}>
                        <ul>
                            {address && <li>{address}</li>}
                            <li>
                                {city}, {state} {zipcode}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={sectionClass('contact')}>
                    <div className={classes.sectionContent}>
                        <ul>
                            <li>
                                <strong>Phone: </strong>
                                <a href={`tel:${phone}`}>{phone}</a>
                            </li>
                            <li>
                                <strong>Email: </strong>
                                <a href={`mailto:${email}`}>{email}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={sectionClass('openingHours')}>
                    <Heading title={`Hours`} />
                    <div className={classes.sectionContent}>
                        <table>
                            <tbody>
                                {schedule.map((el, idx) => (
                                    <tr key={idx}>
                                        <td>{el.day}:</td>
                                        <td>
                                            {tConv24(el.open)} - {tConv24(el.close)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={sectionClass('manager')}>
                    <Heading title={`Manager`} />
                    <div className={classes.sectionContent}>
                        <ul>
                            <li>{store_manager}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.centerColumn}>
                <div className={sectionClass(`events`)}>
                    <Heading title={`Upcoming Events`} />
                    <div className={classes.sectionContent}>
                        {!!upcoming_events.length ? (
                            <React.Fragment>
                                <ul className={classes.eventsList}>
                                    {upcoming_events.map((upEvent, idx) => (
                                        <li key={idx}>
                                            <div>
                                                <strong>
                                                    {upEvent.day_name},{' '}
                                                    {upEvent.month}/{upEvent.day}
                                                </strong>
                                            </div>
                                            <div>
                                                <span>
                                                    <strong>{upEvent.name}</strong>
                                                </span>
                                                <br />
                                                <span>
                                                    {upEvent.time_start} -{' '}
                                                    {upEvent.time_end}
                                                </span>
                                                <br />
                                                <span className={classes.red}><strong>More Info ›</strong></span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <Link to={`/events`}>See All Events</Link>
                            </React.Fragment>
                        ) : (
                            <div>
                                There are no upcoming events at {city}, {state}.
                            </div>
                        )}
                    </div>
                </div>
                {!!holidays.length && 
                    <div className={sectionClass('holidays')}>
                        <div className={classes.sectionContent}>
                            <ul>
                                {holidays.map(holiday => (
                                    <li key={holiday.holiday_id}>
                                        <Heading title={holiday.holiday_name} />
                                        <ul>
                                            { getDates(holiday.date_from,holiday.date_to).map((date, idx) => (
                                                <li key={idx}>
                                                    <div><strong>{date}</strong></div>
                                                    <div><strong className={classes.red}>closed</strong></div>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }

            </div>
            <div className={classes.rightColumn}>
                {!!tags.length &&
                    <div className={sectionClass('services')}>
                        <Heading title={`Store Services`} />
                        <div className={classes.sectionContent}>
                            <ul>
                                {tags.map((tag, idx) => 
                                    <li key={idx}>
                                        {tag.tag_icon && <img src={tag.tag_icon} alt={tag.tag_name} />}
                                        <p>{tag.tag_name}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
                <div className={sectionClass('rating')}>
                    <Heading title={`${store.city}, ${store.state} Google Review Score`} />
                    <div className={classes.sectionContent}>
                        <Places 
                            lat={store.latitude} 
                            lng={store.longitude}
                            radius={500}
                            searchString={`Rural King`}
                        >
                            { ({isLoading, place}) => 
                                { return isLoading ? 
                                    <div>{loadingIndicator}</div>
                                    :
                                    <div className={classes.ratingContainer}>
                                        <Rating avgRating={place.rating} />
                                        <a href={`https://search.google.com/local/writereview?placeid=${place.place_id}`} target="blank">Leave a Review</a>
                                    </div>
                                }
                            }
                        </Places>
                    </div>
                </div>
            </div>
        </div>
    );
};

DetailsPage.propTypes = {
    classes: object,
    store: object,
    setCurrentStore: func,
    currentStore: object
}

export default classify(defaultClasses)(DetailsPage);
