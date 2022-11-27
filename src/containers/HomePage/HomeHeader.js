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
                                <div className='center-content-item-item'><FormattedMessage id="homeheader.doctorFind" /></div>
                            </div>
                            <div className='center-content-item'>
                                <div><b><FormattedMessage id="homeheader.facility" /></b></div>
                                <div className='center-content-item-item'><FormattedMessage id="homeheader.hosPlace" /></div>
                            </div>
                            <div className='center-content-item'>
                                <div><b><FormattedMessage id="homeheader.doctor" /></b></div>
                                <div className='center-content-item-item'><FormattedMessage id="homeheader.goodDoctor" /></div>
                            </div>
                            <div className='center-content-item'>
                                <div><b><FormattedMessage id="homeheader.pack" /></b></div>
                                <div className='center-content-item-item'><FormattedMessage id="homeheader.genExam" /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='right-content-item'>
                                <div className='right-content-icon'><i className="fas fa-question-circle"></i></div>
                                <div className='right-content-text'><FormattedMessage id="homeheader.sp" /></div>
                            </div>
                            <div className='right-content-language'>
                                <div className={this.props.language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                                <div className={this.props.language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                            </div>
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
