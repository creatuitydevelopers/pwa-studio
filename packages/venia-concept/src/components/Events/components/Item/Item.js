import React,  { Component } from "react";
import moment from 'moment';
import {func, oneOf, shape, string} from "prop-types";
import classify from 'src/classify';
import defaultClasses from './item.css';
import {Link} from "react-router-dom";
import { transparentPlaceholder } from 'src/shared/images';
import RichText from 'src/components/RichText';

const imageWidth = '300';
const imageHeight = '372';

class Item extends Component {

    static propTypes = {
        classes: shape({
            root: string,
            images: string,
            name: string,
            description: string,
            link: string
        })
    };

    render(){

        const {classes, item} = this.props;
        const {id, name, date_start, description} = item.event;

        const link = `/event/${id}`;

        var date = moment(new Date(date_start));
        return (
            <div className={classes.root}>
                <Link to={link} className={classes.image}>
                    {/*{this.renderImagePlaceholder()}*/}
                    {/*{this.renderImage()}*/}
                    {!!item.attachments.length ? `dasdasdasd` : `as`}
                </Link>
                <div className={classes.details}>
                    <Link to={link} className={classes.name}>
                        <span>{name}</span>
                    </Link>
                    <p>{date.format("dddd, L | LT")}</p>
                    <div className={classes.storesWrapper}>
                        {!!item.stores.length
                            &&
                            <span>stores</span>
                        }
                    </div>
                    <RichText className={classes.description} content={description} />
                    <div className={classes.linkWrapper}>
                        <Link to={link} className={classes.link}>
                            <span>{`Event Details >`}</span>
                        </Link>
                    </div>
                </div>
                <div className={classes.badge}>
                    <span className={classes.badgeMonth}>{date.format("MMM")}</span>
                    <span className={classes.badgeDay}>{date.format("D")}</span>
                </div>
            </div>
        );
    }

    renderImagePlaceholder = () => {
        const { classes, item } = this.props;

        const className = item
            ? classes.imagePlaceholder
            : classes.imagePlaceholder_pending;

        return (
            <img
                className={className}
                src={transparentPlaceholder}
                alt=""
                width={imageWidth}
                height={imageHeight}
            />
        );
    };
};


export default classify(defaultClasses)(Item);