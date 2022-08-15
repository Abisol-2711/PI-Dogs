import React from 'react';
import style from './Pagination.module.css';

function Pagination({dogsPerPage, allDogs, setCurrentPage, minPageNumberLimit, maxPageNumberLimit, currentPage, setMinPageNumberLimit, setMaxPageNumberLimit, pageNumberLimit}){
    const handleClick= (e) => {
        setCurrentPage(parseInt(e.target.id))
    };

    const pages= [];

    for (let i = 1; i <= Math.ceil(allDogs.length / dogsPerPage); i++) {
        pages.push(i);
    }

    const renderPageNumber = pages.map(number => {
        if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
            return(
                <ul className={style.ul} key={number}>
                    <li className={currentPage === number ? `${style.active}` : null} key={number} id={number} onClick={handleClick}>
                    {number}
                    </li>
                </ul>
            )
        } else {
            return null;
        }
    });

    const handlePrevBtn = () => {
        setCurrentPage(currentPage - 1); 
    
        if((currentPage - 1) % pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

   const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);

    if(currentPage + 1 > maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }

   };

    return(
        <div className={style.content}>
            <button className={style.button} onClick={handlePrevBtn} disabled={currentPage === pages[0] ? true : false}>Prev</button>
            {renderPageNumber}
            <button className={style.button} onClick={handleNextBtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
        </div>
    )
}

export default Pagination;