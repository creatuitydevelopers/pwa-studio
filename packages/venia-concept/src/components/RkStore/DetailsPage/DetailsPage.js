import React from 'react';
import { Link } from 'react-router-dom';
import classify from 'src/classify';
import defaultClasses from './detailsPage.css';
import storeImage from './image.jpg';
import { Title, ChooseStoreButton } from 'src/components/RkStore';

const DetailsPage = (props) => {

    const {
        classes,
        store,
        setCurrentStore,
        currentStore
    } = props;

    console.log(store);

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
            <div className={classes.contact}>
                <address>

                </address>
                <div className={classes.openingHours}>
                    <time itemProp="openingHours" dateTime="Mo 13:00-17:30"><span className="day">Monday:</span>   <span className="hours">13:00-17:30</span></time>
                </div>
            </div>
        </div>
    )

    
}

export default classify(defaultClasses)(DetailsPage);