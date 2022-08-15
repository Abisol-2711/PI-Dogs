const { Router } = require('express');
const { getAllDogs } = require('../Controllers/DogController');
const {Dog, Temperament} = require("../db.js");

const router = Router();

router.get('/', async(req, res, next) => {
    try {
        const {name} = req.query;
        const allDogs = await getAllDogs();

        if (name) {
            const dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

            dogName.length ?
            res.status(200).send(dogName) :
            res.status(404).send('Breed not found :(');
        } else { 
            res.send(allDogs);
        }
    } catch (error) {
        next(error);
    }
})
  

router.post('/', async(req, res, next) => {
  try {
    const {name,height_min,height_max,weight_min,weight_max,life_span_min,life_span_max,temperament,img,createId} = req.body; 

    if(!name || !height_min || !height_max || !weight_min || !weight_max) {
        res.status(400).send('Faltan datos');
    }

    const dogCreated = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span_min,
        life_span_max,
        img,
        createId
    }); 

    const temperamentDb = await Temperament.findAll({
        where: {name: temperament}
    });


    dogCreated.addTemperament(temperamentDb);

    res.send('Dog created successfully :)')
  } catch (error) {
    next(error);
  }  
})


router.get('/:id', async(req, res, next) => {
  try {
    const {id} = req.params;
    const allDogs = await getAllDogs();
 
    if (id) {     
        let dogId = await allDogs.filter(dog => dog.id == id); 
 
        if (dogId.length) { 
            res.json(dogId);
        } else {
            res.status(404).send('Not found :(');
        }
    }
  } catch (error) {
    next(error);
  }  
})

module.exports = router;