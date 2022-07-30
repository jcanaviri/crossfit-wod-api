const DB = require('./db.json')

const { saveToDataBase } = require('./utils')

const getAllRecords = () => {
  try {
    return DB.records
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const getOneRecord = (recordId) => {
  try {
    const record = DB.records.find((record) => record.id === recordId)
    if (!record)
      throw {
        status: 400,
        message: `Can't find record with the id: ${recordId}`,
      }

    return record
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

// TODO: Make create, update and delete endpoints.
const createNewRecord = (newRecord) => {
  try {
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const updateOneRecord = (recordId) => {
  try {
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const deleteOneRecord = (recordId) => {
  try {
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId)

    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      }
    }

    return record
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

module.exports = { getAllRecords, getOneRecord, getRecordForWorkout }
