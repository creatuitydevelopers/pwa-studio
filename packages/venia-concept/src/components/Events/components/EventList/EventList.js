import React, {Component} from "react";
import {func, object, array, shape, string} from "prop-types";

import classify from 'src/classify';
import defaultClasses from './eventList.css';

import { Title } from 'src/components/RkStore';
import { ListSorter } from 'src/components/Events/components/ListSorter';
import { Item } from 'src/components/Events/components/Item';

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
        sort: 'date'
    };

    handleSortChange= sort => {
        this.setState({ sort });
    };

    render() {
        const {items, currentStore, classes} = this.props;

console.log(items);
        return (
            <section className={classes.root}>
                <h1 className={classes.header}>
                    <span>Upcoming Events Near You</span>
                </h1>
                {!!currentStore && <h2>{events.length} Events for <Title store={currentStore} tag="span"/></h2>}
                <ListSorter handleSortChange={this.handleSortChange}/>
                <div className={classes.grid}>{items.map((item, index) => <Item key={index} item={item}/>)}</div>
            </section>
        )
    }

}

export default classify(defaultClasses)(EventList);
