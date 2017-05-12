import React, { Component } from 'react';
import  fetchPosts, {
    editPost,
    updatePost,
    deletePost,
    savePost,
} from "src/actions/post-actions";
import fetchCategories from "src/actions/category-actions";
import hideAlert, {
    openModal,
    hideModal,
} from "src/actions/common-actions";
import store from "src/store";
import { connect } from "react-redux";
import Posts from './posts';
import AddPost from './add-post';
import EditPost from './edit-post';
import { Alert, Pagination } from 'react-bootstrap';
import { push } from "react-router-redux";

class Content extends Component {

    componentWillMount() {
        this.props.dispatch(fetchPosts());
        this.props.dispatch(fetchCategories());
    }

    savePost(post) {
        this.props.dispatch(savePost(post));
    }

    openModal() {
        this.props.dispatch(openModal());
    }

    hideModal(isOpen) {
        this.props.dispatch(hideModal());
    }

    deletePost(id) {
        this.props.dispatch(deletePost(id));
    }

    editPost(id) {
        this.props.dispatch(editPost(id));
    }

    updatePost(post, id) {
        this.props.dispatch(updatePost(post, id));
    }

    hideAlert() {
        this.props.dispatch(hideAlert());
    }

    changePage(page) {
      //this.props.dispatch(push('/posts?page=' + page));
      window.location.href = '/posts?page=' + page
    }

    render() {
        const pageStyle = {
            overflowY : 'auto',
            height : 600 + 'px',
        }

        // pagination
        const {posts, page} = this.props;
        const per_page = 5;
        const pages = Math.ceil(posts.length / per_page);
        const start_offset = (page - 1) * per_page;
        let start_count = 0;

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
                                    posts={posts}
                                    onDelete={this.deletePost.bind(this)}
                                    onEdit={this.editPost.bind(this)}
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
    posts : store.posts.posts,
    categories : store.posts.categories,
    editPost : store.posts.editPost,
    modalAction : store.posts.modalAction,
    isOpen : store.posts.isOpen,
    message :store.posts.message,
    errorClass : store.posts.errorClass,
    isAlertVisible : store.posts.isAlertVisible,
    isCRUD : store.posts.isCRUD,
    page: Number(store.routing.locationBeforeTransitions.query.page) || 1,
  };
}

export default connect(mapStateToProps)(Content);
