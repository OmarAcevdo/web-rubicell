import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartCheckout = ({ item }) => {
    const { products } = useContext(ProductContext);
    const { removeFromCart, increseAmount, decreaseAmount } = useContext(CartContext);

    if (!item) {
        return null; // O cualquier cosa que desees hacer si 'item' es indefinido
    }

    const { id, url_imagen, descripcion, titulo, precio, stock, marca, colo, amount } = item;


    return (
        <>
            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 border-b ">
                <div className="shrink-0">
                    <Link to={`/products/${id}`}>
                        <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={url_imagen} alt="" />
                    </Link>
                </div>

                <div className="relative flex flex-1 flex-col justify-between">
                    <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                        <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">{titulo}</p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">{marca}</p>
                        </div>

                        <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-around">

                            <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                    <button onClick={() => decreaseAmount(id)} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{amount}</div>
                                    <button onClick={() => increseAmount(id)} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                               <p className="shrink-0 w-20 text-[14px]  text-gray-500 sm:order-2  sm:text-right">S/. {precio}</p> 
                               <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-7 ">{`S/. ${parseFloat(precio * amount)}`}</p> 
                            </div>
                            
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                        <button onClick={() => removeFromCart(id)} type="button" className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M6 18L18 6M6 6l12 12" className=""></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
        </>
    )
}

export default CartCheckout