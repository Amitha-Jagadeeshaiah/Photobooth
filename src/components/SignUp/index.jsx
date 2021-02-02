import React from 'react';
import Styles from './index.module.css';
import Popup from '../Popup';
import Content from '../Content';
import { emailIsValid, dobIsValid, isBetween } from '../Utilities/validations';
import {
    firstnameErrorMsg,
    lastnameErrorMsg,
    emailErrorMsg,
    dobErrorMsg,
    checkboxErrorMsg
} from '../Utilities/errorMsg';

const {
    signupContainer,
    headerContainer,
    header1,
    header2,
    h1,
    h2,
    header,
    formContainer,
    form,
    labelFirstname,
    labelSurname,
    labelEmail,
    labelDOB,
    footerContainer,
    inputContainer,
    inputtext,
    checkboxContainer,
    consentCheckbox,
    inputCheckbox,
    consentData,
    modalLink,
    skipSubmission,
    submitData,
    btn1h1,
    btn1h2,
    btn2h1,
    btn2h2,
    PopupHeader,
    PopupHeading1,
    PopupHeading2,
    termsAndConditions,
    errorMsg
} = Styles;

export default class SignUp extends React.Component {

    constructor(props){

        super(props);
        this.state = {
            firstname:'',
            surname:'',
            email:'',
            dob:'',
            checked: true,
            phoneNumber: this.props.location.mobileNumber || '',
            data: this.props.location.data || '',
            modalDialogIsOpen: false,
            firstnameErrorMsg: '',
            surnameErrorMsg: '',
            emailErrorMsg: '',
            dobErrorMsg: '',
            checkboxErrorMsg: '',
            validationErrorCount: 0
        };

    }

    handleChange = (e) => {

        const {value} = e.target;
        this.setState({[e.target.name]:value});

    }

    handleCheck = () => {

        this.setState(prevState => ({
            checked: !prevState.checked
        }));

    }

    togglePopup = () => {

        this.setState(prevState => ({
            modalDialogIsOpen: !prevState.modalDialogIsOpen
        }));

    }

    handleImageSubmission = () => {

        const { data, phoneNumber } = this.state;
        const userInfo = {
            data,
            phoneNumber
        };
        console.log('IMAGE/GIF of User', userInfo); // This will be replaced by API Call
        this.props.history.push('/imageSent');

    }

    handleFormSubmission = async (event) => {

        event.preventDefault();
        await this.validateData();


        if(this.state.firstnameErrorMsg === ''
            && this.state.surnameErrorMsg === ''
            && this.state.emailErrorMsg === ''
            && this.state.dobErrorMsg === ''
            && this.state.checkboxErrorMsg === '') {

            const userInfo = {
                firstname: this.state.firstname,
                surname: this.state.surname,
                email: this.state.email,
                dob: this.state.dob,
                phoneNumber: this.state.phoneNumber,
                data: this.state.data
            };
            console.log('USERINFO', userInfo); // This will be replaced by API Call
            this.props.history.push('/imageSent');

        }

    }

    /**
     * Validate all inputs and then sign up if there are no issues
     */
    validateData = ()=> {

        this.validateFirstName();
        this.validateSurname();
        this.validateEmail();
        this.validateDOB();
        this.validateCheckbox();

    }

    validateFirstName = () => {

        const firstNameValid = isBetween(this.state.firstname.length, 1, 30);
        if (!firstNameValid) {

            this.setState({firstnameErrorMsg: firstnameErrorMsg});

        } else {

            this.setState({firstnameErrorMsg: ''});

        }

    }

    validateSurname = () => {

        const lastNameValid = isBetween(this.state.surname.length, 1, 30);
        if (!lastNameValid) {

            this.setState({surnameErrorMsg: lastnameErrorMsg});

        } else {

            this.setState({surnameErrorMsg: ''});

        }

    }

    validateEmail = () => {

        const emailValid = emailIsValid(this.state.email);
        if (!emailValid) {

            this.setState({emailErrorMsg: emailErrorMsg});

        } else {

            this.setState({emailErrorMsg: ''});

        }

    }

    validateDOB = () => {

        const dobValid = dobIsValid(this.state.dob);
        if (!dobValid) {

            this.setState({dobErrorMsg: dobErrorMsg});

        } else {

            this.setState({dobErrorMsg: ''});

        }

    }

    validateCheckbox = () => {

        if(!this.state.checked){

            this.setState({checkboxErrorMsg: checkboxErrorMsg});

        } else {

            this.setState({checkboxErrorMsg: ''});

        }

    }

