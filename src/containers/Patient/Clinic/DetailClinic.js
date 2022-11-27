import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './DetailClinic.scss';
import { getDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import doctor from '../../../assets/doctor/bs2.png';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import MoreInfoDoctor from '../Doctor/MoreInfoDoctor';
import { Link } from 'react-router-dom';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';


class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
            arrDoctorId: []
        }
    }

    async componentDidMount() {
        let { language } = this.props
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id: id,
            });


            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorID)
                        })
                    }
                }

                this.setState({
                    dataClinic: res.data,
                    arrDoctorId: arrDoctorId,
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

    render() {
        let { dataClinic, arrDoctorId } = this.state
        return (
            <>
                <HomeHeader />

                {dataClinic && !_.isEmpty(dataClinic) &&
                    <>
                        <div className="clinic-detail-container">
                            <div className='image'><img src={dataClinic.image
                            } /></div>
                            <div className='clinic-name'>{dataClinic.name}</div>
                            <div className='clinic-address'>{dataClinic.address}</div>
                        </div>
                    </>
                }
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
                <div className='clinic-desc' dangerouslySetInnerHTML={{ __html: dataClinic.descriptionHTML }}></div>
                <HomeFooter />


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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
