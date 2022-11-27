import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { CommonUtils, LANGUAGES } from '../../../utils';
import { changeLanguageApp } from '../../../store/actions';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        }
    }

    async componentDidMount() {
        let { language } = this.props
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    changeLanguage = (language) => {
        //fire redux action
        this.props.changeLanguageAppRedux(language)
    }
    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveClinic = async () => {
        let res = await createNewClinic(this.state)
        if (res && res.response.errCode === 0) {
            toast.success('Create specialty succes')
            this.setState({
                name: '',
                imageBase64: '',
                address: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Create failed')
        }
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>MANAGE CLINIC</div>

                <div className='add-new-specialty'>
                    <div className='col-4 form-group'>
                        <label>Clinic name</label>
                        <input className='form-control'
                            value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Clinic address</label>
                        <input className='form-control'
                            value={this.state.address}
                            onChange={(event) => this.handleOnchangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Clinic image</label>
                        <br></br>
                        <input type='file'
                            onChange={(event) => this.handleOnchangeImage(event)}
                        />
                    </div>

                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        //recieve props => do not need the () after fuction name
                        onChange={this.handleEditorChange}
                        value={this.state.descriptionMarkdown}
                    />
                </div>
                <div className='button-save'>
                    <button className='btn-save-specialty'
                        onClick={() => this.handleSaveClinic()}
                    >ADD CLINIC</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
