import { React, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index";
import Default_photo from "../../img/default_photo.jpg";
import style from "./Detail.module.css";
import Loading from "./Loading";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const dog = useSelector((state) => state.detail);

  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading ? (
        <Loading setLoading={setLoading} />
      ) : (
            <div className={style.contiener}>
              <Link to={"/home"}>
                <button className={style.button}>Back</button>
              </Link>
              <div className={style.card}>
                <h2 className={style.name}>{dog.name}</h2>
                <img
                  className={style.img}
                  src={dog.img ? dog.img : Default_photo}
                  alt="Dog"
                  width="200px"
                  height="250px"
                />
                <p className={style.p}>Temperaments:{" "}{dog.temperament}</p>
                <p className={style.p}>weigth min: {dog.weight_min} cm</p>
                <p className={style.p}>weigth max: {dog.weight_max} cm</p>
                <p className={style.p}>height min: {dog.height_min} kg</p>
                <p className={style.p}>height max: {dog.height_max} kg</p>
                <p className={style.p}>
                  life span: {dog.life_span_min} and {dog.life_span_max}
                </p>
              </div>
            </div>
      )}
    </div>
  );
}

export default Detail;
