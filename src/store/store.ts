import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import allComopanySlice from 'src/slice/allComopanySlice'
import allEmployeeSlice from 'src/slice/allEmployeeSlice'
import faqSlice from 'src/slice/faqSlice'
import jobCategorySlice from 'src/slice/jobCategorySlice'
import masterDegreeSlice from 'src/slice/masterDegreeSlice'
import privacySlice from 'src/slice/privacySlice'
import roleSlice from 'src/slice/roleSlice'
import skillSlice from 'src/slice/skillSlice'
import tokenSlice from 'src/slice/tokenSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      role: roleSlice,
      skill: skillSlice,
      masterDegree: masterDegreeSlice,
      jobCategory: jobCategorySlice,
      company: allComopanySlice,
      employee: allEmployeeSlice,
      token: tokenSlice,
      privacyPolicy: privacySlice,
      faqdata: faqSlice
    },
    devTools: true
  })

export const store = makeStore()
export type RootStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export const wrapper = createWrapper<RootStore>(makeStore)
