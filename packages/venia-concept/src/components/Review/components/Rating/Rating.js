import React from "react";
import {bool, number, shape, string} from "prop-types";
import classify from 'src/classify';

import defaultClasses from './rating.css';

const Rating = ({classes, showAverage, placeHolder, avgRating, overallRating}) => {
    const rootClassName = `${!!showAverage ? classes.root : classes.rootWithoutAverage} ${!!placeHolder && classes.rootPlaceholder}`;
    const percent = Math.floor(avgRating * 100 / overallRating).toFixed(0);
    const ratingStyle = {width: percent + '%'};

    return (
        <div className={rootClassName}>
            <div className={classes.container} title={percent + '%'}>
                <span className={classes.stars}>
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </span>
                <span className={classes.starsOn} style={ratingStyle}>
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </span>
            </div>
            {!!showAverage && !!avgRating && <div className={classes.label}>{avgRating.toFixed(2)}</div>}
        </div>
    );
};

Rating.propTypes = {
    classes: shape({
        root: string,
        rootWithoutAverage: string,
        rootPlaceholder: string,
        label: string,
        container: string,
        stars: string,
        starsOn: string,
    }),
    showAverage: bool,
    placeHolder: bool,
    avgRating: number,
    overallRating: number
};

Rating.defaultProps = {
    showAverage: true,
    placeHolder: false,
    avgRating: 0,
    overallRating: 5
};

export default classify(defaultClasses)(Rating);