import React, { Component, Fragment, Suspense } from 'react';
import { func, number, objectOf, shape, string } from 'prop-types';
import { Query } from 'react-apollo';

import classify from 'src/classify';
import { loadingIndicator } from 'src/components/LoadingIndicator';
import Branch from './categoryBranch';
import Leaf from './categoryLeaf';
import CategoryTree from './categoryTree';
import defaultClasses from './categoryTree.css';
import navigationMenu from '../../queries/getNavigationMenu.graphql';

class Tree extends Component {
    static propTypes = {
        classes: shape({
            leaf: string,
            root: string,
            tree: string
        }),
        nodes: objectOf(
            shape({
                id: number.isRequired,
                position: number.isRequired
            })
        ),
        onNavigate: func,
        rootNodeId: number.isRequired,
        updateRootNodeId: func.isRequired,
        currentId: number.isRequired
    };

    get leaves() {
        const {
            onNavigate,
            rootNodeId,
            updateRootNodeId,
            setChildCategoryUrl
        } = this.props;

        return rootNodeId ? (
            <Query query={navigationMenu} variables={{ id: rootNodeId }}>
                {({ loading, error, data }) => {
                    if (error) return <div>Data Fetch Error</div>;
                    if (loading) return loadingIndicator;

                    const children = data.category.children.filter(el => {
                        return !!el.include_in_menu
                    }).sort((a, b) => {
                        if (a.position > b.position) return 1;
                        else if (a.position == b.position && a.id > b.id)
                            return 1;
                        else return -1;
                    });

                    const leaves = children.map(node => {
                        const { children_count } = node;
                        const isLeaf = children_count == 0;
                        const elementProps = {
                            nodeId: node.id,
                            name: node.name,
                            level: node.level,
                            currentUrlPath: this.props.currentUrlPath,
                            urlPath: node.url_key,
                            path: node.path
                        };

                        const element = isLeaf ? (
                            <Leaf {...elementProps} onNavigate={onNavigate} />
                        ) : (
                            <Branch
                                {...elementProps}
                                setChildCategoryUrl={setChildCategoryUrl}
                                onDive={updateRootNodeId}
                            />
                        );

                        return <li key={node.id}>{element}</li>;
                    });

                    return (
                        <Fragment>
                            <div>{leaves}</div>
                        </Fragment>
                    );
                }}
            </Query>
        ) : null;
    }

    render() {
        const { leaves, props } = this;
        const { classes } = props;

        return (
            <div className={classes.root}>
                <ul className={classes.tree}>{leaves}</ul>
            </div>
        );
    }
}

export default classify(defaultClasses)(Tree);
