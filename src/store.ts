import { configureStore } from '@reduxjs/toolkit';
import { tableReducer} from './features/Tables/tableSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


const store = configureStore({
  reducer: {
    tableReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type RootState = ReturnType<typeof store.getState>;

export default store;