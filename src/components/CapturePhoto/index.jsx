import React, { createRef } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import whitePattern from '../../Images/pattern-white2.svg';
import tocalogo from '../../Images/tocalogo-lilac.svg';
import cameraIcon from '../../Images/cameraIcon.svg';


const {
    photoContainer,
    headerPattern,
    imageCaptureContainer,
    image,
    imageCapture,
    timeInSec,
    cameraImage,
    logo,
    footer,
    photoButton,
    gifButton,
    retakeButton,
    sendTextButton
} = Styles;

const videoConstraints = {
    facingMode: 'user'
};

export default class CapturePhoto extends React.Component {

    constructor() {

        super();

        this.state = {
            startTimerClicked: false,
            seconds: 4,
            imgSrc: null
        };
        this.timer = 0;
        this.webcamRef = createRef();

    }

    startTimer = () => {

        if (this.timer === 0 && this.state.seconds >= 0) {

            this.timer = setInterval(this.countDown, 1000);

        }

    }

    countDown = () => {

        const { seconds } = this.state;
        const secondsNext = seconds - 1;
        if (seconds === 0) {

            // No time left, take a picture!
            this.captureImage();
            clearInterval(this.timer);

        } else {

            // Remove one second, set state so a re-render happens.
            this.setState({
                startTimerClicked: true,
                seconds: secondsNext
            });

        }

    }

    captureImage = () => {

        const imgSrc = this.webcamRef.current.getScreenshot();
        this.setState({
            imgSrc
        });

    }

    retakePhoto = () => {

        this.timer = 0;
        this.setState({
            startTimerClicked: false,
            seconds: 4,
            imgSrc: null
        });

    }

    render() {

        return (
            <div className={photoContainer} >
                <div className={ !this.state.startTimerClicked ? headerPattern : ''}
                    style={{ backgroundImage: `url('${whitePattern}')`}}
                />
                <div className={imageCaptureContainer}
                    onClick={this.startTimer}
                >
                    {
                        !this.state.imgSrc && (
                            <Webcam
                                audio={false}
                                ref={this.webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={videoConstraints}
                            />
                        )
                    }
                    {
                        this.state.imgSrc
                            ? <img className={image} src={this.state.imgSrc} alt='selfie' />
                            : this.state.startTimerClicked
                                ? this.state.seconds > 0
                                    && (
                                        <span className={timeInSec}>
                                            {this.state.seconds}</span>
                                    )
                                : (
                                    <div className={imageCapture}>
                                        <img className={cameraImage}
                                            src={cameraIcon}
                                            alt='camera'
                                        />
                                        <h3>Tap</h3>
                                    </div>
                                )
                    }
                    <div className={logo}>
                        <img src={tocalogo} alt='logo' />
                    </div>
                </div>
                {
                    this.state.imgSrc
                        ? (
                            <div className={footer}>
                                <button className={retakeButton}
                                    onClick={this.retakePhoto}
                                    type="button"
                                >
                                    Retake
                                </button>
                                <Link to={{
                                    pathname: '/sendText',
                                    data: this.state.imgSrc
                                }}
                                >
                                    <button className={sendTextButton}
                                        type="button"
                                    >
                                        Send via Text
                                    </button>
                                </Link>
                            </div>
                        )
                        : (
                            <div className={footer}>
                                <button className={photoButton}
                                    type="button"
                                >
                                    Photo
                                </button>
                                <Link to={{
                                    pathname: '/gif'
                                }}
                                >
                                    <button className={gifButton}
                                        type="button"
                                    >
                                        Gif
                                    </button>
                                </Link>
                            </div>
                        )
                }
                {/* <div className={footerPattern}
                    // style={{ backgroundImage: `url('${lilacPattern} ')` }}
                /> */}
            </div>
        );

    }

}
