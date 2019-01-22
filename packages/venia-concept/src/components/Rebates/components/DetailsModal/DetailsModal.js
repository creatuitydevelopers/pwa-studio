import React, {Component} from "react";
import classify from 'src/classify';
import moment from 'moment';
import {bool, func, oneOf, object, shape, string} from "prop-types";
import Modal from 'react-responsive-modal';
import Button from 'src/components/Button';
import RichText from 'src/components/RichText';

import defaultClasses from './detailsModal.css';

class DetailsModal extends Component {

    static propTypes = {
        classes: shape({
            root: string,
            modalHeader: string,
            description: string
        }),
        item: object,
        modalOpen: bool,
        closeModalClick: func.isRequired
    };

    render() {
        const {modalOpen, item, classes} = this.props;

        const dateStart = !!item && moment(new Date(item.rebate.date_start));
        const dateExp = !!item && moment(new Date(item.rebate.date_exp));

        return (
            <Modal
                open={modalOpen}
                onClose={this.props.closeModalClick}
                classNames={{
                    modal: classes.root
                }}
                focusTrapped>
                {!!item &&
                <React.Fragment>
                    <h2 className={classes.modalHeader}>{item.rebate.name}</h2>
                    <p>
                        {`Offer valid from`} <strong>{dateStart.format("MMMM DD, YYYY")}</strong> {`through`} <strong>{dateExp.format("MMMM DD, YYYY")}</strong>
                    </p>
                    <p>{`Must be submitted by:`} <strong>{dateExp.format("MMMM DD, YYYY")}</strong></p>
                    <RichText className={classes.description}
                              content={!!item.rebate.description && item.rebate.description.replace(/(<([^>]+)>)/ig, "")}/>
                    <p>
                        <Button priority={`high`}>{`Download rebate form`}</Button>
                    </p>
                </React.Fragment>
                }
            </Modal>
        )
    }
}

export default classify(defaultClasses)(DetailsModal);