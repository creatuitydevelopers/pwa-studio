import React from 'react';
import PropTypes from 'prop-types';

import { arePathsEqual } from './lib/arePathsEqual';
import { camelize } from './lib/String';
const evtNames = ['click', 'mouseout', 'mouseover'];

const wrappedPromise = function () {
  var wrappedPromise = {},
    promise = new Promise(function
      (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
}

export class Circle extends React.Component {
  componentDidMount() {
    this.circlePromise = wrappedPromise();
    this.renderCircle();
  }

  componentDidUpdate(prevProps) {
    const { path, map } = this.props;

    if (
      this.propsChanged(prevProps) ||
      map !== prevProps.map ||
      !arePathsEqual(path, prevProps.path)
    ) {
      this.destroyCircle();
      this.renderCircle();
    }
  }

  centerChanged = (newCenter) => {
    const { lat, lng } = this.props.center;
    return lat !== newCenter.lat || lng !== newCenter.lng;
  };

  radiusChanged = (newRadius) => {
    const { radius } = this.props;
    return radius !== newRadius;
  };

  propsChanged = (newProps) => {
    if (this.centerChanged(newProps.center)) return true;
    if (this.radiusChanged(newProps.radius)) return true;
    return false;
  };

  componentWillUnmount() {
    this.destroyCircle();
  }

  destroyCircle = () => {
    if (this.circle) {
      this.circle.setMap(null);
    }
  }

  renderCircle() {
    const {
      map,
      google,
      center,
      radius,
      strokeColor,
      strokeOpacity,
      strokeWeight,
      fillColor,
      fillOpacity,
      draggable,
      visible,
      ...props
    } = this.props;

    if (!google) {
      return null;
    }

    const params = {
      ...props,
      map,
      center,
      radius,
      draggable,
      visible,
      options: {
        strokeColor,
        strokeOpacity,
        strokeWeight,
        fillColor,
        fillOpacity,
      },
    };

    this.circle = new google.maps.Circle(params);

    evtNames.forEach(e => {
      this.circle.addListener(e, this.handleEvent(e));
    });

    this.circlePromise.resolve(this.circle);
  }

  getCircle() {
    return this.circlePromise;
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.circle, e);
      }
    }
  }

  render() {
    return null;
  }
}

Circle.propTypes = {
  center: PropTypes.object,
  radius: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeOpacity: PropTypes.number,
  strokeWeight: PropTypes.number,
  fillColor: PropTypes.string,
  fillOpacity: PropTypes.number,
  draggable: PropTypes.bool,
  visible: PropTypes.bool,
}

Circle.defaultProps = {
  name: 'Circle'
}

export default Circle
