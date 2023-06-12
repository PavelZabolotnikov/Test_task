import React, { useState } from 'react'

import { DataType } from './Type/type'
import columns from './TableLayout'
import ItemCancelModal from './ItemCancelModal'
import { Button, Table } from 'antd'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';


  interface MainTableProps {
    data: DataType[]  
  }
  const MainTable: React.FC<MainTableProps> = ({ data }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
    const [selectedProduct, setSelectedProduct] = useState<DataType[]>([])
    const hasSelected = selectedRowKeys.length > 0
    const quantitySum = data.reduce((sum, current) => sum + current.quantity, 0)
    const productNames = selectedProduct.map((item) => item.name).join(', ')

    
  
    const handleSubmit = () => {
      const products = selectedProduct.map((item) =>  item.id )
      axios({
        url: `https://6481e31a29fa1c5c50324030.mockapi.io/cancel`,
        method: 'POST',
        data: {
          products,
        },
      })
        .then((res) => {
          console.log(res)
          setConfirmLoading(true)
          setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
          }, 2000)
        })
        .catch((err) => console.log(err))
    }
  
    const showModal = () => {
      setOpen(true)
    }
  
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys)
      const filteredData = data
        .map((item)=>({...item, key:item.id }))
        .filter((item) => newSelectedRowKeys.some((rowKey) =>  rowKey === item.id )); 
      setSelectedProduct(filteredData);
      setSelectedRowKeys(newSelectedRowKeys)
    }
  
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
    }
  
    return (
      <div style={{ margin: 17 }}>
        <ItemCancelModal
          open={open}
          setOpen={setOpen}
          productNames={productNames}
          handleSubmit={handleSubmit}
          loading={confirmLoading}
        />
        <div style={{ marginBottom: 16 }}>
          <Button type='primary' onClick={showModal} disabled={!hasSelected}>
            Аннулировать
          </Button>
        </div>
        <Table
           key={uuidv4()}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          rowKey={(row) => row.id}
          footer={() => `Общее количество: ${quantitySum}`}
        />
      </div>
    )
  }
  

  export default MainTable