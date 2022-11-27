import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService'
import _ from 'lodash'
import moment from 'moment/moment';
import localization from 'moment/locale/vi'

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let data = await this.getProfileDoctor(this.props.doctorID)
        this.setState({
            dataProfile: data
        })
    }
    changeLanguage = (language) => {
        //fire redux action
        this.props.changeLanguageAppRedux(language)
    }
    getProfileDoctor = async (doctorID) => {
        let result = {};
        if (doctorID) {
            let profile = await getProfileDoctorById(doctorID)
            if (profile && profile.errCode === 0) {
                result = profile.data
            }
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorID !== prevProps.doctorID) {
            // this.getProfileDoctor(this.props.doctorID)
        }
    }

    renderTimeBooking = (dataScheduleModal) => {
        let { language } = this.props
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleModal.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataScheduleModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataScheduleModal.timeTypeData.value_vi : dataScheduleModal.timeTypeData.value_en
            return (
                <>
                    <div>{time} - {date}</div>
                </>
            )
        }
    }


    render() {
        let { dataProfile } = this.state
        let { language } = this.props
        let { dataScheduleModal } = this.props
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.value_vi}, ${dataProfile.firstName} ${dataProfile.lastName}`
            nameEn = `${dataProfile.positionData.value_en}, ${dataProfile.firstName} ${dataProfile.lastName}`
        }

        return (
            <div className='profile-doctor-container'>
                <div className="info-image" style={{ backgroundImage: `url(${dataProfile.image})` }}></div>
                <div className='doctor-name'>
                    {language === LANGUAGES.VI ? nameVi : nameEn}
                    {this.renderTimeBooking(dataScheduleModal)}
                </div>
                <div className='price'>
                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData && language === LANGUAGES.VI &&
                        <div><b>Giá khám:</b> {dataProfile.Doctor_Infor.priceData.value_vi}VND</div>
                    }
                    {dataProfile && dataProfile.Doctor_Infor && dataProfile.Doctor_Infor.priceData && language === LANGUAGES.EN &&
                        <div><b>Price:</b> {dataProfile.Doctor_Infor.priceData.value_en}$</div>
                    }
                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
