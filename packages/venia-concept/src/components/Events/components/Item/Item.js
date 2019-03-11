import React, { Component } from 'react';
import classify from 'src/classify';
import moment from 'moment';
import { func, oneOf, object, shape, string } from 'prop-types';

import ImageLoader from 'src/components/ImageLoader';
import RichText from 'src/components/RichText';
import Title from 'src/components/RkStore/Title/Title';

import { BACKEND_URL, IMAGE_PATH } from 'src/components/Events/consts';

import defaultClasses from './item.css';

class Item extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            imageWrapper: string,
            images: string,
            details: string,
            name: string,
            description: string,
            storesWrapper: string,
            storeAnchor: string,
            storeListWrapper: string,
            linkWrapper: string,
            link: string,
            badge: string,
            badgeMonth: string,
            badgeDay: string
        }),
        item: object,
        openDetails: func.isRequired
    };

    render() {
        const { classes, item, stores } = this.props;
        const { id, name, date_start, description } = item;

        const date = moment(new Date(date_start));

        const itemStores = item.stores
            .map(storeNumber => {
                return stores.filter(
                    store => store.store_number == storeNumber
                )[0];
            })
            .filter(store => !!store);

        return (
            <div className={classes.root}>
                <a
                    onClick={() => this.props.openDetails(item)}
                    className={classes.imageWrapper}
                >
                    {this.renderImage()}
                </a>
                <div className={classes.details}>
                    <a
                        onClick={() => this.props.openDetails(item)}
                        className={classes.name}
                    >
                        <span>{name}</span>
                    </a>
                    <p>{date.format('dddd, L | LT')}</p>
                    <div className={classes.storesWrapper}>
                        {!!item.stores.length && (
                            <React.Fragment>
                                <span className={classes.storeAnchor}>
                                    See all event stores
                                </span>
                                <div className={classes.storesListWrapper}>
                                    <ul>
                                        {itemStores.map(store => (
                                            <li key={store.store_number}>
                                                <Title
                                                    store={store}
                                                    tag={`span`}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    <RichText
                        className={classes.description}
                        content={
                            !!description &&
                            description.replace(/(<([^>]+)>)/gi, '')
                        }
                    />
                    <div className={classes.linkWrapper}>
                        <a
                            onClick={() => this.props.openDetails(item)}
                            className={classes.link}
                        >
                            <span>{`Event Details >`}</span>
                        </a>
                    </div>
                </div>
                <div className={classes.badge}>
                    <span className={classes.badgeMonth}>
                        {date.format('MMM')}
                    </span>
                    <span className={classes.badgeDay}>{date.format('D')}</span>
                </div>
            </div>
        );
    }

    renderImage = () => {
        const { classes, item } = this.props;

        if (!item) {
            return null;
        }

        const image = item.attachments.filter(
            file => file.attachment_type == 2
        )[0];

        if (!image) {
            return null;
        }

        return (
            <ImageLoader
                className={classes.image}
                src={`${BACKEND_URL}/${IMAGE_PATH}/${image.file}`}
                alt={item.name}
            />
        );
    };
}

export default classify(defaultClasses)(Item);
