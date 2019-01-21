import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import getQueryParameterValue from 'src/util/getQueryParameterValue';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import { RebateList } from 'src/components/Rebates';



class Rebates extends Component {
    static propTypes = {
        classes: shape({
            noResult: string,
            root: string,
            totalPages: string
        }),
        history: object,
        location: object.isRequired,
        match: object
    };

    render() {
        const { location } = this.props;
        const storeNumber = parseInt(getQueryParameterValue({
            location,
            queryParameter: 'store'
        }));

        const items =[
            {
                rebate: {
                    id: 1,
                    name: 'Rebate 1',
                    description: 'lorem ipsum',
                    date_start: '2019-01-01',
                    date_exp: '2019-01-04'
                },
                attachments: []
            },
            {
                rebate: {
                    id: 2,
                    name: 'Rebate 2',
                    description: 'lorem ipsum',
                    date_start: '2019-01-01',
                    date_exp: '2019-01-04'
                },
                attachments: []
            },
            {
                rebate: {
                    id: 3,
                    name: 'Rebate 3',
                    description: 'lorem ipsum',
                    date_start: '2019-01-01',
                    date_exp: '2019-01-04'
                },
                attachments: []
            },
            {
                rebate: {
                    id: 4,
                    name: 'Rebate 4',
                    description: 'lorem ipsum',
                    date_start: '2019-01-01',
                    date_exp: '2019-01-04'
                },
                attachments: []
            }];

        return <RebateList items={items} />
    }
}

export default Rebates;
