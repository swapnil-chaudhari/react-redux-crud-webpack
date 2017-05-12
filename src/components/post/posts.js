import React, { Component } from 'react';
import PostItem from './post-item';

const Posts = ({posts, onDelete, onEdit, start_offset, start_count, per_page}) => {
    const deletePost = (id) => {
        onDelete(id);
    }

    const editPost = (id) => {
        onEdit(id);
    }

    const postListItems = (posts, start_offset, start_count, per_page) => {
        let postList;
        if (posts.length > 0) {
            postList = posts.map((post, index) => {
                if (index >= start_offset && start_count < per_page) {
                  start_count++;
                  return (
                    <PostItem onEdit={editPost.bind(this)} onDelete={deletePost.bind(this)} key={post.id} post={post} />
                  );
                }

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
                    {postListItems(posts, start_offset, start_count, per_page)}
                </tbody>
            </table>
        </div>
    );
}

export default Posts;
