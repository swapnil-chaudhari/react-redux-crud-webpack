import React, { Component } from 'react';

const CategoryItem = ( {onEdit,onDelete, key, category} ) => {
    const editCategory = (id) => {
        onEdit(id);
    }

    const deleteCategory = (id) => {
        onDelete(id);
    }

    return (
        <tr>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>{category.description}</td>
            <td>
                <a href="#" className="btn btn-warning" onClick={editCategory.bind(this,category.id)} style={{margin : 2 + 'px'}}>EDIT</a>
                <a href="#" className="btn btn-danger"  onClick={deleteCategory.bind(this,category.id)} style={{margin : 2 + 'px'}}>DELETE</a>
            </td>
        </tr>
    );
}

export default CategoryItem;
