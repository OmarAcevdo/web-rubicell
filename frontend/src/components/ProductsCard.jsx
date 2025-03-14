import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ProductsCard = () => {

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const response = await fetch("http://localhost:8080/api/v1/productos")
    const data = await response.json()
    setProducts(data)
  }


  useEffect(() => {
    getProducts()
  }, [])



  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Nuestro nuevos modelos</h1>
        <h1 className="text-3xl">Rubicell Show</h1>
      </div>


      <section id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

        {products.map(p => (
          <Link to={`/products/${p.id}`}>
          <div key={p.id} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
              <img src={p.url_imagen}
                alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Apple</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{p.titulo}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">${p.precio}</p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">${p.precio + (p.precio * 0.2)}</p>
                  </del>
                  <div className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 16 16">
                    <path fillRule="evenodd"
                      d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z" />
                    <path
                      d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                  </svg></div>
                </div>
              </div>
            </a>
          </div>
          </Link>
        ))}



      </section>
    </>
  )
}

export default ProductsCard