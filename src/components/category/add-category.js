import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';


class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          newCategory : {},
          editCategory:{},
        }
    }

    hideModal() {
      this.props.onHideModal(this.props.isOpen);
    }

    saveCategory(e) {
        this.setState({newCategory:{
            title : this.refs.title.value,
            description : this.refs.description.value,
        }}, function (){
            this.props.saveCategory(this.state.newCategory);
        });
    }

    render() {
        let errors = '';
        if (typeof this.props.message.fail === 'undefined') {}
        else {
            errors = Object.keys(this.props.message.fail).map((k, idx) => {
                return (
                    <li key={idx}>{this.props.message.fail[k]}</li>
                );
            });
        }
          return (
              <div className="container App">
              <Modal isOpen={this.props.isOpen} onRequestHide={this.hideModal.bind(this)}>
                    <ModalHeader>
                      <ModalClose onClick={this.hideModal.bind(this)}/>
                      <ModalTitle>Add Category</ModalTitle>
                    </ModalHeader>
                    <ModalBody>
                        <div className={this.props.errorClass}>
                            {errors}
                        </div>
                        <form role="form">
                            <div className="form-group">
                                <label>Title</label>
                                <input ref="title" key={new Date().getTime()} className="form-control" />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea ref="description" key={new Date().getTime()} className="form-control" rows="3"></textarea>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                      <button className='btn btn-default' onClick={this.hideModal.bind(this)}>
                        Close
                      </button>
                      <input type='button' onClick={this.saveCategory.bind(this)} className='btn btn-primary' value='Save' />
                    </ModalFooter>
                  </Modal>
                </div>

        );
    }
}

export default AddCategory;
