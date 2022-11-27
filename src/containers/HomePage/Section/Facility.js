import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Facility.scss';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getAllClinic } from '../../../services/userService'


class Facility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],

        }
    }
    async componentDidMount() {
        let res = await getAllClinic()

        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }

    handleOnlick = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`)
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
        let { dataClinic } = this.state
        return (
            <div className='facility'>
                <div className='facility-containter'>
                    <div className='facility-header'>
                        <span><FormattedMessage id="homeheader.facility2" /></span>
                        <button><FormattedMessage id="homeheader.more" /></button>
                    </div>
                    <div className='facility-content'>
                        <Slider {...settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => this.handleOnlick(item)}>
                                            <div className='img-customize'>
                                                <img src={item.image} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Facility));
