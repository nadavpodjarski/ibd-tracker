import { Dispatch } from 'react'

import { Symptom } from '../../../types/symptoms'
import { ParsedDateRange } from '../../../types'
import { DateRange } from '@material-ui/pickers/DateRangePicker/RangeTypes'

import * as types from '../constants'
import * as api from '../../../api/symptoms'
import * as uiActions from '../../ui/actions'

// GET SYMPTOMS
const createGetSymptoms = () => {
   return {
      type: types.GET_SYMPTOMS
   }
}

const getSymptomsSuccess = (data: any) => {
   return {
      type: types.GET_SYMPTOMS_SUCCESS,
      payload: data
   }
}

export const fetchSymptoms = (dateRange: ParsedDateRange) => async (
   dispatch: Dispatch<any>
) => {
   if (!dateRange.startAt || !dateRange.endAt) return

   try {
      dispatch(createGetSymptoms())
      const res = await api.getSymptoms(dateRange.startAt, dateRange.endAt)
      dispatch(getSymptomsSuccess(res))
   } catch (err) {
      dispatch(requestErr(err.message))
   }
}

// ADD SYMPTOM
const createAddSymptom = () => {
   return {
      type: types.ADD_SYMPTOM
   }
}

const addSymptomSuccess = (data: any) => (dispatch: Dispatch<any>) => {
   dispatch(uiActions.setSnackBar({ type: 'success', msg: data.message }))
   dispatch({
      type: types.ADD_SYMPTOM_SUCCESS,
      payload: data.symptom
   })
}

export const addSymptom = (symptom: Symptom) => async (
   dispatch: Dispatch<any>,
   getStore: any
) => {
   const { dateRange } = getStore().symptoms

   dispatch(createAddSymptom)
   try {
      const res = await api.postSymptom(symptom)
      dispatch(addSymptomSuccess(res))
   } catch (err) {
      dispatch(requestErr(err.message))
   }
}

// DELETE SYMPTOM
const createDeleteSymptom = () => {
   return {
      type: types.DELETE_SYMPTOM
   }
}

const deleteSymptomSuccess = (data: any) => (dispatch: Dispatch<any>) => {
   dispatch({
      type: types.DELETE_SYMPTOM_SUCCESS,
      payload: data.docId
   })
   dispatch(uiActions.setSnackBar({ type: 'info', msg: data.message }))
}

export const deleteSymptom = (docId: string) => async (
   dispatch: Dispatch<any>
) => {
   dispatch(createDeleteSymptom())
   try {
      const res = await api.deleteSymptom(docId)
      dispatch(deleteSymptomSuccess(res))
   } catch (err) {
      dispatch(requestErr(err.message))
   }
}

// EDIT SYMPTOM
const createEditSymptom = () => {
   return {
      type: types.EDIT_SYMPTOM
   }
}

const editSymptomSuccess = (data: any) => (dispatch: Dispatch<any>) => {
   dispatch({
      type: types.EDIT_SYMPTOM_SUCCESS,
      payload: { docId: data.docId, symptom: data.symptom }
   })
   dispatch(uiActions.setSnackBar({ type: 'success', msg: data.message }))
}

export const editSymptom = (symptom: Symptom, docId: string) => async (
   dispatch: Dispatch<any>
) => {
   try {
      dispatch(createEditSymptom())
      const res = await api.putSymptom(symptom, docId)
      dispatch(editSymptomSuccess(res))
   } catch (err) {
      dispatch(requestErr(err.message))
   }
}

// SET DATE RANGE
export const setSymptomsDateRange = (dateRange: DateRange) => (
   dispatch: Dispatch<any>
) => {
   dispatch({
      type: types.SET_SYMPTOMS_DATE_RANGE,
      payload: dateRange
   })
}

export const cleanSymptomsState = () => {
   return {
      type: types.CLEAN_SYMPTOMS_STAET
   }
}

// ERROR HANDLER
const requestErr = (errMessage: any) => (dispatch: Dispatch<any>) => {
   if (typeof errMessage === 'string')
      dispatch(uiActions.setSnackBar({ type: 'error', msg: errMessage }))

   dispatch({
      type: types.REQUEST_ERR,
      payload: errMessage
   })
}
