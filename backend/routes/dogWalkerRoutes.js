const express = require('express');
const router = express.Router();
const DogWalker = require('../models/DogWalker');

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDogWalker = await DogWalker.findByIdAndDelete(id);
    if (!deletedDogWalker) {
      return res.status(404).send({ error: 'Dog walker not found' });
    }
    res.status(200).send(deletedDogWalker);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  const { name, experience, available } = req.body;
  try {
    const dogWalker = new DogWalker({ name, experience, available });
    await dogWalker.save();
    res.status(201).send(dogWalker);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const dogWalkers = await DogWalker.find();
    res.status(200).send(dogWalkers);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
