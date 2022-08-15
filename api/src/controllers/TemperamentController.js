const {Temperament} = require("../db.js");
const {API_Key} = process.env;
const axios = require("axios"); 

async function getApiTemperament(req, res, next) {
    try { 
        const getApiUrl = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_Key}`);
        const getApiInfo = getApiUrl.data.map(dog =>(dog.temperament));
        const unifyTemperament = getApiInfo.join(',').split(',');
        const filterTemperaments = unifyTemperament.filter((temperament) => temperament);
        const deleteDuplicateTemperament =  [...new Set(filterTemperaments)];

        deleteDuplicateTemperament.forEach(temperament => { 
            Temperament.findOrCreate({
                where: {name: temperament} 
            })
        });

        const allTemperaments = await Temperament.findAll();
            
        res.send(allTemperaments);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getApiTemperament
}