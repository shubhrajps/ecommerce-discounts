export type Item = {
    id: string;
    thumbnail: string;
    name: string;
    price: number;
};

export type CartItem = {
    id: number;
    item: Item;
    quantity: number;
};