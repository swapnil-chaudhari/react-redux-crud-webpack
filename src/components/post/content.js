import React, { Component } from 'react'
import  fetchPosts, {
    editPost,
    updatePost,
    deletePost,
    fetchCategories,
    savePost,
    openModal,
    hideModal,
    hideAlert,
} from "src/actions/post-actions"
import store from "src/store"
import { connect } from "react-redux"
import Posts from './posts'
import AddPost from './add-post';
import EditPost from './edit-post';
import { Alert  } from 'react-bootstrap'


class Content extends Component {
    componentWillMount() {
        store.dispatch((dispatch) => {
            dispatch(fetchPosts());
            dispatch(fetchCategories());
        })
    }

    savePost(post) {
        store.dispatch(savePost(post));
        console.log('after savePost', store.getState());
    }

    openModal() {
        store.dispatch((dispatch) => {
            // dispatch(fetchCategories());
            dispatch(openModal());
        })
    }

    hideModal(isOpen) {
        store.dispatch(hideModal());
    }

    deletePost(id) {
        store.dispatch(deletePost(id));
        console.log('after delete', store.getState());
    }

    editPost(id) {
        store.dispatch(editPost(id));

    }

    updatePost(post, id) {
            store.dispatch(updatePost(post, id));
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
                                Posts <small>List</small>
                            </h1>
                            <ol className="breadcrumb">
                                <li className="active">
                                    <i className="fa fa-dashboard"></i> Posts
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
                                    style={{margin:10 + 'px', float:'right'}}>ADD POST
                                </button>

                                { this.props.modalAction === 'ADD' ?
                                    <AddPost
                                        categories={this.props.categories}
                                        message={this.props.message}
                                        errorClass={this.props.errorClass}
                                        isOpen={this.props.isOpen}
                                        savePost={this.savePost.bind(this)}
                                        onHideModal={this.hideModal.bind(this)}
                                    /> : null
                                }

                                { this.props.modalAction === 'EDIT' ?
          		                        <EditPost
                                            categories={this.props.categories}
                                            message={this.props.message}
                                            errorClass={this.props.errorClass}
                                            isOpen={this.props.isOpen}
                                            updatePost={this.updatePost.bind(this)}
                                            onHideModal={this.hideModal.bind(this)}
                                            post={this.props.editPost}
                                        /> : null
                                }

                                <Posts
                                    posts={this.props.posts}
                                    onDelete={this.deletePost.bind(this)}
                                    onEdit={this.editPost.bind(this)} />
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
    posts : store.posts.posts,
    categories : store.posts.categories,
    editPost : store.posts.editPost,
    modalAction : store.posts.modalAction,
    isOpen : store.posts.isOpen,
    message :store.posts.message,
    errorClass : store.posts.errorClass,
    isAlertVisible : store.posts.isAlertVisible,
  };
}

export default connect(mapStateToProps)(Content);
