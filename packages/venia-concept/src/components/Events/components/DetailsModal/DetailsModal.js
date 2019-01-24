import React, { Component } from 'react';
import classify from 'src/classify';
import moment from 'moment';
import { bool, func, oneOf, object, shape, string } from 'prop-types';
import Modal from 'react-responsive-modal';
import RichText from 'src/components/RichText';
import { Title } from 'src/components/RkStore';
import { BACKEND_URL, IMAGE_PATH } from 'src/components/Events/consts';

import defaultClasses from './detailsModal.css';

class DetailsModal extends Component {
    static propTypes = {
        classes: shape({
            root: string,
            modalHeader: string,
            image: string,
            description: string,
            storesListWrapper: string
        }),
        item: object,
        modalOpen: bool,
        closeModalClick: func.isRequired
    };

    get content() {
        const {item, stores, classes } = this.props;

        if(!item){
            return null;
        }

        const {name, date_start, date_end, description } = item.event;
        const dateStart = moment(new Date(date_start));
        const dateEnd = moment(new Date(date_end));
        const itemStores = item.stores
            .map(storeNumber => {
                return stores.filter(
                    store => store.store_number == storeNumber
                )[0];
            })
            .filter(store => !!store);

        return (
            <React.Fragment>
                {this.renderImage()}
                <h2 className={classes.modalHeader}>{name}</h2>
                <p><strong>{`Date`}:</strong> {dateStart.format('MMMM DD, YYYY')}</p>
                <p><strong>{`Time`}:</strong> {dateStart.format('LT')} - {dateEnd.format('LT')}</p>
                {!!item.stores.length && (
                    <div className={classes.storesListWrapper}>
                        <p><strong>{`Location`}:</strong></p>
                        <ul>
                            {itemStores.map(store => (
                                <li key={store.store_number}>
                                    <Title
                                        store={store}
                                        tag={`span`}
                                    /> | #{store.store_number}<br/>
                                    {store.address}<br/>
                                    {store.city}, {store.state}<br/>
                                    {store.phone}<br/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <RichText
                    className={classes.description}
                    content={!!description && description.replace(/(<([^>]+)>)/gi, '')}
                />
            </React.Fragment>
        );
    }

    renderImage = () => {
        const { classes, item } = this.props;

        if (!item) {
            return null;
        }

        const image = item.attachments.filter(
            file => file.attachment_type == 2
        )[0];

        if (!image) {
            return null;
        }

        return (
            <img
                className={classes.image}
                src={`${BACKEND_URL}/${IMAGE_PATH}/${image.file}`}
                alt={item.event.name}
            />
        );
    };

    render() {
        const { modalOpen, classes } = this.props;
        console.log(this.props);
        return (
            <Modal
                open={modalOpen}
                onClose={this.props.closeModalClick}
                classNames={{
                    modal: classes.root
                }}
                focusTrapped
            >
                {this.content}
            </Modal>
        );
    }
}

export default classify(defaultClasses)(DetailsModal);
