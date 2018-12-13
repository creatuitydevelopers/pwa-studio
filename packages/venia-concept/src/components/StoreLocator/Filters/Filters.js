import React from 'react';
import classify from 'src/classify';
import defaultClasses from './filters.css';

const selectAll = 'Select All';

class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeFilters: [],
            allStores: props.stores
        }
    }

    getFilters = () => {
        const { stores, filterList } = this.props;

        return stores.reduce((previousValue, currentValue, ) => {
            let arr = [];
            let tags = currentValue[filterList];
            tags = tags.split(',');
            tags.forEach(tag => {
                if(previousValue.indexOf(tag) === -1) {
                    arr.push(tag);
                }
            });   
            return [
                ...previousValue,
                ...arr
            ]
        }, [selectAll]);
    }

    handleFilterSelect = (filter) => {
        const {activeFilters} = this.state;
        if(filter === selectAll) {
            this.setState({
                activeFilters: []
            }, this.filterStores);
            return;
        }

        if(activeFilters.includes(filter)) {
            this.setState({
                activeFilters: this.state.activeFilters.filter(activeFilter => {
                    return activeFilter !== filter;
                })
            }, this.filterStores);
        } else {
            const [...activeFilters] = this.state.activeFilters;
            this.setState({
                activeFilters: [...activeFilters, filter]
            }, this.filterStores)
        }
    }

    filterStores = () => {
        let stores = [];
        if(this.state.activeFilters.length > 0) {
            stores = this.state.allStores.filter(store => {
                let tags = store.tags.split(',');
                return this.state.activeFilters.some(filter => tags.includes(filter)) ? store : false;
            });
        } else {
            stores = this.state.allStores;
        }    
        this.props.onFilter(stores);
    }

    isFilterActive = (filter) => {
        if(filter === selectAll && this.state.activeFilters.length === 0) {
            return true;
        }
        return this.state.activeFilters.includes(filter);
    }

    render() {
        const {classes} = this.props;

        return (
            <ul className={classes.root}>
                {this.getFilters().map(filter => {
                    return (
                        <li 
                            key={filter} 
                            className={this.isFilterActive(filter) ? classes.active : classes.item} 
                            onClick={ () => this.handleFilterSelect(filter)}
                        >{filter}</li>
                    )
                })}
            </ul>
        )
    }
}

Filters.propTypes = {

}

export default classify(defaultClasses)(Filters);
