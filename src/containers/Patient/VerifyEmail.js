import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

import './VerifyEmail.scss';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search)
            let token = urlParams.get('token');
            let doctorID = parseInt(urlParams.get("doctorID"), 10)

            let res = await postVerifyBookAppointment({
                token: token,
                doctorID: doctorID
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }


        if (this.props.match && this.props.match.params && this.props.match.params.id) {

        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    changeLanguage = (language) => {
        //fire redux action
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let { statusVerify, errCode } = this.state
        return (
            <>
                <HomeHeader />
                {statusVerify === false ?
                    <div>Loading data</div>
                    :
                    <div>
                        {+errCode === 0 ?
                            <h2>YOUR BOOKING IS VERIFIED</h2> :
                            <h2>YOUR BOOKING DOES NOT EXIST OR HAD BEEN VERIFIED</h2>
                        }
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
