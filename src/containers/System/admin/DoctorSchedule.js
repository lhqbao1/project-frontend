import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import * as actions from '../../../store/actions'
import { toast } from "react-toastify"

import _ from 'lodash';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import { CRUD_ACTIONS, dateFormat, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor, saveBulkSchedule } from '../../../services/userService'

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDoctor: {},
            listDoctors: [],
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        //fire redux function
        this.props.fetchAllDoctor();
        this.props.fetchAllSchedule();
    }

    //build select doctor
    buildDataInput = (inputData) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.firstName} ${item.lastName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id
                result.push(object)
            })
        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //set state for listDoctors (select)
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            //create a new property(isSelected) for data(this.props.allScheduleTime)
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data.map(item => {
                    item.isSelected = false;
                    return item
                })
                // data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleChangeDoctor = async (selectedDoctor) => {
        //set state for selectedDoctor when choose
        this.setState({ selectedDoctor })
    }

    handleOnChangeDatePicker = (date) => {
        //set state for currentDate when choose
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtn = (data) => {
        //when click the rangTime button
        //set isSelected = !isSelected
        //and update state for rangTime (isSelected)
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === data.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        //get 3 state
        let { rangeTime } = this.state;
        let { selectedDoctor } = this.state;
        let { currentDate } = this.state;
        let result = []
        //validate
        if (!currentDate) {
            toast.error("You must choose date")
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("You must choose doctor")
        }
        //convert date type from string to timestamp 
        let formatedDate = new Date(currentDate).getTime()
        if (rangeTime && rangeTime.length > 0) {
            //filter fuction
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                //start a loop and set value for 'object' which is created
                selectedTime.map(item => {
                    let object = {};
                    object.doctorID = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object)
                })

            } else {
                toast.error("You must choose time")
            }
        }
        //fire services function and send a data(arrSchedule) to service
        let res = await saveBulkSchedule({
            arrSchedule: result,
            doctorID: selectedDoctor.value,
            formatedDate: formatedDate,
        })
        //add toast for create
        if (res && res.errCode === 0) {
            toast.success('Create schedule successful')
            this.setState({
                selectedDoctor: '',
                currentDate: '',
            })
        } else {
            toast.error('Create schedule failed')
        }


    }
    render() {
        let rangeTime = this.state.rangeTime
        //fix bug cannot choose today in admin
        let yesterday = new Date((new Date().setDate(new Date().getDate() - 1)))
        return (
            < div className='manage-schedule-container' >
                <div className='manage-schedule-title'><FormattedMessage id="menu.detailDoctor.manage-doctor" /></div>
                <div className='manage-schedule-content'>

                    <div className='content-left form-group col-6'>
                        <label> <FormattedMessage id="menu.detailDoctor.select" /> </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeDoctor}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right form-group col-3' >
                        <label>Choose Date</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            // value={this.state.currentDate}
                            value={this.state.currentDate[0]}
                            minDate={yesterday}
                        />
                    </div>
                </div>
                <div className='col-8 pick-hour'>
                    {rangeTime && rangeTime.length > 0 &&
                        rangeTime.map((item, index) => {
                            return (
                                <button
                                    // className='btn-schedule'
                                    className={item.isSelected === true ? 'btn-schedule-active' : 'btn-schedule'}
                                    key={index}
                                    onClick={() => this.handleClickBtn(item)}
                                >{item.value_vi}</button>
                            )
                        })
                    }
                </div>
                <button
                    className='save-btn'
                    onClick={() => this.handleSaveSchedule()}
                >Save schedule</button>

            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        createDoctorAction: (data) => dispatch(actions.createDoctorAction(data)),
        fetchAllSchedule: () => dispatch(actions.fetchAllSchedule())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
