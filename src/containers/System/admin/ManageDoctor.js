import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions'


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import { getDetailInfoDoctor, getAllClinic } from '../../../services/userService'


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    //ham` tao states trong class
    constructor(props) {
        super(props);
        this.state = {
            //save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: [],
            hasData: false,

            //save to doctor_info
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],
            selectedPayment: '',
            selectedPrice: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: ''
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor();
        let dataClinic = await getAllClinic()
        let dataSelect = this.buildDataInput(dataClinic.data, "CLINIC");
        this.setState({
            listClinic: dataSelect
        })
    }

    //build select data
    buildDataInput = (inputData, type) => {
        let result = [];
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    //set condition by send (type)
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let object = {};
                    //set condition by send (type)
                    object.label = item.name;
                    object.address = item.address
                    object.value = item.id
                    result.push(object)
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.value_vi} VND`;
                    let labelEn = `${item.value_en} USD`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.value_vi}`;
                    let labelEn = `${item.value_en}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.keyMap
                    result.push(object)
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id
                    result.push(object)
                })
            }

        }

        return result;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, "USERS");
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, "USERS");
            this.setState({
                listDoctors: dataSelect
            })
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInput(resPrice, "PRICE");
            let dataSelectProvince = this.buildDataInput(resProvince, "PROVINCE");
            let dataSelectPayment = this.buildDataInput(resPayment, "PAYMENT");
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPayment, resPrice, resProvince, resSpecialty } = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInput(resPrice, "PRICE");
            let dataSelectProvince = this.buildDataInput(resProvince, "PROVINCE");
            let dataSelectPayment = this.buildDataInput(resPayment, "PAYMENT");
            let dataSelectSpecialty = this.buildDataInput(resSpecialty, "SPECIALTY");
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty
            })
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        // console.log('handleEditorChange', html, text);
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveDoctor = () => {

        let { hasData } = this.state
        // console.log(this.state.selectedSpecialty)
        // return;
        this.props.createDoctorAction({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
            selectedPayment: this.state.selectedPayment.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.selectedClinic.label,
            addressClinic: this.state.selectedClinic.address,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic.value
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            selectedPayment: '',
            selectedPrice: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            selectedClinic: '',
            selectedSpecialty: ''
        })
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
        let { listPayment, listProvince, listPrice, listSpecialty, listClinic } = this.state
        let response = await getDetailInfoDoctor(selectedDoctor.value)
        if (response && response.errCode === 0 && response.data && response.data.Markdown) {
            let markdown = response.data.Markdown
            let addressClinic = '', nameClinic = '', note = '',
                paymentId = '', priceId = '', provinceId = '', specialtyId = '', clinicId = ''
            let selectedPrice = ''
            let selectedPayment = ''
            let selectedProvince = ''
            let selectedSpecialty = ''
            let selectedClinic = ''
            if (response.data.Doctor_Infor) {
                addressClinic = response.data.Doctor_Infor.addressClinic;
                nameClinic = response.data.Doctor_Infor.nameClinic;
                note = response.data.Doctor_Infor.note;
                paymentId = response.data.Doctor_Infor.paymentId;
                priceId = response.data.Doctor_Infor.priceId;
                provinceId = response.data.Doctor_Infor.provinceId;
                specialtyId = response.data.Doctor_Infor.specialtyId;
                clinicId = response.data.Doctor_Infor.clinicId

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
            }
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                note: note,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic,
                hasData: true
            })
        }
        if (response && response.errCode === 0 && response.data && response.data.Markdown && !response.data.Markdown.contentHTML && !response.data.firstName) {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasData: false
            })
        }
        // let isNull = Object.keys(response.data.Doctor_Infor).length === 0
        if (response && response.errCode === 0 && response.data
            && response.data.Doctor_Infor && !response.data.Doctor_Infor.addressClinic
        ) {
            this.setState({
                addressClinic: '',
                nameClinic: '',
                note: '',
                priceId: '',
                provinceId: '',
                paymentId: '',
                specialtyId: '',
                hasData: false
            })
        }


    }
    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        console.log(selectedOption)

        let stateName = name.name;
        let copyState = { ...this.state };
        copyState[stateName] = selectedOption;
        this.setState({
            ...copyState
        })

    }
    handleOnChangeText = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    render() {
        let { hasData, listSpecialty, listClinic } = this.state
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-content'>
                    <div className='manage-doctor-title'><FormattedMessage id="menu.detailDoctor.manage-doctor" /></div>
                    <div className='more-inf'>
                        <div className='content-left form-group col-6' >
                            <label> <FormattedMessage id="menu.detailDoctor.description" /> </label>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                        <div className='content-right'>
                            <label> <FormattedMessage id="menu.detailDoctor.select" /> </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                                placeholder={<FormattedMessage id="menu.detailDoctor.select" />}
                            />
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col 4 form-group'>
                            <label> <FormattedMessage id="menu.detailDoctor.price" /></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPrice}
                                placeholder={<FormattedMessage id="menu.detailDoctor.price" />}
                                name="selectedPrice"
                            />
                        </div>
                        <div className='col 4 form-group'>
                            <label>  <FormattedMessage id="menu.detailDoctor.payment" /></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listPayment}
                                placeholder={<FormattedMessage id="menu.detailDoctor.payment" />}
                                name="selectedPayment"
                            />
                        </div>
                        <div className='col 4 form-group'>
                            <label> <FormattedMessage id="menu.detailDoctor.pro" /></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={this.state.listProvince}
                                placeholder={<FormattedMessage id="menu.detailDoctor.pro" />}
                                name="selectedProvince"
                            />
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        {/* <div className='col 4 form-group'>
                            <label>Choose clinic</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div> */}
                        {/* <div className='col 4 form-group'>
                            <label>Choose clinic address</label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div> */}
                        <div className='col 4 form-group'>
                            <label> <FormattedMessage id="menu.detailDoctor.note" /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label> <FormattedMessage id="menu.detailDoctor.spec" /></label>
                            <Select
                                onChange={this.handleChangeSelectDoctorInfo}
                                value={this.state.selectedSpecialty}
                                options={listSpecialty}
                                placeholder={<FormattedMessage id="menu.detailDoctor.spec" />}
                                name="selectedSpecialty"
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label> <FormattedMessage id="menu.detailDoctor.clinic" /></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfo}
                                options={listClinic}
                                placeholder={<FormattedMessage id="menu.detailDoctor.clinic" />}
                                name="selectedClinic"

                            />
                        </div>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        //recieve props => do not need the () after fuction name
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className={hasData === true ? 'edit-content-doctor' : 'save-content-doctor'}
                    onClick={() => this.handleSaveDoctor()}
                > <FormattedMessage id={hasData === true ? 'menu.detailDoctor.button-edit' : "menu.detailDoctor.button-save"} /> </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        createDoctorAction: (data) => dispatch(actions.createDoctorAction(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