    render(){

        return(
            <div className={signupContainer}>
                <div className={headerContainer}>
                    <div className={header1}>
                        <p className={h1}>win</p>
                        <p className={h2}>big</p>
                    </div>
                    <div className={header2}>
                        <p className={header}>
                            SIGN UP FOR A CHANCE TO WIN PRIZES IF WE USE YOUR SELFIES
                        </p>
                    </div>
                </div>
                <div className={formContainer}>
                    <form
                        className={form}
                        autoComplete="off"
                        onSubmit={this.handleFormSubmission}
                    >
                        <div className={inputContainer}>
                            <label
                                className={labelFirstname}
                                htmlFor="firstname"
                            >
                                FirstName
                            </label><br />
                            <input
                                className={inputtext}
                                type="text"
                                value={this.state.firstname}
                                name="firstname"
                                placeholder="firstname"
                                autoComplete="off"
                                onChange={(e)=>{

                                    this.handleChange(e);

                                }}
                                onBlur ={this.validateFirstName}
                            />
                        </div>
                        <span className={errorMsg}>{this.state.firstnameErrorMsg}</span>

                        <div className={inputContainer}>
                            <label
                                className={labelSurname}
                                htmlFor="surname"
                            >
                                SurName
                            </label><br />
                            <input
                                className={inputtext}
                                type="text"
                                value={this.state.surname}
                                name="surname"
                                placeholder="surname"
                                autoComplete="off"
                                onChange={(e)=>{

                                    this.handleChange(e);

                                }}
                                onBlur ={this.validateSurname}
                            />
                        </div>
                        <span className={errorMsg}>{this.state.surnameErrorMsg}</span>

                        <div className={inputContainer}>
                            <label
                                className={labelEmail}
                                htmlFor="email"
                            >
                                Email
                            </label><br />
                            <input
                                className={inputtext}
                                type="text"
                                value={this.state.email}
                                name="email"
                                placeholder="email"
                                autoComplete="off"
                                onChange={(e)=>{

                                    this.handleChange(e);

                                }}
                                onBlur ={this.validateEmail}
                            />
                        </div>
                        <span className={errorMsg}>{this.state.emailErrorMsg}</span>

                        <div className={inputContainer}>
                            <label
                                className={labelDOB}
                                htmlFor="dob"
                            >
                                DOB
                            </label><br />
                            <input
                                className={inputtext}
                                type="text"
                                value={this.state.DOB}
                                name="dob"
                                placeholder="dd/mm/yyyy"
                                autoComplete="off"
                                onChange={(e)=>{

                                    this.handleChange(e);

                                }}
                                onBlur ={this.validateDOB}
                            />
                        </div>
                        <span className={errorMsg}>{this.state.dobErrorMsg}</span>

                        <div className={checkboxContainer}>
                            <label className={consentCheckbox}>
                                <input
                                    type="checkbox"
                                    checked={this.state.checked}
                                    onChange={this.handleCheck}
                                />
                                <span className={inputCheckbox} />
                            </label>
                            <div className={consentData}>
                                <p>I consent to the usage of my data in accordance with</p>
                                <p>
                                    <span
                                        className={modalLink}
                                        onClick={this.togglePopup}
                                    >
                                        GDPR
                                    </span>
                                    &nbsp;and to the sharing of this picture on social media
                                </p>
                                <p>by TOCA Social</p>
                            </div>
                        </div>
                        <span className={errorMsg}>{this.state.checkboxErrorMsg}</span>

                        <div className={footerContainer}>
                            <button
                                type="button"
                                className={skipSubmission}
                                onClick={this.handleImageSubmission}
                            >
                                <span className={btn1h1}>Skip</span><br />
                                <span className={btn1h2}>And send selfie</span>
                            </button>
                            <button
                                type="button"
                                className={submitData}
                                onClick={this.handleFormSubmission}
                            >
                                <span className={btn2h1}>Submit</span><br />
                                <span className={btn2h2}>And send selfie</span>
                            </button>
                        </div>
                    </form>
                </div>
                {
                    this.state.modalDialogIsOpen
                    &&
                    <Popup
                        content={
                            <>
                                <div className={PopupHeader}>
                                    <p className={PopupHeading1}>TOCA Social</p>
                                    <p className={PopupHeading2}>
                                        GDPR and Picture sharing Terms and Conditions
                                    </p>
                                </div>
                                <div className={termsAndConditions}>
                                    {Content()}
                                </div>

                            </>}
                        handleClose={this.togglePopup}
                    />
                }
            </div>
        );

    }

}

