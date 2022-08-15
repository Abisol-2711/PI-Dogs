import React from 'react';
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={style.div}>
            <h1 className={style.h1}>Welcome to Dogs Page</h1>
            <Link to = '/home'>
                <button className={style.button}>Go 🐾</button>
            </Link>
        </div>
    )
}