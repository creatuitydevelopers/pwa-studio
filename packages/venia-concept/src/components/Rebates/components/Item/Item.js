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
        const {name, date_start, date_exp, description} = item.rebate;

        const date = moment(new Date(date_exp));

        return (
            <div className={classes.root}>
                <a onClick={() => this.props.openDetails(item)} className={classes.imageWrapper}>
                    {this.renderImage()}
                </a>
                <div className={classes.details}>
                    <a onClick={() => this.props.openDetails(item)} className={classes.name}>
                        <span>{name}</span>
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

        if (!item) {
            return null;
        }

        const image = item.attachments.filter(file => file.attachment_type == 2)[0];

        if (!image) {
            return null;
        }

        return (
            <img
                className={classes.image}
                src={`${BACKEND_URL}/${IMAGE_PATH}/${image.file}`}
                alt={item.event.name}
            />
        );
    };
};


export default classify(defaultClasses)(Item);