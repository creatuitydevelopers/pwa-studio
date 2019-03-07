import React, { Component } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';

import Button from 'src/components/Button';
import classify from 'src/classify';
import defaultClasses from './quantity.css';
import Icon from 'src/components/Icon';
import PlusIcon from 'react-feather/dist/icons/plus';
import MinusIcon from 'react-feather/dist/icons/minus';

const buttonStyles = {
    minWidth: 0,
    width: '2.5rem'
};

class Quantity extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            label: string
        }),
        items: arrayOf(
            shape({
                value: number
            })
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.initialValue
        };
    }

    handleChange = event => {
        let val = event.target.value;
        if (!isNaN(val)) {
            this.setState(
                {
                    value: val ? parseInt(val) : ''
                },
                this.setVal
            );
        }
    };

    increase = () => {
        this.setState(({ value }) => {
            const newVal = value ? value + 1 : 1;
            return {
                value: newVal
            };
        }, this.setVal);
    };

    decrease = () => {
        this.setState(({ value }) => {
            return {
                value: value < 2 ? 1 : value - 1
            };
        }, this.setVal);
    };

    setVal = () => {
        const { onValueChange } = this.props;
        onValueChange(this.state.value);
    };

    render() {
        const { handleChange, increase, decrease } = this;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <label className={classes.label} htmlFor={`quantity`} aria-label={"Quantity"}>Quantity</label>
                <Button onClick={decrease} style={buttonStyles} aria-label="Decrease quantity">
                    <Icon src={MinusIcon} size={15} />
                </Button>
                <input
                    className={classes.input}
                    type="text"
                    id={`quantity`}
                    onChange={handleChange}
                    value={this.state.value}
                    pattern="\d{1,5}"
                    name={`quantity`}
                />
                <Button onClick={increase} style={buttonStyles} aria-label="Increase quantity">
                    <Icon src={PlusIcon} size={15} />
                </Button>
            </div>
        );
    }
}

export default classify(defaultClasses)(Quantity);
