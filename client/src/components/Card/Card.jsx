import React from "react";
import style from './Card.module.css';
 

function Card({img, name, temperament, weight_min, weight_max}){
    return(
    <div className={style.card}>  
        <h3 className={style.name}>Name: {name}</h3>
        <img className={style.img} src={img} alt="img" width="200px" height="250px"/>
        <h4 className={style.temp}>Temperaments: {temperament}</h4>
        <h4 className={style.weigth}>weigth min: {weight_min} kg</h4>
        <h4 className={style.weigth}>weigth max: {weight_max} kg</h4>
    </div>
    );
}

export default Card;