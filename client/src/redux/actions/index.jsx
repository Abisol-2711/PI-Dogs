import axios from 'axios';

export function getAllDogs(){
    return async function(dispatch){
        let json = await axios("/dogs");
        return dispatch({
            type: 'GET_ALL_DOGS',
            payload: json.data
        })
    }
}

export function getDetail(payload){
    return async function(dispatch){
        try {
            let json = await axios(`/dogs/${payload}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data[0]
            })
        } catch (error) {
           console.log(error);
        }
    }
}

export function getNameDogs(payload){
    return async function(dispatch){
        try {
            let json = await axios(`/dogs?name=${payload}`);
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
           alert('Not found dog :(');
        }
    }
}

export function getTemperaments(){
    return async function (dispatch){
        let temperament = await axios('/temperaments');
        return dispatch ({
            type: "GET_TEMPERAMENTS", 
            payload: temperament.data
        });
    }
}

export function postDogs(payload){
    return async function (){
        let response = await axios.post('/dogs', payload);
        return response;
    }
}

export function orderByAZ(payload){
    return{
        type: 'ORDER_BY_A_Z',
        payload
    }
}

export function orderByWeight(payload){
    return{
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function filterTemperament(payload){
    return {
        type: "FILTER_TEMPERAMENT",
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}



