import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import ReactIntlTelInput from 'react-intl-tel-input-v2';
import 'intl-tel-input/build/css/intlTelInput.css';
import { ReactComponent as BackButton } from '../../Images/backButton.svg';
import { ReactComponent as DeleteIcon } from '../../Images/delete.svg';
import { ReactComponent as SendIcon } from '../../Images/tick.svg';
import { ReactComponent as GreenPattern } from '../../Images/bg-pattern-01.svg';
import { ReactComponent as ErrorIcon} from '../../Images/error-icon.svg';
import { mobileNumberErrorMsg } from '../Utilities/errorMsg';

const {
    mobileContainer,
    header,
    previousPage,
    headerPattern,
    dataContainer,
    heading,
    heading1,
    heading2,
    mobileKeypadDisplay,
    mobilekeypadContainer,
    mobileKeypadKeys,
    mobilekeypadKey,
    errorMsg
} = Styles;

const keypadkeys = [ 1,2,3,4,5,6,7,8,9,'delete',0,'tick' ];
const inputProps = {
    placeholder: '7424567345'
};

export default class SendText extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            data: this.props.history.location.data || '',
            value: { iso2: 'gb', dialCode: '44', phone: '' },
            phoneNumberErrorMsg: ''
        };

    }

    handleClick = (key) => {

        this.handlePhoneNumberChange(key);

    }

    handleSend = async (event) => {

        event.preventDefault();
        await this.validatePhoneNumber();
        if(this.state.phoneNumberErrorMsg === '') {

            const phoneNumber = '+' + this.state.value.dialCode + this.state.value.phone;
            const userInfo = {
                phoneNumber: phoneNumber,
                data: this.state.data
            };
            this.props.history.push({
                pathname: '/signUp',
                userInfo
            });

        }

    }

    validatePhoneNumber = () => {

        const phoneNumber = this.state.value.phone;
        const phoneNumberLength = 10;
        if(phoneNumber.length < phoneNumberLength) {

            this.setState ({
                phoneNumberErrorMsg:mobileNumberErrorMsg
            });

        }else {

            this.setState({phoneNumberErrorMsg: ''});

        }

    }

    handlePhoneNumberChange = (data) => {

        if(typeof(data) === 'string' || typeof(data) === 'number') {

            const { phone } = this.state.value;
            const greaterThanZero = phone.length > 0;
            const lessThanMax = phone.length <= 9;

            if(data === 'delete') {

                //delete - Back Space
                if(greaterThanZero) {

                    //Remove last digit entered
                    let info = {
                        iso2: this.state.value.iso2,
                        dialCode: this.state.value.dialCode,
                        phone: phone.slice(0,-1)
                    };
                    this.setState({
                        value: info
                    });

                }

            } else {

                //Let the user enter only 11 digits
                if (lessThanMax) {

                    let info = {
                        iso2: this.state.value.iso2,
                        dialCode: this.state.value.dialCode,
                        phone: `${phone}${data}`
                    };
                    this.setState({
                        value: info
                    });

                }

            }

        } else{

            if(data.dialCode === this.state.value.dialCode) {

                if(data.phone === '') {

                    this.setState({
                        value: data
                    });

                }else {

                    this.setState({
                        value: data
                    });

                }

            }else {

                let info = {
                    iso2: data.iso2,
                    dialCode: data.dialCode,
                    phone: ''
                };
                this.setState({
                    value: info
                });

            }

        }


    };

    render() {

        return(
            <div className={mobileContainer}>
                <div className={header}>
                    <Link to={{ pathname: '/gif' }}>
                        <div className={previousPage}>
                            <BackButton />
                        </div>
                    </Link>
                    <div className={headerPattern}>
                        <GreenPattern />
                    </div>
                </div>
                <div className={dataContainer}>
                    <div className={heading}>
                        <p className={heading1}>Enter your</p>
                        <p className={heading2}>Phone number</p>
                    </div>
                    <div className={mobilekeypadContainer}>
                        <div className={mobileKeypadDisplay} >
                            <ReactIntlTelInput
                                value = {this.state.value}
                                preferredCountries={[ 'gb','us' ]}
                                onChange={this.handlePhoneNumberChange}
                                inputProps={inputProps}
                            />
                        </div>
                        <div className={mobileKeypadKeys}>
                            {
                                keypadkeys.map((key) =>{

                                    if(key === 'delete') {

                                        return (
                                            <div
                                                className={mobilekeypadKey}
                                                key={key}
                                                onClick={()=>{

                                                    this.handleClick(key);

                                                }}
                                            >
                                                <DeleteIcon />
                                            </div>
                                        );

                                    }
                                    if(key === 'tick') {

                                        return (
                                            <div
                                                className={mobilekeypadKey}
                                                key={key}
                                                onClick={this.handleSend}
                                            >
                                                <SendIcon />
                                            </div>

                                        );

                                    }
                                    return (
                                        <div
                                            className={mobilekeypadKey}
                                            key={key}
                                            onClick={()=>{

                                                this.handleClick(key);

                                            }}
                                        >
                                            {key}
                                        </div>
                                    );

                                })
                            }
                        </div>
                    </div>
                    <span className={errorMsg}>
                        {this.state.phoneNumberErrorMsg && <ErrorIcon />}
                        &nbsp;&nbsp;{this.state.phoneNumberErrorMsg}
                    </span>
                </div>
            </div>
        );

    }

}

