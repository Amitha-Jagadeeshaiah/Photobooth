import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import TocaLogo from '../../Images/tocalogo-turquoise.svg';

const {
    homepageContainer,
    header,
    footer
} = Styles;

const HomePage = () => (
    <div className={homepageContainer}>
        <Link to = {{
            pathname: '/photo'
        }}
        >
            <div className={header}>
                <h2>Tap to</h2>
                <h1>Start</h1>
            </div>
        </Link>
        <div className={footer}>
            <img src = {TocaLogo} alt="logo" />
        </div>
    </div>
);

export default HomePage;

