import React, { Component } from 'react';
import { Query, Redirect } from 'src/drivers';
import { bool, func, object, shape, string } from 'prop-types';
import gql from 'graphql-tag';


import { setCurrentPage, setPrevPageTotal } from 'src/actions/search';
import Pagination from 'src/components/Pagination';
import Gallery from 'src/components/Gallery';
import classify from 'src/classify';
import Icon from 'src/components/Icon';
import getQueryParameterValue from 'src/util/getQueryParameterValue';
import CloseIcon from 'react-feather/dist/icons/x';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import defaultClasses from './search.css';
import PRODUCT_SEARCH from '../../queries/productSearch.graphql';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import CategoryContent from "src/RootComponents/Category/category";

const getCategoryName = gql`
    query getCategoryName($id: Int!) {
        category(id: $id) {
            name
        }
    }
`;

export class Search extends Component {
    static propTypes = {
        classes: shape({
            noResult: string,
            root: string,
            title: string,
            totalPages: string
        }),
        executeSearch: func.isRequired,
        history: object,
        location: object.isRequired,
        match: object,
        searchOpen: bool,
        toggleSearch: func
    };

    componentDidMount() {
        // Ensure that search is open when the user lands on the search page.
        const { location, searchOpen, toggleSearch } = this.props;

        const inputText = getQueryParameterValue({
            location,
            queryParameter: 'query'
        });

        if (toggleSearch && !searchOpen && inputText) {
            toggleSearch();
        }
    }

    getCategoryName = (categoryId, classes) => (
        <div className={classes.categoryFilters}>
            <button
                className={classes.categoryFilter}
                onClick={this.handleClearCategoryFilter}
            >
                <small className={classes.categoryFilterText}>
                    <Query
                        query={getCategoryName}
                        variables={{ id: categoryId }}
                    >
                        {({ loading, error, data }) => {
                            if (error) return null;
                            if (loading) return 'Loading...';
                            return data.category.name;
                        }}
                    </Query>
                </small>
                <Icon
                    src={CloseIcon}
                    attrs={{
                        width: '13px',
                        height: '13px'
                    }}
                />
            </button>
        </div>
    );

    handleClearCategoryFilter = () => {
        const inputText = getQueryParameterValue({
            location: this.props.location,
            queryParameter: 'query'
        });

        if (inputText) {
            this.props.executeSearch(inputText, this.props.history);
        }
    };

    render() {

        const {
            classes,
            location,
            currentPage,
            prevPageTotal,
            pageSize,
            setCurrentPage,
            setPrevPageTotal
        } = this.props;

        const { getCategoryName } = this;

        const pageControl = {
            currentPage: currentPage,
            setPage: setCurrentPage,
            updateTotalPages: setPrevPageTotal,
            totalPages: prevPageTotal
        };

        const inputText = getQueryParameterValue({
            location,
            queryParameter: 'query'
        });
        const categoryId = getQueryParameterValue({
            location,
            queryParameter: 'category'
        });

        if (!inputText) {
            return <Redirect to="/" />;
        }

        const queryVariable = categoryId
            ? { inputText, categoryId }
            : { inputText };

        return (
            <Query query={PRODUCT_SEARCH} variables={{
                pageSize: Number(pageSize),
                currentPage: Number(currentPage),
                ...queryVariable
            }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading)
                        return (
                            <CategoryContent
                                pageControl={pageControl}
                                pageSize={pageSize}
                            />
                        );

                    if (data.products.items.length === 0)
                        return (
                            <div className={classes.noResult}>
                                No results found!
                            </div>
                        );

                    const totalPageControlWrapper = {
                        ...pageControl,
                        totalPages: Math.ceil(
                            data.products.total_count / Number(pageSize)
                        )
                    };

                    return (
                        <article className={classes.root}>
                            <div className={classes.categoryTop}>
                                <h1 className={classes.title}>
                                    <strong>Search: "{inputText}" {categoryId && `in ${getCategoryName(categoryId, classes)}`}</strong>
                                    <small>Showing {(Number(currentPage) -1) * Number(pageSize) + 1} - {Number(currentPage) * Number(pageSize)} of {data.products.total_count} items</small>
                                </h1>
                            </div>
                            <div className={classes.topPagination}>
                                <Pagination
                                    pageControl={totalPageControlWrapper}
                                />
                            </div>
                            <section className={classes.gallery}>
                                <Gallery data={data.products.items} />
                            </section>
                            <div className={classes.pagination}>
                                <Pagination
                                    pageControl={totalPageControlWrapper}
                                />
                            </div>
                        </article>
                    );
                }}
            </Query>
        );
    }
}

const mapStateToProps = ({ search }) => {
    return {
        currentPage: search.currentPage,
        pageSize: search.pageSize,
        prevPageTotal: search.prevPageTotal
    };
};
const mapDispatchToProps = { setCurrentPage, setPrevPageTotal };

export default compose(
    classify(defaultClasses),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Search);
