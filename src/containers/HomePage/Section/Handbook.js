import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Handbook.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import handbook from '../../../assets/handbook/135057-xet-nghiem-noi-tiet-o-dau-tphcm.png';


class Handbook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            // nextArrow: <SampleNextArrow />,
            // prevArrow: <SamplePrevArrow />

        };
        return (
            <div className='handbook'>
                <div className='handbook-containter'>
                    <div className='handbook-header'>
                        <span>Cẩm nang</span>
                        <button>Xem thêm</button>
                    </div>
                    <div className='handbook-content'>
                        <Slider {...settings}>
                            <div className='img-customize'>
                                <img src={handbook} />
                                <div>Khám nam học, Bệnh viện Nam học và Hiến muộn Hà Nội</div>
                            </div>
                            <div className='img-customize'>
                                <img src={handbook} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={handbook} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={handbook} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={handbook} />
                                <div>Co xuong khop</div>                            </div>
                            <div className='img-customize'>
                                <img src={handbook} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
