export interface ProductDto {
    id: string;
    name: string;
    price: number;
  }
  
  export interface OrderDto {
    id: string;
    productId: string;
    quantity: number;
    totalAmount: number;
    createdAt: string;
    status: string;
  }
  