import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import axios from 'axios';

const ProductsPage = () => {
    const { products } = useContext(ProductContext);
    const { addToCard } = useContext(CartContext);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    const [brands, setBrands] = useState([])
    const [colours, setColours] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/marcas")
            .then(res => setBrands(res.data))
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/colores")
            .then(res => setColours(res.data))
            .catch(error => console.log(error))
    }, [])




    const handleBrandChange = (event) => {
        setSelectedBrand(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    };

    const filteredProducts = products.filter((product) => {
        return (
            (selectedBrand === '' || product.marca === selectedBrand) &&
            (selectedColor === '' || product.color === selectedColor) &&
            (selectedPrice === '' || product.precio <= parseInt(selectedPrice))
        );
    });


    if (!products || products.length === 0) {
        return (

            <div className='flex justify-center items-center h-full my-[380px]'>
                <img src="Loading.gif" alt="" />
            </div>
        )
    }

    console.log(selectedBrand)


    return (

        <div className='z-10'>
            <div className="flex md:ml-[300px] items-center justify-center md:py-5 flex-wrap text-[40px] font-semibold ">
                Productos
            </div>
            <hr className='ml-[350px] mr-5' />
            <div className='flex flex-col '>
                <div className='md:w-[300px] w-full bg-gray-900 z-0 md:fixed md:top-0 bottom-0 overflow-y-auto text-center md:left-0 right-0 '>
                    <div>
                        <p className='text-white text-2xl items-center text-center lg:pt-[70px] md:pt-[130px] pt-5 pb-5 '>
                            Marcas
                        </p>
                        <div className='text-white items-center text-start md:pl-20'>
                            <label>
                                <input checked={selectedBrand === ""} type="radio" value="" name="celulares" onChange={handleBrandChange} />
                                <span className='ml-4'>Todos</span>
                            </label><p className='m-2'></p>
                            {
                                brands.map(b => (
                                    <>
                                        <input
                                            key={b.id}
                                            type="radio"
                                            value={b.nombre}
                                            name="celulares"
                                            onChange={handleBrandChange}
                                            checked={selectedBrand === b.nombre}
                                        /><label className='ml-2'> {b.nombre}</label><p className='m-2'></p></>
                                ))
                            }
                        </div>

                        <div>
                            <p className='text-white text-2xl items-center text-center pt-6 pb-4 '>
                                Precio
                            </p>
                            <div className='text-white items-center text-start md:pl-20 '>
                                <label>
                                    <input type="radio" value="" name="precio" onChange={handlePriceChange} checked={selectedPrice === ''} />
                                    <span className='ml-4'> Todos</span>
                                </label><p className='m-2'></p>

                                <input
                                    type="radio"
                                    value={1000}
                                    name="precio"
                                    onChange={handlePriceChange}
                                    checked={selectedPrice === '1000'}
                                /><label className='ml-2'> Hasta S/. 1000 </label><p className='m-2'></p>

                                <input
                                    type="radio"
                                    value={2000}
                                    name="precio"
                                    onChange={handlePriceChange}
                                    checked={selectedPrice === '2000'}
                                /><label className='ml-2'> Hasta S/. 2000 </label><p className='m-2'></p>

                                <input
                                    type="radio"
                                    value={3000}
                                    name="precio"
                                    onChange={handlePriceChange}
                                    checked={selectedPrice === '3000'}
                                /><label className='ml-2'> Hasta S/. 3000 </label><p className='m-2'></p>

                                <input
                                    type="radio"
                                    value={10000}  // Utilizamos un valor grande para representar "a más"
                                    name="precio"
                                    onChange={handlePriceChange}
                                    checked={selectedPrice === '10000'}
                                /><label className='ml-2'> Hasta S/. 10000  </label><p className='m-2'></p>
                            </div>
                        </div>



                        <div>
                            <p className='text-white text-2xl items-center text-center  pt-6 pb-4 '>
                                Colores
                            </p>
                            <div className='text-white items-center text-start md:pl-20 '>
                                <label>
                                    <input checked={selectedColor === ""} type="radio" value="" name="colores" onChange={handleColorChange} />
                                    <span className='ml-4'> Todos</span>
                                </label><p className='m-2'></p>
                                {
                                    colours.map(c => (
                                        <>
                                            <input
                                                type="radio"
                                                value={c.nombre}
                                                name="colores"
                                                onChange={handleColorChange}
                                                checked={selectedColor === c.nombre}
                                            /><label className='ml-2'> {c.nombre}</label><p className='m-2'></p></>
                                    ))
                                }


                            </div>
                        </div>
                    </div>

                </div>

                <section
                    id="Project"
                    className="items-center md:ml-[350px] sm:ml-[70px] sm:mr-12 mx-auto grid sm:grid-cols-2 lg:grid-cols-2 grid-cols-1 md:grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 justify-items-center justify-center md:gap-y-20 lg:gap-x-14 gap-14 mt-10 mb-5"
                >
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
                            <Link to={`/products/${product.id}`}>
                                <img
                                    src={product.url_imagen}
                                    alt="Product"
                                    className="h-80 w-72 object-cover rounded-t-xl"
                                />
                            </Link>
                            <div className="px-4 py-3 w-72">
                                <span className="text-gray-400 mr-3 uppercase text-xs">{product.marca}</span>
                                <Link to={`/products/${product.id}`}>
                                    <p className="text-lg font-bold text-black truncate block capitalize">{product.titulo}</p>
                                </Link>
                                <p className="text-sm text-gray-600 cursor-auto ml-2">{product.color}</p>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold text-black cursor-auto my-3">S/. {product.precio}</p>
                                    <div className="ml-auto">
                                        <svg onClick={() => addToCard(product, product.id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus cursor-pointer" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

        </div >
    )
}

export default ProductsPage