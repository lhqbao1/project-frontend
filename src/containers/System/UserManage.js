import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUser } from '../../services/userService'
import { applyMiddleware } from 'redux';
import ModalUser from './ModalUser';
import { createNewUser } from '../../services/userService';
import { deleteUser } from '../../services/userService';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { editUserService } from '../../services/userService';
class UserManage extends Component {
    //ham` tao states trong class
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            //set off modal
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserReact();
    }

    getAllUserReact = async () => {
        let respone = await getAllUser('ALL');
        if (respone && respone.errCode === 0) {
            //this.setState bat dong bo nen phai dung callback function () => {}
            this.setState({
                arrUsers: respone.users
            })
        }
    }
    //Use arrow function for event function
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        //(data) -> receive data from child
        try {
            //function from service
            let response = await createNewUser(data);
            if (response && response.errCode != 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserReact();
                this.setState({
                    isOpenModalUser: false
                })
                //fire event from parent to child with emitter (data accepted)
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUser(user.id)
            if (response && response.errCode === 0) {
                await this.getAllUserReact();
            }
            else {
                alert(response.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }

    hanleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    //set props
                    // do not send function with () to child
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUserModal}
                        //set props to send to child
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>
                    <FormattedMessage id="menu.system.header" />
                </div>
                <div className='add-btn'>
                    <button
                        onClick={() => this.handleAddNewUser()}
                        className='btn btn-primary px-2 ml-3'>
                        <i className="fas fa-plus px-1"></i> <FormattedMessage id="menu.system.button" /> </button>
                </div>
                <div className='user-table mt-4 mx-4 my-4'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th> <FormattedMessage id="menu.table.firstname" /> </th>
                                <th><FormattedMessage id="menu.table.lastname" /></th>
                                <th><FormattedMessage id="menu.table.address" /></th>
                                <th><FormattedMessage id="menu.table.action" /></th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => { this.hanleEditUser(item) }}><i className="fas fa-edit"></i></button>
                                                <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
