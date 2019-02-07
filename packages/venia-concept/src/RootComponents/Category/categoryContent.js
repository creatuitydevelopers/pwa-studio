import React, { Component } from 'react';
import classify from 'src/classify';
import Gallery from 'src/components/Gallery';
import Pagination from 'src/components/Pagination';
import defaultClasses from './category.css';

class CategoryContent extends Component {
    render() {

        const { classes, pageControl, data, pageSize } = this.props;
        const { currentPage } = pageControl;

        const items = data ? data.category.products.items : null;
        const title = data ? data.category.name : null;
        const subtitle = data ? `Showing ${(currentPage - 1) * pageSize  +1}-${currentPage * pageSize} of ${data.category.products.total_count} Results` : '';

        return (
            <article className={classes.root}>
                <h1 className={classes.title}>
                    {/* TODO: Switch to RichContent component from Peregrine when merged */}
                    <strong
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                    <small>{subtitle}</small>
                </h1>
                <div className={classes.topPagination}>
                    <Pagination pageControl={pageControl} />
                </div>
                <section className={classes.gallery}>
                    <Gallery data={items} title={title} pageSize={pageSize} />
                </section>
                <div className={classes.pagination}>
                    <Pagination pageControl={pageControl} />
                </div>
            </article>
        );
    }
}

export default classify(defaultClasses)(CategoryContent);
