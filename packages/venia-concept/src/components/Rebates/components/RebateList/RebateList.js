import React, {Component} from "react";
import {func, object, array, shape, string, number} from "prop-types";
import classify from 'src/classify';

import {Form} from "informed";
import {Grid} from 'src/components/RkStore';
import {Item, DetailsModal, PageSize} from 'src/components/Rebates';

import {SORT_DEFAULT} from 'src/components/Rebates/consts';

import defaultClasses from './rebateList.css';

class RebateList extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string
        }),
        items: array,
        pageSize: number
    };

    static defaultProps = {
        items: []

    };

    state = {
        sort: SORT_DEFAULT,
        modalOpen: false,
        currentItem: null
    };

    handleOpenModalClick = (item) => {
        this.setState({currentItem: item, modalOpen: true});
    };

    handleCloseModalClick = () => {
        this.setState({currentItem: null, modalOpen: false});
    };

    handleSortChange = sort => {
        this.setState({sort});
    };

    handlePageSize = pageSize => {
        this.props.setPageSize(pageSize)
    };

    getSortedItems = items => {
        return items.sort((a, b) => {
            const {sort} = this.state;

            if (sort == SORT_DEFAULT) {
                return new Date(b[sort]) - new Date(a[sort]);

            }
            return a[sort].localeCompare(b[sort]);

        });
    };

    render() {
        const {items, pageSize, classes} = this.props;
        const {modalOpen, currentItem} = this.state;

        return (
            <section className={classes.root}>
                <header className={classes.header}>
                    <h1 className={classes.title}>
                        <span>{`Manufacturer Rebates`}</span>
                    </h1>
                    <Form className={classes.sortForm}>
                        <PageSize defaultValue={pageSize} handlePageSize={this.handlePageSize}/>
                    </Form>
                </header>
                <Grid>{this.getSortedItems(items).map((item, index) => <Item key={index} item={item}
                                                                             openDetails={this.handleOpenModalClick}/>)}</Grid>

                <DetailsModal modalOpen={modalOpen} item={currentItem} closeModalClick={this.handleCloseModalClick}/>
            </section>
        )
    }

}

export default classify(defaultClasses)(RebateList);
