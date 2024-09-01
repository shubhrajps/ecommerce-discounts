import { image_assets } from '@/assets/assets';
import { Item } from '@/utils/types';
import Image from 'next/image';
import React from 'react';

const ItemCard: React.FC<{ item: Item, onAddToCart: Function, onRemoveFromCart: Function }> = 
    ({ item, onAddToCart, onRemoveFromCart }) => {
    return (
        <div className="border p-4">
        {/* <img src={item.thumbnail} alt={item.name} /> */}
        <Image src={image_assets.image_1} alt='thumbnail' width={200} height={60} />
        <h3>{item.name}</h3>
        <p>${item.price}</p>
        <button onClick={() => onAddToCart(item.id)}>Add to Cart</button>
        <button onClick={() => onRemoveFromCart(item.id)}>Remove from Cart</button>
        </div>
    );
};

export default ItemCard;