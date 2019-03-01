import React from 'react';

const flippContainerId = 'flipp-container';

const loadIframe = () => {
    var aScript = document.createElement('script');
        aScript.type = 'text/javascript';
        aScript.src = "https://circular.ruralking.com/hosted_services/iframe.js";
        document.head.appendChild(aScript);
        window.addEventListener('load', function() {
            if (wishabi) {
                wishabi.hostedservices.iframe.decorate(
                    flippContainerId,
                    'ruralking',
                    wishabi.hostedservices.iframe.Sizing.PAGE,
                    {
                        minHeight: 600,
                        initialHeight: 600,
                        extraPadding: 0,
                        queryParameters: ''
                    }
                );
            }
        })
}

class Weeklyad extends React.Component {

    componentDidMount() {
        loadIframe();
    }

    render() {
        return (
            <div id={`${flippContainerId}`}></div>
        )
    }
}

export default Weeklyad;