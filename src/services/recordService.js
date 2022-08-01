const Record = require('../database/Record')

const { v4: uuid } = require('uuid')

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

const createNewRecord = (newRecord) => {
  const recordToInsert = {
    id: uuid(),
    ...newRecord,
  }

  try {
    const createdRecord = Record.createNewRecord(recordToInsert)
    return createdRecord
  } catch (error) {
    throw error
  }
}

const updateOneRecord = (recordId, newRecord) => {
  try {
    const updatedRecord = Record.updateOneRecord(recordId, newRecord)
    return updatedRecord
  } catch (error) {
    throw error
  }
}

const deleteOneRecord = (recordId) => {
  try {
    Record.deleteOneRecord(recordId)
    return
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllRecords,
  getOneRecord,
  getRecordForWorkout,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
}
