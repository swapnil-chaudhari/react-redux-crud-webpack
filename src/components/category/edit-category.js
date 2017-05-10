import React, { Component } from 'react';
import { Modal, ModalHeader, ModalTitle, ModalClose, ModalBody, ModalFooter } from 'react-modal-bootstrap';

class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editedCategory:{},
        }
    }

    hideModal() {
      this.props.onHideModal(this.props.isOpen);
    }

    updateCategory(e) {
        this.setState({editedCategory:{
            title : this.refs.title.value,
            description : this.refs.description.value,
        }}, function (){
            this.props.updateCategory(this.state.editedCategory, this.props.category.id);
        });
    }

    render() {
        let errors =''
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
                    <ModalTitle>Edit Category</ModalTitle>
                  </ModalHeader>
                  <ModalBody>
                      <div className={this.props.errorClass}>
                          {errors}
                      </div>
                      <form role="form">
                          <div className="form-group">
                              <label>Title</label>
                              <input ref="title" defaultValue={this.props.category.name} className="form-control" />
                          </div>

                          <div className="form-group">
                              <label>Description</label>
                              <textarea ref="description" defaultValue={this.props.category.description}  className="form-control" rows="3"></textarea>
                          </div>
                      </form>
                  </ModalBody>
                  <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal.bind(this)}>
                      Close
                    </button>
                    <input type='button' onClick={this.updateCategory.bind(this)} className='btn btn-primary' value='Update' />
                  </ModalFooter>
                </Modal>
              </div>
        );
    }
}

export default EditCategory;
