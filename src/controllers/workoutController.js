const workoutService = require('../services/workoutService')

const getAllWorkouts = (req, res) => {
  const { mode } = req.query
  try {
    const allWorkouts = workoutService.getAllWorkouts({ mode })
    res.send({ status: 'OK', data: allWorkouts })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneWorkout = (req, res) => {
  const { workoutId } = req.params

  if (!workoutId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' cannot be empty" },
    })
  }

  try {
    const workout = workoutService.getOneWorkout(workoutId)
    res.status(200).send({ status: 'OK', data: workout })
  } catch (error) {
    res
      .status(error?.status || 5000)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewWorkout = (req, res) => {
  const { name, mode, equipment, exercises, trainerTips } = req.body

  if (!name || !mode || !equipment || !exercises || !trainerTips) {
    return res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'excercises', 'trainerTips'",
      },
    })
  }

  const newWorkout = {
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  }

  try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout)
    res.status(201).send({ status: 'OK', data: createdWorkout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneWorkout = (req, res) => {
  const { workoutId } = req.params
  const { name, mode, equipment, exercises, trainerTips } = req.body

  if (!workoutId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' cannot be empty" },
    })
  }

  const changes = {}

  if (name) changes.name = name
  if (mode) changes.mode = mode
  if (equipment) changes.equipment = equipment
  if (exercises) changes.exercises = exercises
  if (trainerTips) changes.trainerTips = trainerTips

  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, changes)
    res.status(200).send({ status: 'OK', data: updatedWorkout })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneWorkout = (req, res) => {
  const { workoutId } = req.params

  if (!workoutId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' cannot be empty" },
    })
  }

  try {
    workoutService.deleteOneWorkout(workoutId)
    res.status(200).send({ status: 'OK', data: 'Delete successfuly' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
}
