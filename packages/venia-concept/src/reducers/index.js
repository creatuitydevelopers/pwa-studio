import { combineReducers } from 'redux';

import app from './app';
import cart from './cart';
import catalog from './catalog';
import checkout from './checkout';
import directory from './directory';
import user from './user';
import purchaseDetails from './purchaseDetails';
import checkoutReceipt from './checkoutReceipt';
import purchaseHistory from './purchaseHistory';
import store from './store';
import rebates from './rebates';
import upcomingEvents from './upcomingEvents';

export default combineReducers({
    app,
    cart,
    catalog,
    checkout,
    checkoutReceipt,
    store,
    rebates,
    directory,
    purchaseDetails,
    purchaseHistory,
    upcomingEvents,
    user
});
