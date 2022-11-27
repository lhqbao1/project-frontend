import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Video.scss';




class Video extends Component {

    render() {

        return (
            <div className='video'>
                <div className='video-header'>Truyền thông nói về Booking Care</div>
                <iframe width="1440" height="595"
                    src="https://www.youtube.com/embed/FyDQljKtWnI"
                    title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
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

export default connect(mapStateToProps, mapDispatchToProps)(Video);
