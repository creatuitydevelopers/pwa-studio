import React from 'react';
import Autocomplete from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';

export default GoogleApiWrapper({
    apiKey: GOOGLE_MAPS_API_KEY
})(Autocomplete);
