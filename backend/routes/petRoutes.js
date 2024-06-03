const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

router.post('/', async (req, res) => {
  const { name, age, ageUnit, breed } = req.body;
  try {
    const pet = new Pet({ name, age, ageUnit, breed });
    await pet.save();
    res.status(201).send(pet);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).send(pets);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).send({ error: 'Pet not found' });
    }
    res.status(200).send(pet);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
