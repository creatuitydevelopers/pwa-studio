import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'src/drivers';

import Icon from 'src/components/Icon';
import ChevronDownIcon from 'react-feather/dist/icons/chevron-down';

import classify from 'src/classify';
import defaultClasses from './footer.css';



class Footer extends Component {
    static propTypes = {
        classes: PropTypes.shape({
            banner: PropTypes.string,
            bottom: PropTypes.string,
            col: PropTypes.string,
            root: PropTypes.string,
            nav: PropTypes.string,
            navSection: PropTypes.string,
            navHeader: PropTypes.string,
            navContent: PropTypes.string,
            navList: PropTypes.string,
            openTab: PropTypes.string,
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

    state = {
        openedTab: null,
    };

    handleTabClick = tab => {
        console.log(tab);
        this.setState(prevState => ({ openedTab: prevState.openedTab != tab ? tab : null }));
    };

    render() {
        const {state} = this;
        const { classes } = this.props;

        return (
            <footer className={classes.root}>
                <section className={classes.banner}>
                    <div>Family Owned & Operated</div>
                    <div>Overt 110 Stores in 13 States</div>
                    <div>Over 100,000 Products</div>
                </section>
                <section className={classes.nav}>
                    <div className={classes.col}>
                        <section className={[classes.navSection, state.openedTab == 'company_info' ? classes.openTab : null].join(' ')}>
                            <header className={classes.navHeader}>
                                <button onClick={() => this.handleTabClick('company_info')}>
                                    Company Information
                                    <Icon src={ChevronDownIcon} size={18} />
                                </button>
                            </header>
                            <div className={classes.navContent}>
                                <ul className={classes.navList}>
                                    <li><Link to={`/about-us`} title="About Us">About Us</Link></li>
                                    <li><Link to={`/events`} title="Events & Workshops">Events & Workshops</Link></li>
                                    <li><Link to={`/weeklyad`} title="Current Ad">Current Ad</Link></li>
                                    <li><Link to={`/privacy-policy`} title="Privacy Policy">Privacy Policy</Link></li>
                                    <li><Link to={`/pricing-promise`} title=" Pricing Promise"> Pricing Promise</Link></li>
                                </ul>
                            </div>
                        </section>
                    </div>
                    <div className={classes.col}>
                        <section className={[classes.navSection, state.openedTab == 'custom_service' ? classes.openTab : null].join(' ')}>
                            <header className={classes.navHeader}>
                                <button onClick={() => this.handleTabClick('custom_service')}>
                                    Customer Service
                                    <Icon src={ChevronDownIcon} size={18} />
                                </button>
                            </header>
                            <div className={classes.navContent}>
                                <ul className={classes.navList}>
                                    <li><Link to={`/returns`} title="Return Policy">Return Policy</Link></li>
                                    <li><Link to={`/shipping`} title="Shipping">Shipping</Link></li>
                                    <li><Link to={`/warranty`} title="Warranty">Warranty</Link></li>
                                    <li><Link to={`/rebates`} title="Manufacturer Rebates">Manufacturer Rebates</Link></li>
                                    <li><Link to={`/recall`} title="Safety Recall Information">Safety Recall Information</Link></li>
                                    <li><Link to={`/tax-exempt`} title="Tax Exempt Information">Tax Exempt Information</Link></li>
                                </ul>
                            </div>
                        </section>
                    </div>
                    <div className={classes.col}>
                        <section className={[classes.navSection, state.openedTab == 'shop_with' ? classes.openTab : null].join(' ')}>
                            <header className={classes.navHeader}>
                                <button onClick={() => this.handleTabClick('shop_with')}>
                                    Shop with confidence
                                    <Icon src={ChevronDownIcon} size={18} />
                                </button>
                            </header>
                            <div className={classes.navContent}>
                                <ul className={classes.navList}>
                                    <li><Link to={`/security`} title="100% Secure Ordering">100% Secure Ordering</Link></li>
                                    <li><Link to={`/terms`} title="Terms &amp; Conditions">Terms &amp; Conditions</Link></li>
                                    <li><a rel="nofollow" target="_blank" href="https://nortonshoppingguarantee.symantec.com/shoppers/" title="Norton Shopping Guarantee">Norton Shopping Guarantee</a></li>
                                    <li><a rel="nofollow" target="_blank" href="http://www.shopperapproved.com/customer-review/ruralking.com/3833460" title="Customer Reviews">Customer Reviews</a></li>
                                </ul>
                            </div>
                        </section>
                    </div>
                    <div className={classes.col}>
                        <section className={[classes.navSection, state.openedTab == 'resources' ? classes.openTab : null].join(' ')}>
                        <header className={classes.navHeader}>
                            <button onClick={() => this.handleTabClick('resources')}>
                                Resources
                                <Icon src={ChevronDownIcon} size={18} />
                            </button>
                        </header>
                        <div className={classes.navContent}>
                            <ul className={classes.navList}>
                                <li><a href="#"  rel="nofollow" target="_blank" title="Rural King Blog">Rural King Blog</a></li>
                                <li><Link to={`/battery-finder`} title="100% Secure Ordering">Battery Finder</Link></li>
                                <li><Link to={`/belt-finder`} title="100% Secure Ordering">Belt Finder</Link></li>
                                <li><Link to={`/notice-of-sales-and-use-tax-information-for-customers`} title="Sales and Use Tax Info">Sales and Use Tax Info</Link></li>
                            </ul>
                        </div>
                    </section>
                    </div>
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
                    <div className={classes.copyright}>© 2019 Rural King. All Rights Reserved. Built by <a rel="noreferrer" href="https://creatuity.com/" title="Creatuity" target="_blank">Creatuity</a> with <a rel="noreferrer" href="https://github.com/magento-research/pwa-studio/" target="_blank" title="Magento PWA Studio">Magento PWA Studio</a>.</div>
                    <div className={classes.norton}>
                        <div className={classes.nortonBox}></div>
                    </div>
                </section>
            </footer>
        );
    }
}

export default classify(defaultClasses)(Footer);
