import React, { Component } from 'react';
import PostItem from './post-item';

const Posts = ({posts, onDelete, onEdit}) => {
    const deletePost = (id) => {
        onDelete(id);
    }

    const editPost = (id) => {
        onEdit(id);
    }

    const postListItems = (posts) => {
        let postList;
        if (posts.length > 0) {
            postList = posts.map((post, index) => {
                return (
                    <PostItem onEdit={editPost.bind(this)} onDelete={deletePost.bind(this)} key={post.id} post={post} />
                )
            });
        }
        return postList;
    }

    return (
        <div className="posts">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {postListItems(posts)}
                </tbody>
            </table>
        </div>
    );
}

export default Posts;
