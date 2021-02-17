import React from 'react';
import {Link} from 'react-router-dom';
import Styles from './index.module.css';
import Popup from '../Popup';
import ActionConfirmModalDialog from '../ActionConfirmModalDialog';
import Content from '../Content';
import { ReactComponent as ErrorIcon} from '../../Images/error-icon.svg';
import { ReactComponent as CloseIcon} from '../../Images/closeIcon.svg';
import { emailIsValid, dobIsValid, isBetween } from '../Utilities/validations';
import {
    firstnameErrorMsg,
    lastnameErrorMsg,
    emailErrorMsg,
    dobErrorMsg,
    checkboxErrorMsg
} from '../Utilities/errorMsg';

const { signupContainer,headerContainer,closeSignUpForm,
    header1,header2,h1,h2,header,formContainer,form,
    labelFirstname,labelSurname,labelEmail,labelDOB,
    footerContainer,inputContainer,inputtext,checkboxContainer,
    checkboxContainer1,consentCheckbox,consentCheckbox1,
    inputCheckbox,inputCheckbox1,consentData,consentData1,
    modalLink,skipSubmission,submitData,btn1h1,btn1h2,
    btn2h1,btn2h2,PopupHeader,PopupHeading1,PopupHeading2,
    termsAndConditions,actionConfirmheading,confirmActionFooter,
    confirmActionButton,denyActionButton,errorMsg,checkErrorMsg,
    checkErrorMsg1 } = Styles;

export default class SignUp extends React.Component {

