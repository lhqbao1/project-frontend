import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Facility.scss';
import { FormattedMessage } from 'react-intl';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import facility from '../../../assets/facility/114348-bv-viet-duc.jpeg';


class Facility extends Component {

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
        return (
            <div className='facility'>
                <div className='facility-containter'>
                    <div className='facility-header'>
                        <span>Cơ sở y tế nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='facility-content'>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={facility} />
                                <div>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='img-customize'>
                                <img src={facility} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={facility} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={facility} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={facility} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={facility} />
                                <div>Co xuong khop</div>                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Facility);
