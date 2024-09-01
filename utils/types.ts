export type Item = {
    id: string;
    thumbnail: string;
    name: string;
    price: number;
};

export type CartItem = {
    id: string;
    item: Item;
    quantity: number;
};

export type Order = {
    id: string;
    items: CartItem[];
    totalPrice: number;
    discount: number;
    taxes: number;
}

export type OrderItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}
  
export type OrderData = {
    items: OrderItem[];
    discount: number;
    taxes: number;
    finalAmount: number;
}