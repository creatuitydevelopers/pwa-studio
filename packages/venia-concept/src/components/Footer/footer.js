import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classify from 'src/classify';
import defaultClasses from './footer.css';



class Footer extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            banner: PropTypes.string,
            bottom: PropTypes.string,
            root: PropTypes.string,
            nav: PropTypes.string,
            navSection: PropTypes.string,
            navHeader: PropTypes.string,
            navContent: PropTypes.string,
            navList: PropTypes.string,
            social: PropTypes.string,
            socialHeader: PropTypes.string,
            socialLinks: PropTypes.string,
            socialIconFacebook: PropTypes.string,
            socialIconTwitter: PropTypes.string,
            socialIconInstagram: PropTypes.string,
            socialIconPinterest: PropTypes.string,
            bottomNav: PropTypes.string,
            copyright: PropTypes.string,
            norton: PropTypes.string,
            nortonBox: PropTypes.string
        })
    };

    render() {
        const { classes } = this.props;

        return (
            <footer className={classes.root}>
                <section className={classes.banner}>
                    <div>Family Owned & Operated</div>
                    <div>Overt 110 Stores in 13 States</div>
                    <div>Over 100,000 Products</div>
                </section>
                <section className={classes.nav}>
                    <section className={classes.navSection}>
                        <header className={classes.navHeader}>Company Information</header>
                        <div className={classes.navContent}>
                            <ul className={classes.navList}>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                            </ul>
                        </div>
                    </section>
                    <section className={classes.navSection}>
                        <header className={classes.navHeader}>Customer Service</header>
                        <div className={classes.navContent}>
                            <ul className={classes.navList}>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                            </ul>
                        </div>
                    </section>
                    <section className={classes.navSection}>
                        <header className={classes.navHeader}>Shop with confidence</header>
                        <div className={classes.navContent}>
                            <ul className={classes.navList}>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                            </ul>
                        </div>
                        <header className={classes.navHeader}>Resources</header>
                        <div className={classes.navContent}>
                            <ul className={classes.navList}>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                                <li><a href="#" title="">Lorem ipsum</a></li>
                            </ul>
                        </div>
                    </section>
                </section>
                <section className={classes.social}>
                    <h3 className={classes.socialHeader}>Connect with us Socially</h3>
                    <div className={classes.socialLinks}>
                        <a href="http://www.facebook.com/ruralking" target="_blank" rel="noreferrer"
                           className={classes.socialIconFacebook}>Facebook</a>
                        <a href="http://twitter.com/ruralkingsupply" target="_blank" rel="noreferrer"
                           className={classes.socialIconTwitter}>Twitter</a>
                        <a href="https://www.instagram.com/ruralkingsupply/?hl=en" target="_blank" rel="noreferrer"
                           className={classes.socialIconInstagram}>Instagram</a>
                        <a href="https://www.pinterest.com/ruralkingsupply/" target="_blank" rel="noreferrer"
                           className={classes.socialIconPinterest}>Pinterest</a>
                    </div>
                </section>
                <section className={classes.bottom}>
                    <div className={classes.bottomNav}>
                        <ul>
                            <li><a href="#" title={`Security & Privacy`}>Security & Privacy</a></li>
                            <li><a href="#" title={`Terms & Conditions`}>Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className={classes.copyright}>© 2019 Rural King. All Rights Reserved.</div>
                    <div className={classes.norton}>
                        <div className={classes.nortonBox}></div>
                    </div>
                </section>
            </footer>
        );
    }
}

export default classify(defaultClasses)(Footer);
