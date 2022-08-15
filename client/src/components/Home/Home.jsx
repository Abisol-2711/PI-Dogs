import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterCreated, orderByAZ, orderByWeight, getTemperaments, filterTemperament} from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Default_photo from "../../img/default_photo.jpg";
import style from "./Home.module.css";
import Loading from "./Loading";

function Home() {
  const dispatch = useDispatch();   
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments); 
  const [orden, setOrden] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFistDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFistDog, indexOfLastDog);
  const pageNumberLimit = 5;
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllDogs());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByAZ(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  function handleFilterByTemperament(e) {
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      {loading ? (
        <Loading setLoading={setLoading}/>
      ) : (
        <div className={style.container}>
            <div className={style.container_buttons_ser}>
              <Link to="/">
                <button className={style.button}>Back</button>
              </Link>
              <SearchBar setCurrentPage={setCurrentPage}/>
              <Link to="/dogs">
                <button className={style.button}>Create Dog</button>
              </Link>
            </div>
            <h1 className={style.h1}>Dogs Page</h1>
            <button className={style.button_all_dogs} onClick={(e) => { handleClick(e);}}>
              Reload all dogs
            </button> 
            <div>
              <select className={style.select} onChange={(e) => handleSort(e)} defaultValue= 'OrderBy'>
                <option value="OrderBy" disabled>Alphabetical order</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
              <select className={style.select} onChange={(e) => handleSortWeight(e)} defaultValue= 'OrderBy'>
                <option value="OrderBy" disabled>Order by weight</option>
                <option value="Lighter">Lighter</option>
                <option value="Heavier">Heavier</option>
              </select>
              <select className={style.select} onChange={(e) => handleFilterByTemperament(e)} defaultValue= 'OrderBy'>
                <option value="OrderBy" disabled>Order by temperament</option>
                <option value="all">All</option>
                {allTemperaments.map((temp) => (
                  <option key={temp.id} value={temp.name}>
                    {temp.name}
                  </option>
                ))}
              </select>
              <select className={style.select} onChange={(e) => handleFilterCreated(e)} defaultValue= 'OrderBy'>
                <option value="OrderBy" disabled>Order by create</option>
                <option value="all">All</option>
                <option value="created">Created</option>
                <option value="api">Api</option>
              </select>
              <Pagination
                dogsPerPage={dogsPerPage}
                allDogs={allDogs}
                setCurrentPage={setCurrentPage}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                currentPage={currentPage}
                setMinPageNumberLimit={setMinPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                pageNumberLimit={pageNumberLimit}
              />
                <div className={style.content_cards}>
                  {currentDogs.map((dog) => {
                    return (
                      <div key={dog.id}>
                        <Link to={`/home/${dog.id}`} className={style.link}>
                          <Card
                            name={dog.name}
                            img={dog.img ? dog.img : Default_photo}
                            temperament={dog.temperament}
                            weight_min={dog.weight_min}
                            weight_max={dog.weight_max}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              <Pagination
                dogsPerPage={dogsPerPage}
                allDogs={allDogs}
                setCurrentPage={setCurrentPage}
                minPageNumberLimit={minPageNumberLimit}
                maxPageNumberLimit={maxPageNumberLimit}
                currentPage={currentPage}
                setMinPageNumberLimit={setMinPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                pageNumberLimit={pageNumberLimit}
              />
            </div>
            <footer className={style.footer}>
              <p className={style.p}>Abisol-2711</p>
            </footer>
          </div>
      )}
    </div>
  );
}

export default Home;