// /components/ItemCard/ItemCard.tsx

import { Item } from '@/utils/types';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../Context/CartContext';

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    const [isClicked, setIsClicked] = useState(false);

    // Check if the item is in the cart
    const isInCart = cartItems.some(cartItem => cartItem.item.id === item.id);

    const handleButtonClick = () => {
        setIsClicked(true);
        if (isInCart) {
            removeFromCart(item.id); // Remove from cart if already in cart
        } else {
            addToCart(item); // Add to cart if not in cart
        }
        // Reset the clicked state after a short delay
        setTimeout(() => {
            setIsClicked(false);
        }, 300); // Match this duration with the animation duration
    };

    return (
        <motion.div
            className="border hover:border-blue-300 p-4 flex flex-col"
            initial={{ opacity: 0, scale: 0.9 }} // Initial state
            animate={{ opacity: 1, scale: 1 }} // Animate to this state
            exit={{ opacity: 0, scale: 0.9 }} // Exit state
            transition={{ duration: 0.3 }} // Transition duration
            whileHover={{ scale: 1.05 }} // Scale up on hover
        >
            <img src={item.thumbnail} className='w-[230px] h-[200px] p-4' alt={item.name} />
            <h3 className=''>{item.name}</h3>
            <p className='font-semibold'>${item.price}</p>
            <motion.button 
                className={`text-white mt-4 px-8 py-2  transition duration-200 ${isInCart?'bg-gray-500 hover:bg-gray-600':'bg-green-600 hover:bg-green-800'}`}
                onClick={handleButtonClick}
                animate={isClicked ? { scale: 0.95 } : { scale: 1 }} // Animate scale on click
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
            </motion.button>
        </motion.div>
    );
};

export default ItemCard;