import React from 'react';
import Styles from './index.module.css';
import { ReactComponent as CloseIcon } from '../../Images/closeIcon.svg';

const {
    popupBox,
    box,
    closeIcon
} = Styles;

const Popup = props => (
    <div className={popupBox}>
        <div
            className={closeIcon}
            onClick={props.handleClose}
        >
            <CloseIcon />
        </div>
        <div className={box}>
            {props.content}
        </div>
    </div>
);

export default Popup;

