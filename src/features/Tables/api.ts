import { DataType } from "./Type/type";

export const loadProducts1 =  async (): Promise<DataType[]> => {
    const responseOne = await fetch('https://6481dd2729fa1c5c503234b6.mockapi.io/nO')
    return responseOne.json()
    ;
  };

  export const loadProducts2 =  async (): Promise<DataType[]> => {
    const responseTwo = await fetch('https://6481dd2729fa1c5c503234b6.mockapi.io/n1')
    return responseTwo.json();
  };
