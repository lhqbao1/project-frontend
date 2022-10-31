import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Doctor.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import doctor from '../../../assets/doctor/103848anh-dai-dien-bs.jpeg';


class Doctor extends Component {

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
            <div className='doctor'>
                <div className='doctor-containter'>
                    <div className='doctor-header'>
                        <span>Bác sĩ nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='doctor-content'>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={doctor} />
                                <div>Khám nam học, Bệnh viện Nam học và Hiến muộn Hà Nội</div>
                                <div className='sub-content'>Nam hoc</div>
                            </div>
                            <div className='img-customize'>
                                <img src={doctor} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={doctor} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={doctor} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={doctor} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={doctor} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
