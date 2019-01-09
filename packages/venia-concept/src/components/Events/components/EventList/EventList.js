import React, {Component} from "react";
import {func, object, array, shape, string} from "prop-types";
import classify from 'src/classify';

import {Form} from "informed";
import {Title} from 'src/components/RkStore';
import {Item, ListSorter} from 'src/components/Events/';
import {SORT_DEFAULT} from 'src/components/Events/consts';

import defaultClasses from './eventList.css';

class EventList extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string,
            grid: string
        }),
        events: array
    };

    static defaultProps = {
        events: []
    };

    state = {
        sort: SORT_DEFAULT
    };

    handleSortChange = sort => {
        this.setState({sort});
    };

    getSortedItems = items => {
        return items.sort((a, b) => {
            const {sort} = this.state;

            if (sort == SORT_DEFAULT) {
                return new Date(b.event[sort]) - new Date(a.event[sort]);

            }
            return a.event[sort].localeCompare(b.event[sort]);

        });
    };

    getStore = storeNumber => this.props.allStores.filter(store => store.store_number == storeNumber)[0];

    render() {
        const {items, storeNumber, currentStore, classes} = this.props;
        const store = !!storeNumber ? this.getStore(storeNumber) : currentStore;

        return (
            <section className={classes.root}>
                <header className={classes.header}>
                    <h1 className={classes.title}>
                        <span>Upcoming Events Near You</span>
                        {!!store && <small><strong>{items.length}</strong> Events for <Title store={store} tag="span"/></small>}
                    </h1>
                    <Form className={classes.sortForm}>
                        <ListSorter handleSortChange={this.handleSortChange} defaultValue={SORT_DEFAULT}/>
                    </Form>
                </header>
                <div className={classes.grid}>{this.getSortedItems(items).map((item, index) => <Item key={index} item={item}/>)}</div>
            </section>
        )
    }

}

export default classify(defaultClasses)(EventList);
