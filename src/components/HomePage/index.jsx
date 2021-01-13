import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './index.module.css';
import backgroundImage from '../../Images/bg-pattern-01.svg';
import backgroundImage1 from '../../Images/pattern-white1.svg';
import TocaLogo from '../../Images/tocalogo-turquoise.svg';

const {
    homepageContainer,
    headerPattern,
    header,
    footer,
    footerPattern
} = Styles;

const HomePage = () => (
    <div className={homepageContainer}>
        <div className={headerPattern}
            style={{ backgroundImage: `url('${backgroundImage} ')` }}
        />
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
        <div className={footerPattern}
            style={{ backgroundImage: `url('${backgroundImage1} ')` }}
        />
    </div>
);

export default HomePage;

