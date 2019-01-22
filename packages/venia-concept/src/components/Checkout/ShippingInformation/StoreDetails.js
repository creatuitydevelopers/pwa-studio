import React from 'react';
import Icon from 'src/components/Icon';
import mapPin from 'react-feather/dist/icons/map-pin';
import { getStoreByNumber } from 'src/actions/store';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import classify from 'src/classify';
import defaultClasses from './storeDetails.css';
import Item from './Item';

class StoreDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            store: {}
        }
    }

    async componentDidMount() {
        const { storeNumber } = this.props;
        const store = await getStoreByNumber(storeNumber);
        this.setState({
            store
        });
    }

    render() {
        const { items, currencyCode, classes } = this.props;
        const { store } = this.state;

        return !!store ?

            <div>
                <p className={classes.name}>
                    <Icon src={mapPin} className={classes.icon} />
                    <strong>{store.store_name}</strong>
                </p>
                {
                    items.map((item,idx) => {
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