import React from "react";
import style from './Loading.module.css'
import dog_load_detail  from '../../img/dog_load_detail.gif';

export default function Loading({ setLoading }){
        setTimeout(() =>{
            setLoading(false)
        }, 2000)
    return(
        <div className={style.content}>
            <div className={style.content_load}>
                <span>L</span>
                <span>O</span>
                <span>A</span>
                <span>D</span>
                <span>I</span>
                <span>N</span>
                <span>G</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
            <div className={style.content_img}>
                <img src={dog_load_detail} alt="Dog with welcome" height='90px'/>
            </div>
        </div>
    )
}