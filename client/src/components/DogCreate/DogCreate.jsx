import {React, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { postDogs, getTemperaments } from '../../redux/actions';
import style from './DogCreate.module.css';

function validate(input) {
    let errors = {};

    if(input.name.length === 0) {
        errors.name = 'Name is required.';
    } else if(input.name.length !== 0){
        if(!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name) || input.name.length > 25){
            errors.name = "The first letter must be uppercase and don't start with a number and don´t pass 25 characters.";
        } 
    }


     if(input.img.length !== 0){
        if (input.img && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img) ){
            errors.img = 'It must be a valid "URL" or be empty.';
        } 
    }


    if(input.weight_min.length === 0) {
        errors.weight_min = 'Weight min is required.';
    } else if(input.weight_min.length !== 0){
        if(!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)){
            errors.weight_min = 'You can only put numbers that are different from zero.';
        } 
    }

    if(input.weight_max.length === 0) {
        errors.weight_max = 'Weight max is required.';
    } else if(input.weight_max.length !== 0){
        if(!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max) || 
        parseInt(input.weight_max) <= parseInt(input.weight_min)){
            errors.weight_max = 'You can only put numbers that are different from zero. The maximum value cannot be less than the minimum';
        } 
    }


    if(input.height_min.length === 0) {
        errors.height_min = 'Height min is required.';
    } else if(input.height_min.length !== 0){
        if(!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)){
            errors.height_min = 'You can only put numbers that are different from zero.';
        }
    }

    if(input.height_max.length === 0) {
        errors.height_max = 'Height max is required.';
    } else if(input.height_max.length !== 0){
        if(!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max) || 
        parseInt(input.height_max) <= parseInt(input.weight_min)){
            errors.height_max = 'You can only put numbers that are different from zero. The maximum value cannot be less than the minimum.';
        }
    }


    if(input.life_span_min.length === 0) {
        errors.life_span_min = 'Life span min is required.';
    } else if(input.life_span_min.length !== 0){
        if(!input.life_span_min || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span_min)){
            errors.life_span_min = 'You can only put numbers that are different from zero.';
        } 
    }

    if(input.life_span_max.length === 0) {
        errors.life_span_max = 'Life span max is required.';
    } else if(input.life_span_max.length !== 0){
        if(!input.life_span_max || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span_max) || 
        parseInt(input.life_span_max) <= parseInt(input.life_span_min)){
            errors.life_span_max = 'You can only put numbers that are different from zero. The maximum value cannot be less than the minimum.';
        } 
    }
    return errors;
}

function DogCreate() {
    const dispatch = useDispatch();
    const history = useHistory();

    const temperament = useSelector(state => state.temperaments);

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: '',
        weight_min: '',
        weight_max: '',
        height_min: '',
        height_max: '',
        life_span_min: '',
        life_span_max: '',
        img: '',
        temperament: []
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        if(input.temperament.includes(e.target.value)) {
            alert('Temperament has already been entered');
        }  else if (input.temperament.length === 3) {
            alert("The dog can't have more than three temperaments!");
          } else if (input.temperament.length < 3) {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value] 
            })
          } 
    }

    function handleSubmit(e){
        e.preventDefault();

        if(Object.keys(errors).length !== 0) {
            alert('Not created');        
        } else {
            if (input.temperament.length !== 0) {
                dispatch(postDogs(input));
                alert('Dog created successfully :)');
                setInput({
                    name: '',
                    weight_min: '',
                    weight_max: '',
                    height_min: '',
                    height_max: '',
                    life_span_min: '',
                    life_span_max: '',
                    img: '',
                    temperament: []
                });
                history.push('/home');
                } else {
                    alert('Select temperament');
                }
        }


    }

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(temps => temps !== e)
        })
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch]);

  return (
    <div className={style.container}>
        <Link to={'/home'}>
            <button className={style.button}>Back</button>
        </Link>
        <h1 className={style.title}>Create your dog</h1>
        <form className={style.form} onSubmit={e => handleSubmit(e)}>
            <div className={style.content_input}>
                <label htmlFor='name' className={style.label}>*Name:</label>
                <input type="text" value={input.name} id="name" name="name" placeholder='name' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.name && (
                    <p className={style.error}>{errors.name}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='img' className={style.label}>Image:</label>
                <input type="url" value={input.img} id="img" name="img" placeholder='img' onChange={e => handleChange(e)} className={style.input}/>
                {errors.img && (
                    <p className={style.error}>{errors.img}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='weight_min' className={style.label}>*weight min:</label>
                <input type="number" value={input.weight_min} id="weight_min" name="weight_min" placeholder='weight min' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.weight_min && (
                    <p className={style.error}>{errors.weight_min}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='weight_max' className={style.label}>*weight max:</label>
                <input type="number" value={input.weight_max} id="weight_max" name="weight_max" placeholder='weight max' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.weight_max && (
                    <p className={style.error}>{errors.weight_max}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='height_min' className={style.label}>*height min:</label>
                <input type="number" value={input.height_min} id="height_min" name="height_min" placeholder='height min' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.height_min && (
                    <p className={style.error}>{errors.height_min}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='height_max' className={style.label}>*height max:</label>
                <input type="number" value={input.height_max} id="height_max" name="height_max" placeholder='height max' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.height_max && (
                    <p className={style.error}>{errors.height_max}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='life_span_min' className={style.label}>*life span min:</label>
                <input type="number" value={input.life_span_min} id="life_span_min" name="life_span_min" placeholder='life span min' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.life_span_min && (
                    <p className={style.error}>{errors.life_span_min}</p>
                )}
            </div>
            <div className={style.content_input}>
                <label htmlFor='life_span_max' className={style.label}>*life span max:</label>
                <input type="number" value={input.life_span_max} id="life_span_max" name="life_span_max" placeholder='life span max' required onChange={e => handleChange(e)} className={style.input}/>
                {errors.life_span_max && (
                    <p className={style.error}>{errors.life_span_max}</p>
                )}
            </div> 
            <div className={style.title_input}>
                <p>*Temperaments:</p>
            </div>
            <div className={style.content_input_btn}>
                <select onChange={e => handleSelect(e)} className={style.select}>
                    {temperament.map(temps => {
                        return(
                            <option value={temps.name} key={temps.id}>{temps.name}</option>
                        )
                    })}
                </select>
                {input.temperament.map(temps =>{
                    return(
                        <div className={style.content_temps} key={temps}>
                            <p className={style.temps}>{temps}</p>
                            <button className={style.tooltip} onClick={() => handleDelete(temps)}>
                                <span>🗑️</span>
                                <span className={style.tooltiptext}>remove</span>
                            </button>
                        </div>
                    )
                    })}
                <button type='submit' className={style.button_submit}>Create dog</button>
            </div>
        </form>
    </div>  
  )
}

export default DogCreate