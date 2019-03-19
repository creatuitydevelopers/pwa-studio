import React, { Component } from 'react';
import { arrayOf, string, number, shape } from 'prop-types';
import GalleryItem from './item';

import { initialState } from 'src/reducers/catalog';

import { MultiRating } from 'src/components/Review';

const pageSize = initialState.pageSize;
const emptyData = Array.from({ length: pageSize }).fill(null);

// inline the placeholder elements, since they're constant
const defaultPlaceholders = emptyData.map((_, index) => (
    <GalleryItem key={index} placeholder={true} />
));

class GalleryItems extends Component {
    static propTypes = {
        items: arrayOf(
            shape({
                id: number.isRequired,
                name: string.isRequired,
                small_image: string
            })
        ).isRequired,
        pageSize: number
    };

    get placeholders() {
        const { pageSize } = this.props;

        return pageSize
            ? Array.from({ length: pageSize })
                .fill(null)
                .map((_, index) => (
                    <GalleryItem key={index} placeholder={true} />
                ))
            : defaultPlaceholders;
    }

    render() {
        const { items } = this.props;

        if (items === emptyData) {
            return this.placeholders;
        }

        return (
            <MultiRating items={items}>
                {items.map(item => (
                    <GalleryItem key={item.id} item={item} />
                ))}
            </MultiRating>
        );
    }
}

export { GalleryItems as default, emptyData };