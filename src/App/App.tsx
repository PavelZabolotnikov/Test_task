import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from '../store';
import { loadProducts, tableLoadingSelector, tableDataSelector } from '../features/Tables/tableSlice';
import { Spin } from 'antd'
import MainTable from '../features/Tables/Table'

function App() {

  const dispatch = useAppDispatch();
  const data = useAppSelector(tableDataSelector)
  const isLoading = useAppSelector(tableLoadingSelector)
  
  useEffect(() => {
    dispatch(loadProducts())
    },[dispatch]);

    if (isLoading) {
      return (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <Spin tip='Загрузка' size='large'><div className="content" /></Spin>
        </div>
      )
    }
    return <MainTable data={data} />
  }

export default App;

