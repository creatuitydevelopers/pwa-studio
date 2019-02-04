import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import { loadingIndicator } from 'src/components/LoadingIndicator';

class Palces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            place: null,
            error: false
        };
    }

    componentDidMount() {
        this.loadPlace();
    }

    loadPlace() {
        if (this.props && this.props.google) {
            const { google, lat, lng, radius, searchString } = this.props;
            const ratingRef = this.refs.googlePlacesRating;
            const node = ReactDOM.findDOMNode(ratingRef);
            const rkStore = new google.maps.LatLng(lat, lng);
            const request = {
                location: rkStore,
                radius: radius,
                query: searchString
            };

            let service = new google.maps.places.PlacesService(node);
            service.textSearch(request, this.getResults.bind(this));
        }
    }

    getResults(result, status) {
        const { google } = this.props;
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.setState({
                isLoading: false,
                place: result[0]
            });
        } else {
            this.setState({
                isLoading: false,
                error: status
            });
        }
    }

    render() {
        const { props, state } = this;

        return (
            <React.Fragment>
                <div ref="googlePlacesRating" />
                {props.children(state)}
            </React.Fragment>
        );
    }
}

Palces.propTypes = {
    google: PropTypes.object,
    lat: PropTypes.number,
    lng: PropTypes.number,
    radius: PropTypes.number,
    searchString: PropTypes.string
};

const LoadingContainer = props => <div>{loadingIndicator}</div>;

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY,
    LoadingContainer: LoadingContainer,
    libraries: ['places']
})(Palces);
