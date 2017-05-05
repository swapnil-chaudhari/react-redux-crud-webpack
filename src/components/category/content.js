import React, { Component } from 'react'
import  fetchCategories, {
    editCategory,
    updateCategory,
    deleteCategory,
    saveCategory,
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

    }

    updateCategory(category, id) {
            store.dispatch(updateCategory(category, id));
    }

    hideAlert() {
        store.dispatch(hideAlert());
    }

    render() {

        const pageStyle = {
            overflowY : 'auto',
            height : 600 + 'px',
        }
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
                                    categories={this.props.categories}
                                    onDelete={this.deleteCategory.bind(this)}
                                    onEdit={this.editCategory.bind(this)}
                                />
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