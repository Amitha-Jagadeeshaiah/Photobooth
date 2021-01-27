import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import { ReactComponent as BackButton } from '../../Images/backButton.svg';
import { ReactComponent as DeleteIcon } from '../../Images/delete.svg';
import { ReactComponent as SendIcon } from '../../Images/tick.svg';
import { ReactComponent as GreenPattern } from '../../Images/bg-pattern-01.svg';

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
    keysDisplay,
    mobilekeypadContainer,
    mobileKeypadKeys,
    mobilekeypadKey
} = Styles;

const keypadkeys = [ 1,2,3,4,5,6,7,8,9,'delete',0,'tick' ];

export default class SendText extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            mobileNumber: '',
            data: this.props.location.data || ''
        };

    }

    handleClick = (key) => {

        const { mobileNumber } = this.state;
        const greaterThanZero = mobileNumber.length > 0;
        const lessThanMax = mobileNumber.length <= 10;

        if(key === 'delete') {

            //delete - Back Space
            if(greaterThanZero) {

                //Remove last digit entered
                this.setState({
                    mobileNumber: mobileNumber.slice(0,-1)
                });

            }

        } else {

            //Let the user enter only 11 digits
            if (lessThanMax) {

                this.setState({
                    mobileNumber: `${mobileNumber}${key}`
                });

            }

        }

    }

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
                            <span className={keysDisplay}>{this.state.mobileNumber}</span>
                        </div>
                        <div className={mobileKeypadKeys}>
                            {
                                keypadkeys.map((key) =>{

                                    if(key === 'delete') {

                                        return (
                                            <div
                                                className={mobilekeypadKey}
                                                key={key}
                                                onClick={()=>{this.handleClick(key);}}
                                            >
                                                <DeleteIcon />
                                            </div>
                                        );

                                    }
                                    if(key === 'tick') {

                                        return (
                                            <div className={mobilekeypadKey} key={key} >
                                                <Link to={{
                                                    pathname: '/signUp',
                                                    phone: this.state.mobileNumber,
                                                    data: this.state.data
                                                }}
                                                >
                                                    <SendIcon />
                                                </Link>
                                            </div>

                                        );

                                    }
                                    return (
                                        <div
                                            className={mobilekeypadKey}
                                            key={key}
                                            onClick={()=>{this.handleClick(key);}}
                                        >
                                            {key}
                                        </div>
                                    );

                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

