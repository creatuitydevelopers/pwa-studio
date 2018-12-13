import React from 'react';
import classify from 'src/classify';
import defaultClasses from './radiusSlider.css';
import debounce from 'lodash/debounce';
import { string, shape, number } from 'prop-types';

class SearchRadius extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.initialVal
        }
        this.changed = debounce(this.props.changed, 250);
    }

    handleChange = e => {
        const val = e.target.value;

        this.setState({ value: val }, () => {
            this.changed(val)
        })
    }

    render() {
        const { 
            classes, 
            min, 
            max, 
            step 
        } = this.props;

        return (
            <div className={classes.root}>
                <input type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={this.state.value}
                    onChange={this.handleChange} />
                <span className={classes.label}>{this.state.value} Mi</span>
            </div>
        )
    }
}

SearchRadius.propTypes = {
    classes: shape({
        root: string,
        label: string
    }),
    min: number,
    max: number,
    step: number
}

export default classify(defaultClasses)(SearchRadius);