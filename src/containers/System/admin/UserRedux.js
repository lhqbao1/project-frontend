import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from "../../../store/actions";
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
            image: ''
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
    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        //function to get update image URL
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file
            })
        }
    }

    openReviewImage = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveUserRedux = () => {
        this.checkValidateInput();
        console.log('check value before submit', this.state)
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
        for (let i = 0; i <= arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(arrCheck[i] + ' input can not be empty!')
                break;
            }
        }

    }
    render() {
        let gender = this.state.genderArr;
        let role = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let { email, password, firstname, lastname, phonenumber, address, position, roleid, image } = this.state;
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
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.password" /></label>
                                <input className='form-control' type='text'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
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
                                >
                                    {gender && gender.length > 0 &&
                                        gender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}
                                                >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                    <option>Choose ...</option>

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.position" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                    <option>Choose ...</option>

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.roleid" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'roleid') }}
                                >
                                    {role && role.length > 0 && role.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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
                                <div className=' btn btn-primary px-3'
                                    onClick={() => this.handleSaveUserRedux()}
                                ><FormattedMessage id="menu.manage-user.button" /></div>
                            </div>
                        </div>
                    </div>
                </div>
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
        positionRedux: state.admin.positions
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //get actions from adminActions
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
