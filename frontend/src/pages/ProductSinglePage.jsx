import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import Footer from '../components/Footer';
import { CartContext } from '../context/CartContext';

const ProductSinglePage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCard} = useContext(CartContext);

  // Encontrar el producto correspondiente al ID
  const product = products.find((item) => item.id === parseInt(id));

  // Manejar el caso en el que no se encuentra el producto
  if (!product) {
    return <section className='h-screen flex justify-center items-center'>Cargando....</section>;
  }

  // Desestructurar el producto
  const { url_imagen, descripcion, titulo, precio, stock, marca, color } = product;

  return (
    <>
    
    <section className='pt-24 pb-24  lg:py-40 flex items-center'>
        
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='w-[350px] h-[350px]' src={url_imagen} alt='' />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            
            <h1 className='text-[28px]  font-medium mb-0 max-w-[450px] mx-auto lg:mx-0'>
              {titulo}
            </h1>
            <p className='text-gray-400 text-[18px] mb-3 '>Marca: {marca}</p>
            <p className='mb-4 text-[18px]'>{descripcion}</p>
            <div className='text-x1 text-red-500 font-medium mb-3'>
             Precio: S./ {precio}
            </div>
            
            <p className='text-gray-400 mb-2 text-[13px]'>Stock: {stock}</p>
            <button onClick={()=> addToCard(product, product.id)}
              className='bg-black py-4 px-8 text-white hover:bg-red-700 transition-all rounded-lg'>
              Añadir al carrito              
            </button>
          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
 )
}

export default ProductSinglePage