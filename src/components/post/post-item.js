import React, { Component } from 'react';

const PostItem = ( {onEdit,onDelete, key, post} ) => {
    const editPost = (id) => {
        onEdit(id);
    }

    const deletePost = (id) => {
        onDelete(id);
    }

    return (
        <tr>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.description}</td>
            <td>{post.name}</td>
            <td>
                <a href="#" className="btn btn-warning" onClick={editPost.bind(this,post.id)} style={{margin : 2 + 'px'}}>EDIT</a>
                <a href="#" className="btn btn-danger"  onClick={deletePost.bind(this,post.id)} style={{margin : 2 + 'px'}}>DELETE</a>
            </td>
        </tr>
    );
}

export default PostItem;
