import { ColumnsType } from 'antd/es/table'
import { DataType } from './Type/type'
import * as dayjs from 'dayjs'

const columns: ColumnsType<DataType> = [
    {
      key:'name',
      title: 'Название',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
    },
    {
      key:'quantity',
      title: 'Количество',
      dataIndex: 'quantity',
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
        multiple: 5,
      },
    },
    {
      key:'deliveryDate',
      title: 'Дата доставки',
      dataIndex: 'deliveryDate',
      render: (value) => dayjs.default(value).format('hh:mm DD.MM.YYYY'),
      defaultSortOrder: 'ascend',
      sorter: {
        compare: (a, b) => Date.parse(a.deliveryDate) - Date.parse(b.deliveryDate),
        multiple: 3,
      },
    },
    {
      key:'price',
      title: 'Цена',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.price - b.price,
        multiple: 4,
      },
    },
    {
      key:'currency',
      title: 'Валюта',
      dataIndex: 'currency',
      sorter: {
        compare: (a, b) => a.currency.localeCompare(b.currency),
        multiple: 5,
      },
    },
  ]

  export default columns
