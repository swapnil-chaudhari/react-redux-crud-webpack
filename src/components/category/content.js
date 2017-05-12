import React, { Component } from 'react';
import  fetchCategories, {
    editCategory,
    updateCategory,
    deleteCategory,
    saveCategory,
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
import { Alert, Pagination } from 'react-bootstrap';
import { push } from "react-router-redux";

class Content extends Component {
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
    }

    updateCategory(category, id) {
        this.props.dispatch(updateCategory(category, id));
    }

    hideAlert() {
        this.props.dispatch(hideAlert());
    }

    changePage(page) {
      //this.props.dispatch(push('/posts?page=' + page));
      window.location.href = '/categories?page=' + page
    }

    render() {
        const pageStyle = {
            overflowY : 'auto',
            height : 600 + 'px',
        }

        // pagination
        const {categories, page} = this.props;
        const per_page = 5;
        const pages = Math.ceil(categories.length / per_page);
        const start_offset = (page - 1) * per_page;
        let start_count = 0;

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
                                    categories={categories}
                                    onDelete={this.deleteCategory.bind(this)}
                                    onEdit={this.editCategory.bind(this)}
                                    start_offset={start_offset}
                                    start_count={start_count}
                                    per_page={per_page}
                                />
                                <Pagination className="users-pagination pull-right" bsSize="medium" maxButtons={10} first last next
                                  prev boundaryLinks items={pages} activePage={page} onSelect={this.changePage.bind(this)}/>
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
    page: Number(store.routing.locationBeforeTransitions.query.page) || 1,
  };
}

export default connect(mapStateToProps)(Content);
