import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { Link, resourceUrl } from 'src/drivers';
import classify from 'src/classify';
import { Rating } from 'src/components/Review';
import {PriceWrapper} from 'src/components/RkStore';

import { transparentPlaceholder } from 'src/shared/images';
import defaultClasses from './item.css';

const imageWidth = '300';
const imageHeight = '372';

const ItemPlaceholder = ({ children, classes }) => (
    <div className={classes.root_pending}>
        <div className={classes.images_pending}>{children}</div>
        <div className={classes.name_pending} />
        <div className={classes.bottomWrapper}>
            <div className={classes.price_pending} />
            <div className={classes.rating_pending} />
            <div className={classes.stock_pending} />
        </div>
        
    </div>
);

// TODO: get productUrlSuffix from graphql when it is ready
const productUrlSuffix = '';

class GalleryItem extends Component {
    static propTypes = {
        classes: shape({
            bottomWrapper: string,
            image: string,
            image_pending: string,
            imagePlaceholder: string,
            imagePlaceholder_pending: string,
            images: string,
            images_pending: string,
            name: string,
            name_pending: string,
            price: string,
            price_pending: string,
            rating: string,
            root: string,
            root_pending: string,
            stockAvailable: string,
            stockUnavailable: string,
            stock_pending: string
        }),
        item: shape({
            id: number.isRequired,
            name: string.isRequired,
            small_image: string,
            url_key: string.isRequired
        })
        
    };

    render() {
        const { classes, rating, item } = this.props;

        if (!item) {
            return (
                <ItemPlaceholder classes={classes}>
                    {this.renderImagePlaceholder()}
                </ItemPlaceholder>
            );
        }

        const { name, labels, url_key } = item;
        const productLink = `/${url_key}${productUrlSuffix}`;
        return (
            <div className={classes.root}>
                <Link to={resourceUrl(productLink)} className={classes.images}>
                    {this.renderImagePlaceholder()}
                    {this.renderImage()}
                </Link>
                <Link to={resourceUrl(productLink)} className={classes.name}>
                    <span>{name}</span>
                </Link>
                <div className={classes.bottomWrapper}>
                    <div className={classes.price}>
                        <PriceWrapper 
                            productId={item.id} 
                            placeholderStyle={{minHeight: '24px', maxWidth: '100px'}} 
                            viewMode={'category_page'}
                        />
                    </div>
                    <div className={classes.rating}>
                        {!!rating && (
                            <Rating
                                showAverage={rating.showAverage}
                                avgRating={rating.avgRating}
                                overallRating={rating.overallRating}
                                error = {!!rating.error  ? rating.error : null}
                            />
                        )}
                    </div>
                   {this.stockInfo}
                </div>
            </div>
        );
    }

    get stockInfo() {
        const { classes, item } = this.props;
        const { labels } = item;

        const map = {
            isOnline: 'Ship To Home',
            isInStores: 'In Stores'
        };

        const htmlLabels = !!labels
            ? labels.map((item, key) => {
               return item.value == 'true' && !!map[item.name] ? <span key={key} className={classes.stockAvailable}>{map[item.name]}</span> : null
            })
            : [];

        if(htmlLabels.length == 0){
            htmlLabels.push(<span key={99} className={classes.stockUnavailable}>Out of stock</span>)
        }

        return <div>{htmlLabels.map((item) => item)}</div>


    }

    renderImagePlaceholder = () => {
        const { classes, item } = this.props;

        const className = item
            ? classes.imagePlaceholder
            : classes.imagePlaceholder_pending;

        return (
            <img
                className={className}
                src={transparentPlaceholder}
                alt=""
                width={imageWidth}
                height={imageHeight}
            />
        );
    };

    /**
     * TODO: Product images are currently broken and pending a fix from the `graphql-ce` project
     * https://github.com/magento/graphql-ce/issues/88
     */
    renderImage = () => {
        const { classes, item } = this.props;

        if (!item) {
            return null;
        }

        const { small_image, name } = item;

        return (
            <img
                className={classes.image}
                src={resourceUrl(small_image, {
                    type: 'image-product',
                    width: imageWidth
                })}
                alt={name}
                width={imageWidth}
                height={imageHeight}
            />
        );
    };
}

export default classify(defaultClasses)(GalleryItem);
