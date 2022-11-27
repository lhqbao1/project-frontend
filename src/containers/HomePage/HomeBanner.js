import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './HomeBanner.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
class HomeBanner extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        //fire redux action

    }

    render() {
        return (
            <React.Fragment>
                <div className='home-header-banner'>
                    <div className='home-header-banner-title'>
                        <div className='title-first-subtitle'><FormattedMessage id="homeheader.basis" /></div>
                        <div className='title-second-subtitle'><FormattedMessage id="homeheader.care" /></div>
                        <div className='home-header-banner-search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Search' />
                        </div>
                    </div>
                    <div className='options'>
                        <div className='options-content'>
                            <div className='options-content-image'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.spec" /> <br></br><FormattedMessage id="homeheader.exam" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-2'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.over" /> <br></br><FormattedMessage id="homeheader.exam2" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-3'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.gen" /> <br></br><FormattedMessage id="homeheader.exam3" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-4'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.mec" /> <br></br><FormattedMessage id="homeheader.exam4" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-5'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.mental" /> <br></br><FormattedMessage id="homeheader.health" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-6'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.dentist" /> <br></br><FormattedMessage id="homeheader.exam5" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-7'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.sur" /> <br></br><FormattedMessage id="homeheader.packs" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-8'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.medical" /> <br></br><FormattedMessage id="homeheader.product" /></div>
                        </div>
                        <div className='options-content'>
                            <div className='options-content-image-9'></div>
                            <div className='options-content-text'><FormattedMessage id="homeheader.enter" /> <br></br><FormattedMessage id="homeheader.health2" /></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
