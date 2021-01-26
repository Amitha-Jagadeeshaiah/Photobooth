import React, { createRef } from 'react';
import ProgressBar from 'react-customizable-progressbar';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import whitePattern from '../../Images/GIF-header-pattern.svg';
import lilacPattern from '../../Images/pattern-lilac2.svg';
import tocalogo from '../../Images/tocalogo-pink.svg';
import videoImage from '../../Images/gif-icon.svg';
import videoPlayButton from '../../Images/play-button.svg';
import gifshot from 'gifshot';

const {
    gifContainer,
    headerPattern,
    imageCaptureContainer,
    gifImageContainer,
    image,
    playVideo,
    multiImageCapture,
    progressbar,
    videoCapture,
    captureVideoImage,
    logo,
    footer,
    photoButton,
    gifButton,
    retakeButton,
    sendTextButton,
    footerPattern
} = Styles;

export default class CreateGIF extends React.Component {

    constructor(){

        super();
        this.state = {
            startTimerClicked : false,
            seconds: 7,
            timerSec: 4,
            result: 0,
            imgSrc: [],
            gifVideo: ''
        };
        this.timer = 0;
        this.webcamRef = createRef();

    }

    startTimer = () => {

        if (this.timer === 0 && this.state.seconds > 0) {

            this.timer = setInterval(this.countDown, 1000);

        }

    }

    countDown = () => {

        const { seconds, timerSec } = this.state;
        const secondsNext = seconds - 1;

        if(this.state.gifVideo) {

            if(secondsNext > 0) {

                //play gif for few seconds
                this.setState({
                    startTimerClicked: true,
                    seconds: secondsNext
                });

            } else {

                //stop playing gif once timer is stopped
                clearInterval(this.timer);
                this.timer = 0;
                this.setState({
                    startTimerClicked: false,
                    seconds: 7,
                    timerSec: 4,
                    result: 0
                });

            }

        } else {

            if(secondsNext > 4) {

                //let user get ready to click selfies
                this.setState({
                    startTimerClicked: true,
                    seconds: secondsNext
                });

            } else {

                if(secondsNext <= 4 && secondsNext > 0){

                    //take picture every second
                    const result = this.secondsToPercentages(secondsNext, timerSec);
                    this.captureImage(secondsNext, result);

                } else {

                    //once the timer is stopped, the GIF is created
                    clearInterval(this.timer);
                    this.createGIF();

                }

            }

        }

    }

    //calculate timer progress for progress bar
    secondsToPercentages = (secondsNext, timerSec) => {

        const result = 100 - (((secondsNext - 1) * 100) / timerSec);
        if(result > 100) {

            return 100;

        }
        return result;

    }

    captureImage = (secondsNext, result)=>{

        const imageSrc = this.webcamRef.current.getScreenshot();
        this.setState(prevState => ({
            seconds: secondsNext,
            result,
            imgSrc: [ ...prevState.imgSrc , imageSrc ]
        }));

    }

    //create GIF from the clicked images
    createGIF = () => {

        gifshot.createGIF({
            gifWidth: 500,
            gifHeight: 500,
            interval: 0.5,
            images: this.state.imgSrc
        }, (obj) => {

            if (!obj.error) {

                const {image} = obj;
                this.timer = 0;
                this.setState({
                    startTimerClicked: false,
                    gifVideo : image,
                    seconds: 7,
                    timerSec: 4,
                    result: 0
                });

            }

        });

    }

    retakePhoto = () => {

        this.timer = 0;
        this.setState({
            startTimerClicked : false,
            seconds: 7,
            timerSec: 4,
            result: 0,
            gifVideo: '',
            imgSrc: []
        });

    }

    displayHeaderPattern() {

        return !this.state.startTimerClicked && this.state.imgSrc.length === 0
            ? headerPattern
            : null;

    }

    render() {

        return(
            <div className={gifContainer}>
                <div className={this.displayHeaderPattern()}
                    style={{ backgroundImage: `url('${whitePattern} ')` }}
                />
                <div className={imageCaptureContainer}
                    onClick={this.startTimer}
                >
                    {
                        !this.state.gifVideo && (
                            <Webcam audio
                                ref={this.webcamRef}
                                screenshotFormat="image/mjpeg"
                                imageSmoothing='true'
                            />
                        )
                    }
                    {
                        (this.state.startTimerClicked && !this.state.gifVideo)
                            ? (
                                <div className={multiImageCapture}>
                                    { (this.state.seconds < 5) &&
                                    <ProgressBar
                                        progress={this.state.result}
                                        radius={100}
                                        strokeColor={'#FFFFFF'}
                                        strokeWidth={5}
                                        trackStrokeColor={'none'}
                                        className={progressbar}
                                    />
                                    }
                                </div>
                            )
                            : (this.state.startTimerClicked && this.state.gifVideo)
                                ? (
                                    <div className={gifImageContainer}>
                                        <img className={image}
                                            src={this.state.gifVideo}
                                            alt='gif'
                                        />
                                    </div>
                                )
                                : (!this.state.startTimerClicked && this.state.gifVideo)
                                    ? (
                                        <div className={gifImageContainer}>
                                            <img className={image}
                                                src={this.state.imgSrc[0]}
                                                alt='selfie'
                                            />
                                            <img className={playVideo}
                                                src = {videoPlayButton}
                                                alt = 'gif'
                                            />
                                        </div>
                                    )
                                    : (
                                        <div className={videoCapture}>
                                            <img className={captureVideoImage}
                                                src={videoImage}
                                                alt='video'
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
                    !this.state.gifVideo
                        ? (
                            <div className={footer}>
                                <Link to={{
                                    pathname: '/photo'
                                }}
                                >
                                    <button className={photoButton}
                                        type="button"
                                    >
                                        Photo
                                    </button>
                                </Link>
                                <button className={gifButton}
                                    type="button"
                                >
                                    Gif
                                </button>
                            </div>
                        )
                        : (
                            <div className={footer}>
                                <button className={retakeButton}
                                    type="button"
                                    onClick={this.retakePhoto}
                                >
                                    Retake
                                </button>
                                <Link to={{
                                    pathname: '/sendText',
                                    data: this.state.gifVideo
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
                }
                <div className={footerPattern}
                    style={{ backgroundImage: `url('${lilacPattern} ')` }}
                />
            </div>
        );

    }

}

