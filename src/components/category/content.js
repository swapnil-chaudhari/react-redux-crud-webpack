<<<<<<< HEAD
import React, { Component } from 'react';
=======
import React, { Component } from 'react'
>>>>>>> 760c65b059ce469306daf4ab39b8a9abf7d373e0
import  fetchCategories, {
    editCategory,
    updateCategory,
    deleteCategory,
    saveCategory,
<<<<<<< HEAD
} from "src/actions/category-actions";
import hideAlert, {
    openModal,
    hideModal,
} from "src/actions/common-actions";
import store from "src/store";
import { connect } from "react-redux";
import Categories from './categories';
import AddCategory from './add-category';
import EditCategory from './edit-category';
import { Alert  } from 'react-bootstrap';
import Pagination from 'src/components/pagination/pagination';


class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageOfItems: []
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchCategories());
    }

    saveCategory(category) {
        this.props.dispatch(saveCategory(category));
    }

    openModal() {
        this.props.dispatch(openModal());
    }

    hideModal(isOpen) {
        this.props.dispatch(hideModal());
    }

    deleteCategory(id) {
        this.props.dispatch(deleteCategory(id));
    }

    editCategory(id) {
        this.props.dispatch(editCategory(id));
=======
    openModal,
    hideModal,
    hideAlert,
} from "src/actions/category-actions"
import store from "src/store"
import { connect } from "react-redux"
import Categories from './categories'
import AddCategory from './add-category';
import EditCategory from './edit-category';
import { Alert  } from 'react-bootstrap'


class Content extends Component {
    componentWillMount() {
        store.dispatch((dispatch) => {
            dispatch(fetchCategories());
        })
    }

    saveCategory(category) {
        store.dispatch(saveCategory(category));
    }

    openModal() {
        store.dispatch((dispatch) => {
            dispatch(openModal());
        })
    }

    hideModal(isOpen) {
        store.dispatch(hideModal());
    }

    deleteCategory(id) {
        store.dispatch(deleteCategory(id));
    }

    editCategory(id) {
        store.dispatch(editCategory(id));
>>>>>>> 760c65b059ce469306daf4ab39b8a9abf7d373e0

    }

    updateCategory(category, id) {
<<<<<<< HEAD
        this.props.dispatch(updateCategory(category, id));
    }

    hideAlert() {
        this.props.dispatch(hideAlert());
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
=======
            store.dispatch(updateCategory(category, id));
    }

    hideAlert() {
        store.dispatch(hideAlert());
>>>>>>> 760c65b059ce469306daf4ab39b8a9abf7d373e0
    }

    render() {

        const pageStyle = {
            overflowY : 'auto',
            height : 600 + 'px',
        }
<<<<<<< HEAD

        let showPagination = '';
        if (this.props.categories.length > 0) {
            showPagination = <Pagination items={this.props.categories} onChangePage={this.onChangePage.bind(this)} />
        }

=======
>>>>>>> 760c65b059ce469306daf4ab39b8a9abf7d373e0
        return (
            <div id="page-wrapper" style={pageStyle}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-header">
                                Categories <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Categories
                                </li>
                            </ol>
                            <div className="row">
                                { this.props.message.success !== '' && this.props.isAlertVisible === true ?
                                    <Alert bsStyle="success" onDismiss={this.hideAlert.bind(this)}>
                                        <strong>{this.props.message.success}</strong>
                                     </Alert>
                                    : null
                                }

                                <button
                                    type="button"
                                    onClick={this.openModal.bind(this)}
                                    className="btn btn-primary"
                                    style={{margin:10 + 'px', float:'right'}}>ADD CATEGORY
                                </button>

                                { this.props.modalAction === 'ADD' ?
                                    <AddCategory
                                        message={this.props.message}
                                        errorClass={this.props.errorClass}
                                        isOpen={this.props.isOpen}
                                        saveCategory={this.saveCategory.bind(this)}
                                        onHideModal={this.hideModal.bind(this)}
                                    /> : null
                                }

                                { this.props.modalAction === 'EDIT' ?
          		                        <EditCategory
                                            message={this.props.message}
                                            errorClass={this.props.errorClass}
                                            isOpen={this.props.isOpen}
                                            updateCategory={this.updateCategory.bind(this)}
                                            onHideModal={this.hideModal.bind(this)}
                                            category={this.props.editCategory}
                                        /> : null
                                }

                                <Categories
<<<<<<< HEAD
                                    categories={this.state.pageOfItems}
                                    onDelete={this.deleteCategory.bind(this)}
                                    onEdit={this.editCategory.bind(this)}
                                />
                                {showPagination}
=======
                                    categories={this.props.categories}
                                    onDelete={this.deleteCategory.bind(this)}
                                    onEdit={this.editCategory.bind(this)}
                                />
>>>>>>> 760c65b059ce469306daf4ab39b8a9abf7d373e0
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(store) {
  return {
    categories : store.categories.categories,
    editCategory : store.categories.editCategory,
    modalAction : store.categories.modalAction,
    isOpen : store.categories.isOpen,
    message :store.categories.message,
    errorClass : store.categories.errorClass,
    isAlertVisible : store.categories.isAlertVisible,
  };
}

export default connect(mapStateToProps)(Content);
