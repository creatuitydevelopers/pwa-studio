import React, { Component } from 'react';
import { func, object, array, shape, string } from 'prop-types';
import classify from 'src/classify';

import { Form } from 'informed';
import { Grid, Title } from 'src/components/RkStore';
import { Item, ListSorter, DetailsModal } from 'src/components/Events/';
import defaultClasses from './eventList.css';

class EventList extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string,
            title: string,
            sortForm: string
        }),
        events: array
    };

    static defaultProps = {
        events: []
    };

    state = {
        modalOpen: false,
        currentItem: null
    };

    handleOpenModalClick = item => {
        this.setState({ currentItem: item, modalOpen: true });
    };

    handleCloseModalClick = () => {
        this.setState({ currentItem: null, modalOpen: false });
    };
    
    getStore = storeNumber => this.props.allStores.filter(store => store.store_number == storeNumber)[0];

    render() {
        const {
            items,
            totalItems,
            storeNumber,
            currentStore,
            allStores,
            defaultSort,
            handleSortChange,
            classes
        } = this.props;

        const { modalOpen, currentItem } = this.state;

        const store = !!storeNumber ? this.getStore(storeNumber) : currentStore;

        return (
            <section className={classes.root}>
                <header className={classes.header}>
                    <h1 className={classes.title}>
                        <span>Upcoming Events Near You</span>
                        {!!store && (
                            <small>
                                <strong>{totalItems.length}</strong> Events for{' '}
                                <Title store={store} tag="span" />
                            </small>
                        )}
                    </h1>
                    <Form className={classes.sortForm}>
                        <ListSorter
                            handleSortChange={handleSortChange}
                            defaultValue={defaultSort}
                        />
                    </Form>
                </header>
                <Grid>
                    {items.map((item, index) => (
                        <Item
                            key={index}
                            item={item}
                            stores={allStores}
                            openDetails={this.handleOpenModalClick}
                        />
                    ))}
                </Grid>
                <DetailsModal
                    modalOpen={modalOpen}
                    item={currentItem}
                    stores={allStores}
                    closeModalClick={this.handleCloseModalClick}
                />
            </section>
        );
    }
}

export default classify(defaultClasses)(EventList);
