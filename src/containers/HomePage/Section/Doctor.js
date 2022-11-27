import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import doctor from '../../../assets/doctor/bs2.png';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant';
import { withRouter } from 'react-router';
import { getDoctor } from '../../../services/userService'

class Doctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: [],
            listDoctor: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorRedux !== this.props.doctorRedux) {
            this.setState({
                arrDoctor: this.props.doctorRedux
            })
        }
    }

    async componentDidMount() {
        this.props.loadDoctor();

        let res = await getDoctor('10')
        if (res && res.errCode === 0) {
            this.setState({
                listDoctor: res.data
            })
        }


    }
    handleFetchDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctor = this.state.arrDoctor;
        console.log(arrDoctor)
        let language = this.props.language;
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />

        };
        return (

            <div className='doctor'>
                <div className='doctor-containter'>
                    <div className='doctor-header'>
                        <span><FormattedMessage id="homeheader.doctor2" /></span>
                        <button><FormattedMessage id="homeheader.more" /></button>
                    </div>
                    <div className='doctor-content'>
                        <Slider {...settings}>

                            {arrDoctor && arrDoctor.length > 0 &&
                                arrDoctor.map((item, index) => {

                                    let nameVi = `${item.positionData.value_vi}, ${item.firstName} ${item.lastName}`
                                    let nameEn = `${item.positionData.value_en}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='img-customize' key={index} onClick={() => this.handleFetchDetailDoctor(item)}>
                                            <div className='img-doctor'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>
                                            <div className='name-content'> {language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div className='sub-content'>{item.Doctor_Infor.specialtyData.name}</div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        doctorRedux: state.admin.doctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDoctor: () => dispatch(actions.fetchDoctor())
        //fire changeLanguageApp action
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
