import React, { Component } from 'react';
import CategoryItem from './category-item';

const Categories = ({categories, onDelete, onEdit}) => {

    const deleteCategory = (id) => {
        onDelete(id);
    }

    const editCategory = (id) => {
        onEdit(id);
    }

    const categoryListItems = (categories) => {
        let categoryList;
        if (categories.length > 0) {
            categoryList = categories.map(category => {
                return (
                    <CategoryItem onEdit={editCategory.bind(this)} onDelete={deleteCategory.bind(this)} key={category.id} category={category} />
                )
            });
        }
        return categoryList;
    }

    return (
        <div className="categories">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryListItems(categories)}
                </tbody>
            </table>
        </div>
    );
}

export default Categories;
