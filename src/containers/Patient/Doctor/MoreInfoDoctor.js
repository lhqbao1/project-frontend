import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './MoreInfoDoctor.scss';
import { getMoreInforDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format'

class MoreInfoDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            moreInfor: {}
        }
    }



    async componentDidMount() {
        let { language } = this.props
        let res = await getMoreInforDoctorById(this.props.doctorIDFromParent)
        if (res && res.errCode === 0) {
            this.setState({
                moreInfor: res.moreInfoDoctor
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorIDFromParent !== prevProps.doctorIDFromParent) {
            let res = await getMoreInforDoctorById(this.props.doctorIDFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    moreInfor: res.moreInfoDoctor
                })
            }
        }
    }

    handleShowDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }



    render() {
        let { language } = this.props
        let { isShowDetail, moreInfor } = this.state
        return (
            <div className='more-infor-doctor-container'>
                <div className='content-up'>
                    <div className='content-up-header'>ĐỊA CHỈ KHÁM</div>
                    <div className='content-up-clinic'>{moreInfor && moreInfor.nameClinic ? moreInfor.nameClinic : ''}
                    </div>
                    <div className='content-up-address'>{moreInfor && moreInfor.addressClinic ? moreInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>

                    {isShowDetail === false &&
                        <span>
                            <div className='content-down-price-before'>
                                GIÁ KHÁM:
                                {moreInfor && moreInfor.priceData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                        value={moreInfor.priceData.value_vi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                {moreInfor && moreInfor.priceData && language === LANGUAGES.EN &&
                                    <NumberFormat
                                        value={moreInfor.priceData.value_en}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                }
                            </div>
                            <div className='show-detail' onClick={() => this.handleShowDetail()}> Xem chi tiết</div>
                        </span>
                    }
                    {isShowDetail === true &&
                        <>
                            <div className='content-down-price-after'>
                                <div className='content-down-price-after-text'>
                                    <div>Giá khám:</div>
                                    <div className='content-down-price-after-text-opacity'>{moreInfor && moreInfor.note ? moreInfor.note : ''}</div>

                                </div>
                                <div>{moreInfor && moreInfor.priceData && language === LANGUAGES.VI &&
                                    <NumberFormat
                                        value={moreInfor.priceData.value_vi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                }
                                    {moreInfor && moreInfor.priceData && language === LANGUAGES.EN &&
                                        <NumberFormat
                                            value={moreInfor.priceData.value_en}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'$'}
                                        />
                                    }</div>
                            </div>
                            <div className='paymet-method'>
                                Hình thức thanh toán:
                                <br></br>
                                <li>{moreInfor && moreInfor.paymentData
                                    && language === LANGUAGES.VI &&
                                    moreInfor.paymentData.value_vi}
                                    {moreInfor && moreInfor.paymentData
                                        && language === LANGUAGES.EN &&
                                        moreInfor.paymentData.value_en}</li>

                            </div>
                            <div className='show-detail' onClick={() => this.handleShowDetail()}> Ẩn bảng giá</div>

                        </>
                    }

                </div>
            </div>

        )

    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoDoctor);
