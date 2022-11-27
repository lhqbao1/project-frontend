import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './ScheduleDoctor.scss';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import BookingModal from './Modal/BookingModal';
import { Link } from 'react-router-dom'



class ScheduleDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataScheduleModal: {}
        }
    }



    async componentDidMount() {
        let { language } = this.props;
        //call function setArrDays
        let arrDays = this.setArrDays(language)
        if (arrDays && arrDays.length > 0) {
            this.setState({
                allDays: arrDays,
            })
        }
        //fix bug do not show schedule in parent page
        //because of doctorIDFromParent is already existing when we go on 
        //parent's page not when we call API so we declare this is DidUpdate
        //does not work is this case
        if (this.props.doctorIDFromParent) {
            let arrDays = this.setArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIDFromParent, arrDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        //call function serArrDays when changing props
        if (this.props.language !== prevProps.language) {
            let arrDays = this.setArrDays(this.props.language)
            this.setState({
                allDays: arrDays
            })
        }
        //fix bug cannot get the schedule of the first day
        //by resolve async problem of props (doctorIDFromParent)
        if (this.props.doctorIDFromParent !== prevProps.doctorIDFromParent) {
            let arrDays = this.setArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIDFromParent, arrDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    setArrDays = (language) => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                //Set the first date of the list become Today in vi
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${DDMM}`
                    object.label = today
                } else {
                    //use loop and moment fuction to get 7 days since today and add format
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi)

                }
            } else {
                //Set the first date of the list become Today in en
                if (i === 0) {
                    let DDMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${DDMM}`
                    object.label = today
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM')
                }
            }
            //use startOf to get the time 00:00:00 of the day 
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()

            arrDays.push(object)
        }
        return arrDays;

    }
    changeLanguage = (language) => {
        //fire redux action
        this.props.changeLanguageAppRedux(language)
    }

    handleOnChangeSelect = async (event) => {
        //set value for res
        if (this.props.doctorIDFromParent && this.props.doctorIDFromParent !== -1) {
            let doctorID = this.props.doctorIDFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorID, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }
    handleChooseSchedule = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
    }
    render() {
        let { allDays } = this.state;
        let { allAvailableTime } = this.state
        let { language } = this.props
        let { isOpenModalBooking, dataScheduleModal } = this.state
        return (
            //set value for select using map(loop)
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>{item.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-schedule'>
                            <i className="fas fa-calendar-plus"></i>
                            <span>Schedule</span>
                        </div>
                        <div className='schedule-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <React.Fragment>
                                    {allAvailableTime.map((item, index) => {
                                        let time = language === LANGUAGES.VI ? item.timeTypeData.value_vi : item.timeTypeData.value_en
                                        return (
                                            <button key={index}
                                                onClick={() => this.handleChooseSchedule(item)}
                                            >{time}</button>
                                        )
                                    })}
                                    <div className='book-schedule-free'>
                                        <span>Choose <i className="fas fa-hand-point-up"></i> and book apointment for free</span>
                                    </div>
                                </React.Fragment>
                                :
                                <div className='message'>No time is available! <br></br>Can't make an appointment on this date</div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModalBooking={isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleModal={dataScheduleModal}
                />
            </>
        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
