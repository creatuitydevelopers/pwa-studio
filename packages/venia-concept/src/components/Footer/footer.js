import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CmsBlock from 'src/components/CmsBlock';
import classify from 'src/classify';
import defaultClasses from './footer.css';



class Footer extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            banner: PropTypes.string,
            copyright: PropTypes.string,
            root: PropTypes.string,
            nav: PropTypes.string,
            social: PropTypes.string
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.root}>
                <div className={classes.banner}>
                <CmsBlock identifiers={"footer-banner"}/>
                </div>
                <div className={classes.nav}>
                <CmsBlock identifiers={"footer-nav"}/>
                </div>
                <div className={classes.social}>
                <CmsBlock identifiers={"footer-social"}/>
                </div>
                <div className={classes.copyright}>
                <CmsBlock identifiers={"footer-copyright"}/>
                </div>
            </footer>
        );
    }
}

export default classify(defaultClasses)(Footer);
