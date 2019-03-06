import React from 'react';
import {number, shape, string} from 'prop-types';
import classify from 'src/classify';

import Icon from 'src/components/Icon';
import ChevronDownIcon from 'react-feather/dist/icons/chevron-down';
import ChevronUpIcon from 'react-feather/dist/icons/chevron-up';

import defaultClasses from './tabs.css';

class Tabs extends React.Component {

    static propTypes = {
        classes: shape({
            content: string,
            header: string,
            root: string,
            tab: string
        }),
        defaultActive: number
    };

    state = {
        activeTab: this.props.defaultActive || 0
    };

    render() {
        const {classes, children} = this.props;

        return (
            <div className={classes.root}>
                {
                    React.Children.map(React.Children.toArray(children), (item, key) => {
                        if(!item || item.type.displayName != 'Tab') return null;

                        return (
                            <div key={key} className={classes.tab}>
                                <div className={classes.header} onClick={() => this.setState({activeTab: key})}>
                                    {item.props.title}
                                    <Icon src={key === this.state.activeTab ? ChevronUpIcon : ChevronDownIcon} size={24} />
                                </div>
                                {key === this.state.activeTab &&
                                <div className={classes.content}>
                                    {React.Children.toArray(children)[this.state.activeTab]}
                                </div>}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default classify(defaultClasses)(Tabs);
