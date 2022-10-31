import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService'
import { idText } from 'typescript';
import { userLoginSuccess } from '../../store/actions';
<script src="https://kit.fontawesome.com/762dd4b0e2.js" crossorigin="anonymous"></script>;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    handleLogin = async () => {
        //clear error whenever click
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('success')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
            console.log(error.response)

        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }



    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input placeholder='Enter your username'
                                type="text"
                                className='form-control'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsername(event)} />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <input placeholder='Enter your password'
                                type={this.state.isShowPassword ? 'text' : 'password'}
                                className='form-control'
                                onChange={(event) => this.handleOnChangePassword(event)} />
                            <span >
                                <i
                                    onClick={() => { this.handleShowHidePassword() }}
                                    className={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i>
                            </span>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password??</span>
                        </div>
                        <div className='col-12 text-center mt-4'>
                            <span className='text-center'>Or Login with</span>
                        </div>
                        <div className='col-12  social-icon '>
                            <i className="fab fa-google-plus-g google-btn"></i>
                            <i className="fab fa-facebook facebook-btn"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);