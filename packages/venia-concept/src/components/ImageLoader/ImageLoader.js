import React, {Component} from "react";

import "./imageLoader.global.css";

const _loaded = {};

class ImageLoader extends Component {

    //initial state: image loaded stage
    state = {
        loaded: _loaded[this.props.src]
    };

    //define our loading and loaded image classes
    static defaultProps = {
        className: "",
        width: '',
        height: '',
        alt: '',
        loadingClassName: "img-loading",
        loadedClassName: "img-loaded"
    };

    //image onLoad handler to update state to loaded
    onLoad = () => {
        _loaded[this.props.src] = true;
        this.setState(() => ({ loaded: true }));
    };

    complete = () => {
        console.log('wjezdza');
    }


    render() {

        let { className, loadedClassName, loadingClassName } = this.props;

        className = `${className} ${this.state.loaded
            ? loadedClassName
            : loadingClassName}`;

        return <img
            src={this.props.src}
            className={className}
            onLoad={this.onLoad}
            alt={this.props.alt}
            width={this.props.width}
            height={this.props.height}
        />;
    }
}

export default ImageLoader;