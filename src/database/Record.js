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

const createNewRecord = (newRecord) => {
  try {
    const isAlreadyAdded =
      DB.records.findIndex((record) => record.workout === newRecord.workout) >
      -1

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `The workout: '${newRecord.workout}' already has a record`,
      }
    }

    DB.records.push(newRecord)
    saveToDataBase(DB)
    return newRecord
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const updateOneRecord = (recordId, newRecord) => {
  try {
    const indexForUpdate = DB.records.findIndex(
      (record) => record.id === recordId
    )

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find the record with the id: ${recordId}`
      }
    }

    const updatedRecord = {
      ...DB.records[indexForUpdate],
      record: newRecord
    }

    DB.records[indexForUpdate] = updatedRecord
    saveToDataBase(DB)
    return updatedRecord
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const deleteOneRecord = (recordId) => {
  try {
    const indexForDelete = DB.records.findIndex(
      (record) => record.id === recordId
    )

    if (indexForDelete === -1) {
      throw {
        status: 400,
        message: `Can't find the record with the id: ${recordId}`,
      }
    }

    DB.records.splice(indexForDelete, 1)
    saveToDataBase(DB)
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

module.exports = {
  getAllRecords,
  getOneRecord,
  getRecordForWorkout,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
}
