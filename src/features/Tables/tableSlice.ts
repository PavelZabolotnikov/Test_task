import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DataType } from './Type/type'
import * as api from './api';
import type { RootState } from '../../store'
import { v4 as uuidv4 } from 'uuid';

interface State {
    data: DataType[]
    isLoading: boolean
  }

const initialState: State = {
    data: [],
    isLoading: false,
  }

  export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
    try {
    const productsOne = await api.loadProducts1();
    const productsTwo = await api.loadProducts2(); 
    const allProducts = productsOne.concat(productsTwo)
    return allProducts;
} catch (error) {
    console.error(error)
  }
  });


  export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadProducts.pending, (state) => {
          state.isLoading = true
        })
        .addCase(loadProducts.fulfilled, (state, action) => {
          if (action.payload) {
            state.data = action.payload.map(product =>({
              ...product,
              id: uuidv4()
            }))
          }
          state.isLoading = false
        })
        .addCase(loadProducts.rejected, (state, action) => {
          state.isLoading = false
        })
    },
  })


export const tableReducer = tableSlice.reducer;
export const tableDataSelector = (state: RootState) => state.tableReducer.data
export const tableLoadingSelector = (state: RootState) => state.tableReducer.isLoading