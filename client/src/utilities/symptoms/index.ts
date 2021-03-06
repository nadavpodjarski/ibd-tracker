import moment from 'moment'
import { red, orange, yellow } from '@material-ui/core/colors'
import { Symptom, SymptomsScale } from '../../types/symptoms'

export const makeNewSymptom = (): Symptom => {
   return {
      date: moment().toDate(),
      duration: '',
      description: '',
      scale: SymptomsScale['Mild'],
      name: ''
   }
}

export const isValidSymptom = (symptom: Symptom) => {
   const error = {
      symptom: !!symptom.name,
      date: symptom.date
   }

   if (!error.symptom || !error.date) return ''
   else return 'ok'
}

export const symptomScale = [
   { const: 'Mild', value: 1, color: yellow[500] },
   { const: 'Moderate', value: 2, color: yellow[700] },
   { const: 'High', value: 3, color: yellow[900] },
   { const: 'Severe', value: 4, color: orange[900] },
   { const: 'Disabling', value: 5, color: red[900] }
]
