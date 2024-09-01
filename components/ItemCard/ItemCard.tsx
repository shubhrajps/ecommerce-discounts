import { Item } from '@/utils/types';
import React from 'react';

const ItemCard: React.FC<{ item: Item, onAddToCart: Function, onRemoveFromCart: Function }> = 
    ({ item, onAddToCart, onRemoveFromCart }) => {
    return (
        <div className="border p-4 w-fit h-full">
            <img src={item.thumbnail} className='w-[230px] h-[200px] p-4' alt={item.name} />
            <h3 className=''>{item.name}</h3>
            <p className='font-semibold'>${item.price}</p>
            <button className='text-white mt-4 bg-green-500 px-8 py-2' onClick={() => onAddToCart(item.id)}>Add to Cart</button>
        </div>
    );
};

export default ItemCard;