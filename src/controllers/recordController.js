const recordService = require('../services/recordService')

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
  res.send('create a new record')
}
const updateOneRecord = (req, res) => {
  res.send('update one record')
}
const deleteOneRecord = (req, res) => {
  res.send('delete record')
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
