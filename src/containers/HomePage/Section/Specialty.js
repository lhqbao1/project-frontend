import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllSpecialty } from '../../../services/userService'

class Specialty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSpecialty: [],

        }
    }
    async componentDidMount() {
        let res = await getAllSpecialty()
        if (res && res.response.errCode === 0) {
            this.setState({
                dataSpecialty: res.response.data
            })
        }
    }
    handleOnlick = (specialty) => {
        this.props.history.push(`/detail-specialty/${specialty.id}`)
    }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />

        };
        let { dataSpecialty } = this.state
        return (
            <div className='specialty'>
                <div className='specialty-containter'>
                    <div className='specialty-header'>
                        <span><FormattedMessage id="homeheader.spec2" /></span>
                        <button><FormattedMessage id="homeheader.more" /></button>
                    </div>
                    <div className='specialty-content'>
                        <Slider {...settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => this.handleOnlick(item)}>
                                            <div className='img-customize'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >
                                            </div>
                                            <div className='name'>{item.name}</div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fire changeLanguageApp action
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
