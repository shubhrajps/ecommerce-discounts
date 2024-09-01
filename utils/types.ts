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