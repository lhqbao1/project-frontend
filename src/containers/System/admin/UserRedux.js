import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: [],
            isOpen: false,

            email: '',
            password: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            roleid: '',
            image: '',
            userEditId: '',


            actions: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            let genderArr = this.props.genderRedux;
            let roleArr = this.props.roleRedux;
            let positionArr = this.props.positionRedux

            this.setState({
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                phonenumber: '',
                address: '',
                gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : '',
                position: positionArr && positionArr.length > 0 ? positionArr[0].keyMap : '',
                roleid: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : '',
                image: '',
                actions: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        //function to get update image URL
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                image: base64
            })
        }
    }

    openReviewImage = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveUserRedux = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let action = this.state.actions;
        //fire create user
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUsers({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.roleid,
                phoneNumber: this.state.phonenumber,
                position: this.state.position,
                image: this.state.image
            })
        }
        //fire edit user
        if (action === CRUD_ACTIONS.EDIT) {
            // console.log('check', this.state)
            this.props.editAUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                address: this.state.address,
                gender: this.state.gender,
                roleId: this.state.roleid,
                phoneNumber: this.state.phonenumber,
                position: this.state.position,
                image: this.state.image
            })
        }


    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ["email", "password", "firstname", "lastname", "phonenumber", "address"]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(arrCheck[i] + ' input can not be empty!')
                break;
            }
        }

    }

    handleEditUserFromParent = (user) => {
        this.setState({
            email: user.email,
            password: user.password,
            firstname: user.firstName,
            lastname: user.lastName,
            phonenumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.position,
            roleid: user.roleId,
            image: '',
            actions: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })

    }

    render() {
        let genders = this.state.genderArr;
        let role = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let { email, password, firstname, lastname, phonenumber, address, position, roleid, gender } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    <FormattedMessage id="menu.manage-user.header" />
                </div>
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="menu.manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.actions === CRUD_ACTIONS.EDIT ? true : false}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.firstname" /></label>
                                <input className='form-control' type='text'
                                    value={firstname}
                                    onChange={(event) => { this.onChangeInput(event, 'firstname') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.lastname" /></label>
                                <input className='form-control' type='text'
                                    value={lastname}
                                    onChange={(event) => { this.onChangeInput(event, 'lastname') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.phonenumber" /></label>
                                <input className='form-control' type='text'
                                    value={phonenumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phonenumber') }}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.gender" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}

                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}
                                                >{language === LANGUAGES.VI ? item.value_vi : item.value_en}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.position" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    value={position}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.value_vi : item.value_en}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.roleid" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'roleid') }}
                                    value={roleid}
                                >
                                    {role && role.length > 0 && role.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.value_vi : item.value_en}</option>
                                        )
                                    })}
                                    <option>Choose ...</option>

                                </select>
                            </div>

                            <div className='col -3'>
                                <label><FormattedMessage id="menu.manage-user.image" /></label>
                                <div className='preview-img-containter'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tai anh
                                        <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openReviewImage()}
                                    ></div>
                                </div>
                            </div>

                            <div className='col-12 mt-3 '>
                                <div className={this.state.actions === CRUD_ACTIONS.EDIT ? 'btn btn-warning px-3' : 'btn btn-primary px-3'}
                                    onClick={() => this.handleSaveUserRedux()}
                                >
                                    {this.state.actions === CRUD_ACTIONS.EDIT ? <FormattedMessage id="menu.manage-user.buttonedit" /> : <FormattedMessage id="menu.manage-user.button" />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <TableManageUser
                    handleEditUserFromParent={this.handleEditUserFromParent}
                    action={this.state.actions}
                />
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }


            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        //get actions from adminActions
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUsers: (data) => dispatch(actions.createNewUsers(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
