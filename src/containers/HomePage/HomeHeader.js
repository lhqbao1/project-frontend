import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux action

    }
    render() {
        return (
            <React.Fragment>
                <div className='home-header-containter'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='left-content-icon'><i className="fas fa-bars"></i></div>
                            <div className='left-content-logo'></div>
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
                <div className='home-header-banner'>
                    <div className='home-header-banner-title'>
                        <div className='title-first-subtitle'>Nền tảng y tế</div>
                        <div className='title-second-subtitle'>Chăm sóc sức khỏe toàn diện</div>
                        <div className='home-header-banner-search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Search' />
                        </div>
                    </div>
                    <div className='options'>
                        <div className='options-content'>
                            <div className='options-content-image'></div>
                            <div className='options-content-text'>Khám <br></br>Chuyên khoa</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-2'></div>
                            <div className='options-content-text'>Khám <br></br>từ xa</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-3'></div>
                            <div className='options-content-text'>Khám <br></br>tổng quát</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-4'></div>
                            <div className='options-content-text'>Xét nghiệm <br></br>Y học</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-5'></div>
                            <div className='options-content-text'>Sức khỏe <br></br>tinh thần</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-6'></div>
                            <div className='options-content-text'>Khám <br></br>nha khoa</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-7'></div>
                            <div className='options-content-text'>Gói <br></br>Phẫu thuật</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-8'></div>
                            <div className='options-content-text'>Sản phẩm <br></br>Y tế</div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-9'></div>
                            <div className='options-content-text'>Sức khỏe <br></br>Doanh nghiệp</div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
