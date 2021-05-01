const router  = require('express').Router();
const Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.statusCode(400).json('Error:' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise is added!'))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').get((req, res) => {
    const exerciseId = req.params.id;

    Exercise.findById(exerciseId)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req, res) => {
    const exerciseId = req.params.id;

    Exercise.findByIdAndDelete(exerciseId)
        .then(() => res.json(`Exercise: ${exerciseId} is deleted!`))
        .catch(err => res.status(400).json('Error:' + err));
});

router.route('/update/:id').post((req, res) => {
    const exerciseId = req.params.id;

    Exercise.findById(exerciseId)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error:' + err));
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;