    constructor(props){

        super(props);
        this.state = {
            firstname:'',
            surname:'',
            email:'',
            dob:'',
            checked: false,
            checked1: false,
            phoneNumber: this.props.location.userInfo.phoneNumber || '',
            data: this.props.location.userInfo.data || '',
            modalDialogIsOpen: false,
            formCloseConfirmation: false,
            firstnameErrorMsg: '',
            surnameErrorMsg: '',
            emailErrorMsg: '',
            dobErrorMsg: '',
            checkboxErrorMsg: '',
            checkboxErrorMsg1: '',
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

    handleCheck1 = () => {

        this.setState(prevState => ({
            checked1: !prevState.checked1
        }));

    }

    togglePopup = () => {

        this.setState(prevState => ({
            modalDialogIsOpen: !prevState.modalDialogIsOpen
        }));

    }

    togglemodalDialog = () => {

        this.setState(prevState => ({
            formCloseConfirmation: !prevState.formCloseConfirmation
        }));

    }

    handleImageSubmission = async (event) => {

        event.preventDefault();
        if(this.state.checkboxErrorMsg1) {

            await this.setState({
                firstnameErrorMsg: '',
                surnameErrorMsg: '',
                emailErrorMsg: '',
                dobErrorMsg: '',
                checkboxErrorMsg: ''
            });

        } else {

            await this.validateCheckbox1();

        }
        if(this.state.checked1) {

            const { data, phoneNumber } = this.state;
            const userInfo = {
                data,
                phoneNumber
            };
            console.log('IMAGE/GIF of User', userInfo); // This will be replaced by API Call
            this.props.history.push('/imageSent');

        }

    }

    handleFormSubmission = async (event) => {

        event.preventDefault();
        await this.validateData();


        if(this.state.firstnameErrorMsg === ''
            && this.state.surnameErrorMsg === ''
            && this.state.emailErrorMsg === ''
            && this.state.dobErrorMsg === ''
            && this.state.checkboxErrorMsg === ''
            && this.state.checkboxErrorMsg1 === '') {

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
        this.validateCheckbox1();

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

    validateCheckbox1 = () => {

        if(!this.state.checked1){

            this.setState({checkboxErrorMsg1: checkboxErrorMsg});

        } else {

            this.setState({checkboxErrorMsg1: ''});

        }

    }

    render(){

        return(
            <div className={signupContainer}>
                <div className={headerContainer}>
                    <div className={closeSignUpForm} onClick={this.togglemodalDialog}>
                        <CloseIcon />
                    </div>
                    <div className={header1}>
                        <p className={h1}>win</p>
                        <p className={h2}>big</p>
                    </div>
                    <div className={header2}>
                        <p className={header}>
                            SIGN UP FOR A CHANCE TO WIN
                            PRIZES IF WE USE YOUR SELFIES
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
                                style={this.state.firstnameErrorMsg
                                    ? {border: '2px solid #FF4D5B'}
                                    : {border: '2px solid var(--colour-white)'}}
                            />
                        </div>
                        <span className={errorMsg}>
                            {this.state.firstnameErrorMsg && <ErrorIcon />}
                            &nbsp;&nbsp;{this.state.firstnameErrorMsg}
                        </span>

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
                                style={this.state.surnameErrorMsg
                                    ? {border: '2px solid #FF4D5B'}
                                    : {border: '2px solid var(--colour-white)'}}
                            />
                        </div>
                        <span className={errorMsg}>
                            {this.state.surnameErrorMsg && <ErrorIcon />}
                            &nbsp;&nbsp;{this.state.surnameErrorMsg}
                        </span>

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
                                placeholder="email address"
                                autoComplete="off"
                                onChange={(e)=>{

                                    this.handleChange(e);

                                }}
                                onBlur ={this.validateEmail}
                                style={this.state.emailErrorMsg
                                    ? {border: '2px solid #FF4D5B'}
                                    : {border: '2px solid var(--colour-white)'}}
                            />
                        </div>
                        <span className={errorMsg}>
                            {this.state.emailErrorMsg && <ErrorIcon />}
                            &nbsp;&nbsp;{this.state.emailErrorMsg}
                        </span>

                        <div className={inputContainer}>
                            <label
                                className={labelDOB}
                                htmlFor="dob"
                            >
                                Date of birth
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
                                style={this.state.dobErrorMsg
                                    ? {border: '2px solid #FF4D5B'}
                                    : {border: '2px solid var(--colour-white)'}}
                            />
                        </div>
                        <span className={errorMsg}>
                            {this.state.dobErrorMsg && <ErrorIcon />}
                            &nbsp;&nbsp;{this.state.dobErrorMsg}
                        </span>

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
                                <p>I consent to the usage of data in accordance with &nbsp;
                                    <span
                                        className={modalLink}
                                        onClick={this.togglePopup}
                                    >
                                        GDPR
                                    </span>
                                </p>
                            </div>
                        </div>
                        <span className={checkErrorMsg}>
                            {this.state.checkboxErrorMsg && <ErrorIcon />}
                            &nbsp;&nbsp;{this.state.checkboxErrorMsg}
                        </span>

                        <div className={checkboxContainer1}>
                            <label className={consentCheckbox1}>
                                <input
                                    type="checkbox"
                                    checked={this.state.checked1}
                                    onChange={this.handleCheck1}
                                />
                                <span className={inputCheckbox1} />
                            </label>
                            <div className={consentData1}>
                                <p>I consent to the sharing of this picture on &nbsp;
                                    <span
                                        className={modalLink}
                                        onClick={this.togglePopup}
                                    >
                                        social media
                                    </span>
                                    &nbsp;&nbsp;by TOCA Social
                                </p>
                            </div>
                        </div>
                        <span className={checkErrorMsg1}>
                            {this.state.checkboxErrorMsg1 && <ErrorIcon />}
                            &nbsp;&nbsp;{this.state.checkboxErrorMsg1}
                        </span>

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
                        ? (
                            <Popup content={
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

                                </>}handleClose={this.togglePopup}
                            />
                        )
                        : this.state.formCloseConfirmation
                        && (
                            <ActionConfirmModalDialog content={
                                <>
                                    <div className={actionConfirmheading}>
                                        <p>
                                            If you go, your selfie will be deleted,
                                            do you still want to exit?
                                        </p>
                                    </div>
                                    <div className={confirmActionFooter}>
                                        <Link to = {{
                                            pathname:'/'
                                        }}
                                        >
                                            <button
                                                className={confirmActionButton}
                                                type='button'
                                            >
                                                Yes
                                            </button>
                                        </Link>
                                        <button
                                            className={denyActionButton}
                                            type='button'
                                            onClick={this.togglemodalDialog}
                                        >
                                            No
                                        </button>
                                    </div>

                                </>}
                            />
                        )
                }
            </div>
        );

    }

}

