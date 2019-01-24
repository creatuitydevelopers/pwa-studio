import React from 'react';
import Icon from 'src/components/Icon';
import mapPin from 'react-feather/dist/icons/map-pin';
import chevronDown from 'react-feather/dist/icons/chevron-down';
import chevronUp from 'react-feather/dist/icons/chevron-up';
import { getStoreByNumber } from 'src/actions/store';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import classify from 'src/classify';
import defaultClasses from './storeDetails.css';
import Item from './Item';

class StoreDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            store: {},
            detailsVisible: false
        }
    }

    async componentDidMount() {
        const { storeNumber } = this.props;
        const store = await getStoreByNumber(storeNumber);
        this.setState({
            store
        });
    }

    toggleContent = () => {
        this.setState(prevState => {
            return {
                detailsVisible: !prevState.detailsVisible
            }
        })
    }

    render() {
        const { toggleContent, props, state } = this;
        const { items, currencyCode, classes } = props;
        const { store, detailsVisible } = state;
        const detailsClass = detailsVisible ? classes.detailsVisible : classes.detailsHidden;
        const triggerChevron = detailsVisible ? chevronUp : chevronDown;

        return !!store ?

            <div>
                <div className={classes.name} onClick={toggleContent}>
                    <Icon src={mapPin} className={classes.icon} />
                    <strong>{store.store_name}</strong>
                    <Icon src={triggerChevron} className={classes.chevron} />
                </div>
                <ul className={detailsClass}>
                    <li>{store.address}</li>
                    <li>{store.company_name} {store.zipcode}</li>
                    <li>{store.phone}</li>
                </ul>
                {
                    items.map((item, idx) => {
                        return <Item key={idx} currencyCode={currencyCode} item={item} />
                    })
                }
                <div></div>
            </div>
            :
            loadingIndicator;

    }
}

export default classify(defaultClasses)(StoreDetails);