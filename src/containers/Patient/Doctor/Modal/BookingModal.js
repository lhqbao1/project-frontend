import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../../utils';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import Select from 'react-select'
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import _ from 'lodash'


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDay: '',
            genders: '',
            doctorID: '',
            selectedGender: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        let { language } = this.props
        this.props.getGenders()
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language

        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.value_vi : item.value_en
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleModal !== prevProps.dataScheduleModal) {
            if (this.props.dataScheduleModal && !_.isEmpty(this.props.dataScheduleModal)) {
                let doctorID = this.props.dataScheduleModal.doctorID
                let timeType = this.props.dataScheduleModal.timeType
                this.setState({
                    doctorID: doctorID,
                    timeType: timeType
                })
            }
        }

    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state }
        copyState[id] = valueInput
        this.setState({
            ...copyState
        })
    }
    handleOnChangeDatePicker = (date) => {
        //set state for currentDate when choose
        this.setState({
            birthDay: date[0]
        })
    }
    handleChangSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })

    }
    handleConfirmBooking = async () => {
        //validate input
        let date = new Date(this.state.birthDay).getTime()
        let timeString = this.buildTimeBooking(this.props.dataScheduleModal)
        let doctorName = this.buildDoctorName(this.props.dataScheduleModal)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleModal.date,
            birthday: date,
            doctorID: this.state.doctorID,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success('Booking appointment succes')
            this.props.closeBookingModal()
            this.setState({
                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthDay: '',
                doctorID: '',
                selectedGender: '',
            })
        } else {
            toast.error('Book appointment failed')
        }
    }
    buildTimeBooking = (dataScheduleModal) => {
        let { language } = this.props
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleModal.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataScheduleModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataScheduleModal.timeTypeData.value_vi : dataScheduleModal.timeTypeData.value_en
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataScheduleModal) => {
        let { language } = this.props
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            let name = `${dataScheduleModal.doctorData.firstName} ${dataScheduleModal.doctorData.lastName}`
            return name;
        }
        return ''
    }

    render() {
        let { isOpenModalBooking, closeBookingModal, dataScheduleModal } = this.props
        let doctorID = dataScheduleModal && !_.isEmpty(dataScheduleModal) ? dataScheduleModal.doctorID : ''
        return (
            <Modal
                isOpen={isOpenModalBooking}
                className='booking-modal-container'
                size='lg'
                centered
            >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <div className='right'>Booking Information</div>
                        <div className='left'><i
                            onClick={closeBookingModal}
                            className="fas fa-times"></i>
                        </div>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorID={doctorID}
                                dataScheduleModal={dataScheduleModal}
                            />
                        </div>
                        <div className='price-infor'></div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Name</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Phone number</label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Address</label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Reason</label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Birthday</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    // value={this.state.currentDate}
                                    value={this.state.birthDay[0]}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Gender</label>
                                <Select
                                    value={this.state.selectedGender}
                                    options={this.state.genders}
                                    onChange={this.handleChangSelect}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <div className='button'
                            onClick={() => this.handleConfirmBooking()}
                        >Confirm</div>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
