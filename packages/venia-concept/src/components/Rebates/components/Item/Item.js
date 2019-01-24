import React, {Component} from "react";
import classify from 'src/classify';
import moment from 'moment';
import {func, oneOf, object, shape, string} from "prop-types";

import RichText from 'src/components/RichText';

import { BACKEND_URL, IMAGE_PATH } from 'src/components/Rebates/consts';

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
        item: object
    };

    render() {

        const {classes, item} = this.props;
        const {title, expiration_date, description} = item;

        const date = moment(new Date(expiration_date));

        return (
            <div className={classes.root}>
                <a onClick={() => this.props.openDetails(item)} className={classes.imageWrapper}>
                    {this.renderImage()}
                </a>
                <div className={classes.details}>
                    <a onClick={() => this.props.openDetails(item)} className={classes.name}>
                        <span>{title}</span>
                    </a>
                    <RichText className={classes.description} content={!!description && description.replace(/(<([^>]+)>)/ig, "")}/>
                    <div>
                        <strong>{`Expires`}:</strong> <span>{date.format("MMMM DD, YYYY")}</span>
                    </div>
                </div>
            </div>
        );
    }

    renderImage = () => {
        const {classes, item} = this.props;
        const image = item.image;

        if (!image) {
            return null;
        }

        return (
            <img
                className={classes.image}
                src={image}
                alt={item.title}
            />
        );
    };
};


export default classify(defaultClasses)(Item);