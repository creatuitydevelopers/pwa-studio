import React from 'react';
import { Autocomplete } from 'src/components/GoogleMaps';
import classify from 'src/classify';
import defaultClasses from './autocomplete.css';
import { shape, string, func, oneOf } from 'prop-types';
import { IoIosPin } from 'react-icons/io';

const inputPlaceholder = 'Enter ZIP or City ...';
const DISPLAY_MODE_ABOVE = 'above';
const DISPLAY_MODE_BELOW = 'below';


const LocatorAutocomplete = (props) => {

    const { classes, handleSelect, handleChange, value, suggestionDisplayMode } = props;

    const searchOptions = {
        types: ['(regions)'],
        componentRestrictions: { country: "us" }
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            onSelect={handleSelect}
            searchOptions={searchOptions}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div className={classes.actionBar}>
                    <input
                        autoFocus={true}
                        {...getInputProps({
                            placeholder: inputPlaceholder,
                            className: classes.locationSearchInput,
                        })}
                    />
                    <div className={`${classes[suggestionDisplayMode]} ${suggestions.length > 0 || !!loading ? classes.autocompleteDropdownContainerOpen : classes.autocompleteDropdownContainerClosed}`}>
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? classes.suggestionItemActive
                                : classes.suggestionItem;

                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className
                                    })}
                                >
                                    <IoIosPin className={classes.locationIcon} />
                                    <span>{suggestion.description}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </Autocomplete>
    )
}

LocatorAutocomplete.propTypes = {
    classes: shape({
        actionBar: string,
        autocompleteDropdownContainerOpen: string,
        autocompleteDropdownContainerClosed: string,
        loading: string,
        above: string,
        below: string
    }),
    value: string,
    handleSelect: func,
    handleChange: func,
    suggestionDisplayMode: oneOf([
        DISPLAY_MODE_BELOW, DISPLAY_MODE_ABOVE
    ])
}

LocatorAutocomplete.defaultProps = {
    suggestionDisplayMode: DISPLAY_MODE_BELOW
};

export default classify(defaultClasses)(LocatorAutocomplete)