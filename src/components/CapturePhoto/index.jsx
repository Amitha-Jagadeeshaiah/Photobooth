import React, { createRef } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import whitePattern from '../../Images/pattern-white2.svg';
import lilacPattern from '../../Images/pattern-lilac1.svg';
import tocalogo from '../../Images/tocalogo-lilac.svg';
import cameraIcon from '../../Images/cameraIcon.svg';

const { 
    photoContainer, 
    headerPattern, 
    imageCaptureContainer,
    image,
    imageCapture, 
    timeInSec,
    webcam,
    cameraImage, 
    logo,
    footer,
    photoButton,
    gifButton,
    retakeButton,
    sendTextButton,
    footerPattern
} = Styles;

export default class CapturePhoto extends React.Component {
    constructor(){
        super();
        
        this.state = {
            startTimerClicked : false,
            seconds: 7,
            timerSec: 4,
            imgSrc: null
        }
        this.timer = 0;
        this.webcamRef = createRef();
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds >= 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = ()=>{
        const {seconds, timerSec} = this.state;
        const secondsNext = seconds - 1;
        if (seconds === 0) {
            // No time left, take a picture!
            this.captureImage();
            clearInterval(this.timer);
        } else {
            // Remove one second, set state so a re-render happens.
            this.setState({
                startTimerClicked: true,
                seconds: secondsNext,
                timerSec: timerSec - 1
            });
        }
    }

    captureImage = ()=>{
        const imgSrc = this.webcamRef.current.getScreenshot();
        this.setState({
            imgSrc
        });
    }

    retakePhoto = () => {
        this.timer = 0;
        this.setState ((prevState) =>{
            return {
                startTimerClicked : prevState.startTimerClicked && false,
                seconds: 7,
                timerSec: 4,
                imgSrc: prevState.imgSrc !== null && null
            }
        })
    }

    render(){
        return(
            <div className={photoContainer}>
                <div className={headerPattern} style={{ backgroundImage: `url('${whitePattern} ')` }} />
                <div className={imageCaptureContainer}  onClick = {this.startTimer}>
                    {
                        this.state.imgSrc ? 
                            <img className={image} src={this.state.imgSrc} alt='selfie'/>
                        : this.state.startTimerClicked ? 
                                this.state.seconds > 3 ? 
                                    <span className={timeInSec}>{this.state.timerSec}</span>
                                : (
                                    <Webcam audio={false}
                                    ref={this.webcamRef}
                                    screenshotFormat="image/jpeg"
                                    imageSmoothing='true'
                                    className={webcam}
                                    />
                                )
                            : (
                                <div className={imageCapture}>
                                    <img className={cameraImage} src = {cameraIcon} alt = 'camera' />
                                    <h3>Tap</h3>
                                </div>
                            )
                    }
                    <div className={logo}>
                        <img src={tocalogo} alt='logo'/>
                    </div>
                </div>
                {this.state.imgSrc ?
                    (
                        <div className={footer}>
                            <button className={retakeButton} onClick = {this.retakePhoto}>Retake</button>
                            <Link to={{
                                pathname: '/sendText'
                            }}><button className={sendTextButton}>Send via Text</button></Link>
                        </div>
                    )
                :   
                    (
                        <div className={footer}>
                            <button className={photoButton}>Photo</button>
                            <Link to={{
                                pathname: '/gif'
                            }}><button className={gifButton}>Gif</button></Link>
                        </div>
                    )
                }
                <div className={footerPattern} style={{ backgroundImage: `url('${lilacPattern} ')` }} />
            </div>
        )
    }
}
