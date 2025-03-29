// src/redux/features/order/orderSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStep: 0,
  steps: [
    'packaging-type', 
    'material', 
    'size', 
    'quantity', 
    'designs', 
    'additions', 
    'summary'
  ]
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < state.steps.length - 1) {
        state.currentStep += 1
      }
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1
      }
    },
    setStep: (state, action) => {
      if (action.payload >= 0 && action.payload < state.steps.length) {
        state.currentStep = action.payload
      }
    }
  }
})

export const { nextStep, previousStep, setStep } = orderSlice.actions
export default orderSlice.reducer