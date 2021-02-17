import React from 'react';
import Styles from './index.module.css';
import { ReactComponent as MobileIcon} from '../../Images/mobileIcon.svg';

const {
    imageContainer,
    dataContainer,
    headerContainer,
    header1,
    header2,
    mobileImageContainer,
    controlButtonContainer,
    takeAnotherPhoto,
    btn
} = Styles;

export default class ImageSent extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            timerseconds: 10
        };
        this.timer = 0;

    }

    startTimer = () => {

        if (this.timer === 0 && this.state.timerseconds > 0) {

            this.timer = setInterval(this.countDown, 1000);

        }

    }

    countDown = async () => {

        const { timerseconds } = this.state;
        const secondsNext = timerseconds - 1;

        if (timerseconds === 0) {

            // No time left, take back to home page!
            await this.componentWillUnmount();
            this.props.history.push('/');

        } else {

            // Remove one second, set state so a re-render happens.
            this.setState({
                timerseconds: secondsNext
            });

        }

    }

    handleClick = async () => {

        await this.componentWillUnmount();
        this.props.history.push('/photo');

    }

    componentDidMount() {

        this.startTimer();

    }

    componentWillUnmount() {

        if (this.timer) {

            clearTimeout(this.timer);
            this.timer = 0;

        }

    }

    render(){

        return(
            <div className={imageContainer}>
                <div className={dataContainer}>
                    <div className={headerContainer}>
                        <p className={header1}>Sent</p>
                        <p className={header2}>
                            The picture has been sent to your mobile
                        </p>
                    </div>
                    <div className={mobileImageContainer}>
                        <MobileIcon />
                    </div>
                    <div className={controlButtonContainer} onClick={this.handleClick}>
                        <button className={takeAnotherPhoto} type="button">
                            <span className={btn}>Take Another</span>
                        </button>
                    </div>
                </div>
            </div>
        );

    }

}

