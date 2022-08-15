import {React, useState} from 'react';
import {useDispatch} from 'react-redux';
import { getNameDogs } from '../../redux/actions';
import style from './SearchBar.module.css';

function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch();
    const [name, setName]= useState('');
    
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!name) {
            alert('Please, write a name')
        } else {
            dispatch(getNameDogs(name)); 
            setName(''); 
            setCurrentPage(1);
        }
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <input className={style.input} type="text" placeholder='search dog...' value={name} onChange={(e) => handleInputChange(e)}/>
            <button className={style.button} type='submit' >Find</button>
        </form>
    )
}

export default SearchBar;