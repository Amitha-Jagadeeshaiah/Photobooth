import React from 'react';
import Styles from './index.module.css';

const {
    formCloseConfirmationPopup,
    popupWindow
} = Styles;

const ActionConfirmModalDialog = props => (
    <div className={formCloseConfirmationPopup}>
        <div className={popupWindow}>
            {props.content}
        </div>
    </div>
);

export default ActionConfirmModalDialog;

