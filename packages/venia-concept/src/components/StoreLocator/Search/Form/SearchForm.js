import React from 'react';
import { oneOf, shape, string, bool } from 'prop-types';
import classify from 'src/classify';
import Button from 'src/components/Button';
import Select from 'src/components/Select';
import { Autocomplete, RadiusSlider } from 'src/components/StoreLocator';
import defaultClasses from './searchForm.css';

const STORELOCATOR_DEST = 'storelocator';
const STOREWIDGET_DEST = 'storewidget';
const DELIVERY_METHOD_DEST = 'deliveryMethod';

const RANGE_STYLE_RANGE = 'range';
const RANGE_STYLE_DROPDOWN = 'dropdown';

const RANGE_DROPDOWN_OPTIONS = [
    {
        id: '5',
        value: '5',
        label: 'Within 5 miles'
    },
    {
        id: '10',
        value: '10',
        label: 'Within 10 miles'
    },
    {
        id: '25',
        value: '25',
        label: 'Within 25 miles'
    },
    {
        id: '50',
        value: '50',
        label: 'Within 50 miles'
    },
    {
        id: '100',
        value: '100',
        label: 'Within 100 miles'
    },
    {
        id: '200',
        value: '200',
        label: 'Within 200 miles'
    }
];

class SearchForm extends React.Component {
    static propTypes = {
        classes: shape({
            root: string,
            rootStoreLocator: string,
            rootStoreWidget: string,
            rootDeliveryMethods: string
        }),
        destination: oneOf([
            STORELOCATOR_DEST,
            STOREWIDGET_DEST,
            DELIVERY_METHOD_DEST
        ]),
        showRange: bool,
        rangeStyle: oneOf([RANGE_STYLE_RANGE, RANGE_STYLE_DROPDOWN])
    };

    static defaultProps = {
        destination: STORELOCATOR_DEST,
        showRange: true,
        rangeStyle: RANGE_STYLE_RANGE
    };

    constructor(props) {
        super(props);
        this.state = {
            radius: this.props.radius,
            searchText: ''
        };
    }

    handleRadiusChange = radius => {
        this.setState({ radius }, () => {
            this.props.onRadiusChange(radius);
        });
    };

    handlePlaceSelect = selected => {
        this.setState({ searchText: selected });
        this.props.handlePlaceSelect(this.state.searchText);
    };

    handlePlaceChange = selected => {
        this.setState({ searchText: selected });
    };

    handleSearchPlace = () => {
        this.props.handlePlaceSelect(this.state.searchText);
    };

    handleResetStoreLocator = () => {
        this.setState({ searchText: '', radius: this.props.radius });
        this.props.handlePlaceSelect('');
    };

    get rangeContent() {
        const { rangeStyle, radius } = this.props;

        return rangeStyle == RANGE_STYLE_RANGE ? (
            <RadiusSlider
                changed={this.handleRadiusChange}
                initialVal={radius}
                map={this.props.map}
                min={1}
                step={1}
                max={150}
            />
        ) : (
            <div>
                <Select
                    items={RANGE_DROPDOWN_OPTIONS}
                    value={this.state.radius}
                    onChange={this.handleRadiusChange}
                />
            </div>
        );
    }

    render() {
        const { classes, destination, showRange } = this.props;
        const rootClassName = [classes.root];

        destination === STORELOCATOR_DEST &&
            rootClassName.push(classes.rootStoreLocator);
        destination === STOREWIDGET_DEST &&
            rootClassName.push(classes.rootStoreWidget);
        destination === DELIVERY_METHOD_DEST &&
            rootClassName.push(classes.rootDeliveryMethods);

        return (
            <div className={rootClassName.join(' ')}>
                <Autocomplete
                    handleSelect={this.handlePlaceSelect}
                    handleChange={this.handlePlaceChange}
                    value={this.state.searchText}
                    suggestionDisplayMode={
                        destination === STOREWIDGET_DEST ? `above` : `below`
                    }
                />
                {!!showRange && this.rangeContent}
                {destination !== STOREWIDGET_DEST && (
                    <div className={classes.actions}>
                        <Button onClick={this.handleSearchPlace}>Search</Button>
                        {destination === STORELOCATOR_DEST && (
                            <Button
                                onClick={this.handleResetStoreLocator}
                                genre={'secondary'}
                            >
                                View all stores
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default classify(defaultClasses)(SearchForm);
