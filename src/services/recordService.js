const Record = require('../database/Record')

const getAllRecords = () => {
  try {
    const allRecords = Record.getAllRecords()
    return allRecords
  } catch (error) {
    throw error
  }
}

const getOneRecord = (recordId) => {
  try {
    const record = Record.getOneRecord(recordId)
    return record
  } catch (error) {
    throw error
  }
}

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId)
    return record
  } catch (error) {
    throw error
  }
}

module.exports = { getAllRecords, getOneRecord, getRecordForWorkout }
