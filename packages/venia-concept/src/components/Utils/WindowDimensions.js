import React from 'react';
import { debounce } from 'lodash';

export default class WindowDimensions extends React.Component {

    constructor(props) {
        super(props)
        this.state = { width: '0', height: '0' }
        this.initUpdateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.updateWindowDimensions = debounce(this.updateWindowDimensions.bind(this), 100)
    }

    componentDidMount() {
        this.initUpdateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { width, height } = this.state;
        return this.props.children({ width, height });
    }
}