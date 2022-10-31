import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        }
        //create emitter function
    }



    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {
        // using 'three dots' to copy state
        // using call back function pretend async
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing input')
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call API
            // (this.state) sends data from child to parent
            this.props.editUser(this.state)
        }
    }
    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className={'modal-user-container'} size="lg">
                <ModalHeader toggle={() => { this.toggle() }}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input type='text'
                                value={this.state.email}
                                disabled
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input type='password'
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                disabled
                                value={this.state.password}></input>
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input type='text'
                                value={this.state.firstName}
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}></input>
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input type='text'
                                value={this.state.lastName}
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}></input>
                        </div>
                        <div className='input-container max-w'>
                            <label>Address</label>
                            <input type='text'
                                value={this.state.address}
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}></input>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>Save changes</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={() => { this.toggle() }}>Close</Button>
                </ModalFooter>
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





