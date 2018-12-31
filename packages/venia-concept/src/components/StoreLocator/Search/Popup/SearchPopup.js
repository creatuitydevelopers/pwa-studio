import React from 'react';
import { shape, string } from 'prop-types';

import classify from 'src/classify';
import Icon from 'src/components/Icon';
import Button from 'src/components/Button';
import defaultClasses from './searchPopup.css';

class SearchPopup extends React.Component {
    static propTypes = {
        classes: shape({
            root: string,
            header: string
        })
    };

    constructor(props) {
        super(props);
        this.state = {
            openSearch: true
        };
    }

    handleOpenForm = () => {
        this.setState({ openSearch: true });
    };

    handleCloseForm = () => {
        this.setState({ openSearch: false });
    };

    render() {
        const { openSearch } = this.state;
        const { classes, children } = this.props;
        let classNames = openSearch ? classes.root : classes.rootClosed;

        return (
            <div className={classNames}>
                {!!this.state.openSearch ? (
                    <React.Fragment>
                        <div className={classes.header}>
                            <h3 className={classes.headerTitle}>
                                Enter a location to find your local Rural King
                                store
                            </h3>
                            <Button
                                genre={`empty`}
                                onClick={this.handleCloseForm}
                            >
                                <Icon name="x" />
                            </Button>
                        </div>
                        {children}
                    </React.Fragment>
                ) : (
                    <div className={classes.header}>
                        <Button genre={`empty`} onClick={this.handleOpenForm}>
                            <Icon name="search" />
                        </Button>
                    </div>
                )}
            </div>
        );
    }
}

export default classify(defaultClasses)(SearchPopup);
