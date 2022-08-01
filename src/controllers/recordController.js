const recordService = require('../services/recordService')
const workoutService = require('../services/workoutService')

const getAllRecords = (req, res) => {
  try {
    const allRecords = recordService.getAllRecords()
    res.send({ status: 'OK', data: allRecords })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneRecord = (req, res) => {
  const { recordId } = req.params

  if (!recordId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':recordId' cannot be empty" },
    })
  }

  try {
    const record = recordService.getOneRecord(recordId)
    res.status(200).send({ status: 'OK', data: record })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewRecord = (req, res) => {
  const { workout, record } = req.body

  if (!workout || !record) {
    return res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'workout' or 'record'",
      },
    })
  }

  try {
    workoutService.getOneWorkout(workout)
  } catch (error) {
    return res.status(422).send({
      status: 'FAILED',
      data: {
        error: "The 'workout' in record does't exists on Workouts",
      },
    })
  }

  const newRecord = {
    workout,
    record,
  }

  try {
    const createdRecord = recordService.createNewRecord(newRecord)
    res.status(201).send({ status: 'OK', data: createdRecord })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneRecord = (req, res) => {
  const { recordId } = req.params
  const { record } = req.body

  if (!recordId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: 'Parameter :recordId cannot be empty' },
    })
  }

  if (!record) {
    return res.status(400).send({
      status: 'FAILED',
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'record'",
      },
    })
  }

  try {
    const updatedRecord = recordService.updateOneRecord(recordId, record)
    res.status(200).send({ status: 'OK', data: updatedRecord })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneRecord = (req, res) => {
  const { recordId } = req.params

  if (!recordId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':recordId' cannot be empty" },
    })
  }

  try {
    recordService.deleteOneRecord(recordId)
    res.status(200).send({ status: 'OK', data: 'Delete successfuly' })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getRecordForWorkout = (req, res) => {
  const { workoutId } = req.params

  if (!workoutId) {
    return res.status(400).send({
      status: 'FAILED',
      data: { error: "Parameter ':workoutId' cannot be empty" },
    })
  }

  try {
    const records = recordService.getRecordForWorkout(workoutId)
    res.status(200).send({ status: 'OK', data: records })
  } catch (error) {
    res
      .status(error?.status || 5000)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllRecords,
  getOneRecord,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
  getRecordForWorkout,
}
