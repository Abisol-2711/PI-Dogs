const {Dog, Temperament} = require("../db.js");
const {API_Key} = process.env;
const axios = require("axios"); 

async function getApiBreeds() {
    try { 
        const getApiUrl = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_Key}`);
        const getApiInfo = getApiUrl.data.map(dog =>({
            id: dog.id,
            name: dog.name,
            img: dog.image.url,
            height_min: dog.height.metric.split('-')[0],
            height_max: dog.height.metric.split('-')[1],
            weight_min: dog.weight.metric.split(' - ')[0] !== 'NaN' ? dog.weight.metric.split('-')[0] : 0,
            weight_max: dog.weight.metric.split('-')[1],
            life_span_min: dog.life_span.split('-')[0],
            life_span_max: dog.life_span.split('-')[1],
            temperament:dog.temperament ? dog.temperament : 'Unknown'
        }));
        return getApiInfo;
    } catch (error) {
        console.log(error);
    }
}

async function getDBInfo() {
    try {
        const dbDog = await Dog.findAll({
            include:{
                model: Temperament,
                as: 'temperament',
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });

        const info = dbDog.map(dog => {
            let temp = dog.temperament.map(e => e.name);
            let aux = temp.join(',');

            return{
                createId: dog.createId,
                id: dog.id,
                name: dog.name,
                img: dog.img,       
                height_min: dog.height_min,        
                height_max: dog.height_max,
                weight_min: dog.weight_min,
                weight_max: dog.weight_max,
                life_span_min: dog.life_span_max,
                life_span_max: dog.life_span_max,
                temperament: aux
            }
        });

        return info;
    } catch (error) {
        console.log(error);
    }
} 

async function getAllDogs() {
    try {
        const apiInfo = await getApiBreeds();
        const dbInfo = await getDBInfo();
        const allInfo = apiInfo.concat(dbInfo);
        return allInfo;
    } catch (error) { 
        console.log(error);
    }
}

module.exports = {
    getApiBreeds,
    getDBInfo,
    getAllDogs
}