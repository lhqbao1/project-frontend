import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './DoctorPatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor } from '../../../services/userService';
import moment from 'moment';



class DoctorPatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }

    async componentDidMount() {
        let { language } = this.props
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        this.getDataPatient(user, formatedDate)

    }
    getDataPatient = async (user, formatedDate) => {
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        if (res) {
            this.setState({
                dataPatient: res.data
            })
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
    handleOnChangeDatePicker = (date) => {
        //set state for currentDate when choose
        date[0] = new Date(date[0]).getTime()
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            this.getDataPatient(user, currentDate)
        })
    }

    render() {
        let { dataPatient } = this.state
        console.log(dataPatient)
        let { language } = this.props
        return (
            <div className='manage-patient-container'>
                <div className='mp-title'>
                    MANAGE PATIENT
                </div>
                <div className='mp-input'>
                    <div className='col-4 form-group'>
                        <label>Choose date</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                        />
                    </div>
                </div>
                <div className='table'>
                    <table id="simple-board">
                        <tbody>
                            <tr id="row0">
                                <th id="cell0-0">STT</th>
                                <th id="cell0-1">Full name</th>
                                <th id="cell0-2">Gender</th>
                                <th id="cell0-4">Time</th>
                                <th id="cell0-5">Address</th>
                                <th id="cell0-3">Actions</th>

                            </tr>
                            {dataPatient && dataPatient.patientData && dataPatient.length > 0 ?
                                dataPatient.map((item, index) => {
                                    return (
                                        <tr id="row1">
                                            <td id="cell1-0">{index + 1}</td>
                                            <td id="cell1-1">{item.patientData.firstName}</td>
                                            <td id="cell1-2">{language === LANGUAGES.VI ? item.patientData.genderData.value_vi : item.patientData.genderData.value_en}</td>
                                            <td id="cell1-4">{item.timeTypeDataBooking.value_vi}</td>
                                            <td id="cell1-5">{item.patientData.address}</td>
                                            <td id="cell1-3">
                                                <button>Confirm</button>
                                                <button>Send bill</button>
                                            </td>

                                        </tr>
                                    )
                                })
                                : <tr>
                                    <td>no data</td>
                                </tr>
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPatient);
