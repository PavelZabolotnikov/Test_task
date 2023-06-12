type Currency = 'USD' | 'RUB'

export interface DataType {
    id: string
    name: string
    quantity: number
    deliveryDate: string
    price: number
    currency: Currency

  }
  