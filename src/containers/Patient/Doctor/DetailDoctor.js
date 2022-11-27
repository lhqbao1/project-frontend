import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './DetailDoctor.scss'
import HomeFooter from '../../HomePage/HomeFooter';
import { getDetailInfoDoctor } from '../../../services/userService';
import doctor from '../../../assets/doctor/bs2.png';
import { withRouter } from 'react-router';
import ScheduleDoctor from './ScheduleDoctor';
import MoreInfoDoctor from './MoreInfoDoctor';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            language: '',
            currentDoctorId: -1,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                language: this.props.language
            })
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux action
    }
    backToHome = () => {
        if (this.props.history) {
            this.props.history.push('/home')
        }
    }
    render() {
        let { detailDoctor } = this.state
        console.log(detailDoctor)
        let language = this.state.language
        let positionVi = ''
        let positionEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            positionVi = `${detailDoctor.positionData.value_vi}`
            positionEn = `${detailDoctor.positionData.value_en}`
        }
        return (
            <React.Fragment>
                <div className='home-header-containter'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='left-content-icon'><i className="fas fa-bars"></i></div>
                            <div className='left-content-logo' onClick={() => this.backToHome()}>
                            </div>
                        </div>
                        <div className='center-content'>
                            <div className='center-content-item'>
                                <div><b> <FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='center-content-item-item'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='center-content-item'>
                                <div><b><FormattedMessage id="homeheader.facility" /></b></div>
                                <div className='center-content-item-item'>Chọn bệnh viện phòng khám</div>
                            </div>
                            <div className='center-content-item'>
                                <div><b>Bác sĩ</b></div>
                                <div className='center-content-item-item'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='center-content-item'>
                                <div><b>Gói khám</b></div>
                                <div className='center-content-item-item'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='right-content-item'>
                                <div className='right-content-icon'><i className="fas fa-question-circle"></i></div>
                                <div className='right-content-text'>Hỗ trợ</div>
                            </div>
                            <div className='right-content-language'>
                                <div className={this.props.language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                                <div className={this.props.language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <ul className="menu">
                        <li className="menu-item">
                            <i className="fas fa-home"></i>
                        </li>
                        <li className="menu-item">
                            <a href="#" className="menu-link">/ Khám chuyên khoa</a>
                        </li>
                        <li className="menu-item">
                            <a href="#" className="menu-link">/ Da liễu</a>
                        </li>
                    </ul>

                    <div className="info">
                        <div className="info-image" style={{ backgroundImage: `url(${detailDoctor.image})` }}>
                            {/* <img src={doctor}
                                alt="" className="info-doctor" /> */}
                        </div>
                        <div className="info-left">

                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description &&

                                <span>
                                    <div className='doctor-name'>{language === LANGUAGES.VI ? positionVi : positionEn}, {detailDoctor.firstName} {detailDoctor.lastName}</div>
                                    <br></br>
                                    {detailDoctor.Markdown.description}
                                </span>
                            }
                        </div>
                        <div className="info-footer">

                        </div>
                    </div>

                    <div className="doctor-schedule">
                        <div className='right-content'>
                            <ScheduleDoctor
                                //send doctorIDFromParent to ScheduleDoctor
                                doctorIDFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className='left-content'>
                            <MoreInfoDoctor
                                //send doctorIDFromParent to ScheduleDoctor
                                doctorIDFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <hr></hr>

                    <div className="detail">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <span>
                                <h2 className='doctor-name'>{detailDoctor.positionData.value_en}, {detailDoctor.firstName} {detailDoctor.lastName}</h2>
                                <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}></div>

                            </span>
                        }
                    </div>

                    <div className="response">
                        <h2>Phản hồi của bệnh nhân sau khi đi khám</h2>
                        <div className="resonse-comment">
                            <div className="response-name">Nguyễn Hoàng Phương Chi <i className="fas fa-check-square"></i> <span>Đã khám ngày 16/10/2022</span></div>
                            <div className="response-text">Bác sĩ rất giỏi, bé nhà mình cải thiện da rất nhiều. Cảm ơn bác sỹ</div>
                        </div>
                    </div>

                </div>
                <HomeFooter />
            </React.Fragment >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailDoctor));
