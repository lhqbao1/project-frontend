import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader'
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import MoreInfoDoctor from '../Doctor/MoreInfoDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import doctor from '../../../assets/doctor/bs2.png';
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash';
import Select from 'react-select';
import { Link } from 'react-router-dom'


class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        let { language } = this.props
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });

            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.response.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.response.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorID)
                        })
                    }
                }
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        value_en: 'ALL',
                        value_vi: 'Toàn quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.response.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })

            }
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
    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            });

            if (res && res.response.errCode === 0) {
                let data = res.response.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorID)
                        })
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.response.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId } = this.state
        let { dataDetailSpecialty, listProvince } = this.state
        let { language } = this.props
        return (

            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-content'>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                    }

                </div>

                <div className='detail-doctor-content'>
                    <div className='province-select'>
                        <select className='button' onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                                        </option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor'>
                                    <div className='content-left'>
                                        <div className='doctor-name'>
                                            <ProfileDoctor
                                                key={index}
                                                doctorID={item}
                                            // dataScheduleModal={dataScheduleModal}
                                            />
                                            <div className='link'>
                                                <Link to={`/detail-doctor/${item}`}>Xem them</Link>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='content-right'>
                                        <ScheduleDoctor
                                            doctorIDFromParent={item}
                                            key={index}
                                        />
                                        <div className='more-infor-doctor'>
                                            <MoreInfoDoctor
                                                //send doctorIDFromParent to ScheduleDoctor
                                                doctorIDFromParent={item}
                                                key={index}
                                            />
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>



            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
