import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import specialty from '../../../assets/specialty/120331-co-xuong-khop.jpeg';

class Specialty extends Component {

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
            <div className='specialty'>
                <div className='specialty-containter'>
                    <div className='specialty-header'>
                        <span>Chuyên khoa phổ biến</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='specialty-content'>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={specialty} />
                                <div>Co xuong khop</div>
                            </div>
                            <div className='img-customize'>
                                <img src={specialty} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={specialty} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={specialty} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={specialty} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={specialty} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
