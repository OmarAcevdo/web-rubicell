import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductsDashboardPage = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [productos, setProductos] = useState([])

    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")
    const [stock, setStock] = useState("")
    const [imagen, setImagen] = useState("")
    const [categorias, setCategorias] = useState([])
    const [marcas, setMarcas] = useState([])
    const [colores, setColores] = useState([])


    const [categoriaSelect, setCategoriaSelect] = useState("")
    const [marcaSelect, setMarcaSelect] = useState("")
    const [colorSelect, setColorSelect] = useState("")



    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");



    const obtenerProductos = async () => {
        const response = await fetch("http://localhost:8080/api/v1/productos")
        const data = await response.json()
        setProductos(data)
        setProductosFiltrados(data);
    }

    const obtenerCategorias = async () => {
        const response = await fetch("http://localhost:8080/api/v1/categorias")
        const data = await response.json()
        setCategorias(data)
    }

    const obtenerColores = async () => {
        const response = await fetch("http://localhost:8080/api/v1/colores")
        const data = await response.json()
        setColores(data)
    }


    const obtenerMarcas = async () => {
        const response = await fetch("http://localhost:8080/api/v1/marcas")
        const data = await response.json()
        setMarcas(data)
    }

    useEffect(() => {
        obtenerProductos()
        obtenerCategorias()
        obtenerMarcas()
        obtenerColores()
        setTitulo("");
        setDescripcion("");
        setPrecio("")
        setStock("")
        setImagen("")
        setCategoriaSelect("")
        setColorSelect("")
        setMarcaSelect("")
    }, [navigate])


    useEffect(() => {
        if (params.id) {
            const productoEncontrado = productos.find(p => p.id === Number(params.id))
            const categoriaEncontradaIndex = categorias.find(c => c.nombre === productoEncontrado.categoria)
            const marcaEncontradaIndex = marcas.find(m => m.nombre === productoEncontrado.marca)
            const colorEncontradoIndex = colores.find(c => c.nombre === productoEncontrado.color)
            if (productoEncontrado) {
                setTitulo(productoEncontrado.titulo)
                setDescripcion(productoEncontrado.descripcion)
                setPrecio(productoEncontrado.precio)
                setStock(productoEncontrado.stock)
                setCategoriaSelect(categoriaEncontradaIndex.id.toString())
                setMarcaSelect(marcaEncontradaIndex.id.toString())
                setColorSelect(colorEncontradoIndex.id.toString())
            }
        }
    }, [params.id])


    const handleImage = (e) => {
        setImagen(e.target.files[0])
    }

    const handleOnChange = async (e) => {
        e.preventDefault();

        const imagenData = new FormData();
        imagenData.append('imagen', imagen);

        if (params.id) {
            try {
                const response = await axios.put(`http://localhost:8080/api/v1/productos/${params.id}`, imagenData, {
                    params: {
                        modelo: JSON.stringify({
                            titulo,
                            descripcion,
                            precio,
                            stock,
                            categoria: categorias.find(c => c.id == categoriaSelect),
                            marca: marcas.find(m => m.id == marcaSelect),
                            color: colores.find(c => c.id == colorSelect)
                        })
                    },
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                });

                const productoActualizado = response.data;

                setProductos((prevProductos) =>
                    prevProductos.map((producto) =>
                        (producto.id === Number(params.id) ? productoActualizado : producto))
                );

                setProductosFiltrados((prevProductos) =>
                prevProductos.map((producto) =>
                    (producto.id === Number(params.id) ? productoActualizado : producto))
                );

                document.getElementById('imagen').value = '';
                setTitulo("");
                setDescripcion("");
                setPrecio("")
                setStock("")
                setCategoriaSelect("")
                setColorSelect("")
                setMarcaSelect("")
                setImagen("")
                navigate("/dashboard/products")
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
            }
        } else {

            try {
                const response = await axios.post("http://localhost:8080/api/v1/productos", imagenData, {
                    params: {
                        modelo: JSON.stringify({
                            titulo,
                            descripcion,
                            precio,
                            stock,
                            categoria: categorias.find(c => c.id == categoriaSelect),
                            marca: marcas.find(m => m.id == marcaSelect),
                            color: colores.find(c => c.id == colorSelect)
                        })
                    },
                    headers: {
                        Authorization: sessionStorage.getItem("token"),
                    },
                });
                
                const nuevoProducto = response.data;

                setProductos((prevProductos) => [...prevProductos, nuevoProducto]);
                setProductosFiltrados((prevProductos) => [...prevProductos, nuevoProducto]);

                document.getElementById('imagen').value = '';
                setTitulo("");
                setDescripcion("");
                setPrecio("")
                setStock("")
                setCategoriaSelect("")
                setColorSelect("")
                setMarcaSelect("")
            } catch (error) {
                console.error("Error al crear el producto:", error);
            }
        }


    };

    const handleEliminar = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/productos/${id}`, {
                headers: {
                    Authorization: sessionStorage.getItem("token"),
                },
            });
            setProductos((prevProductos) => prevProductos.filter((p) => p.id !== id));
            setProductosFiltrados((prevProductosFiltrados) => prevProductosFiltrados.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }

    const filtrarProductos = (term) => {
        const productosFiltrados = productos.filter((producto) =>
            producto.titulo.toLowerCase().includes(term.toLowerCase())
        );
        setProductosFiltrados(productosFiltrados);
    };

    const handleGenerarReporte = async (formato) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/reportes/producto-reporte/${formato}`, {
                responseType: 'arraybuffer', // Important for binary data
            });

            const blob = new Blob([response.data], { type: `application/${formato}` });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `producto-reporte.${formato}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Error al generar el informe ${formato}:`, error);
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-20 w-[70%]">
                <div className="flex items-center justify-between pb-4">
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Buscar productos por titulo"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                filtrarProductos(e.target.value);
                            }}
                        />

                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Titulo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descripcion
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Imagen
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Categoria
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Marca
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Color
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(p => (

                            <tr key={p.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.id}
                                </th>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.titulo}
                                </th>
                                <td className="px-6 py-4">
                                    {p.descripcion}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.precio}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.stock}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img src={`${p.url_imagen}?timestamp=${new Date().getTime()}`} className='h-10 w-10 mx-auto' alt="" />
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.categoria}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.marca}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {p.color}
                                </td>

                                <td className="px-6 py-4 flex justify-around items-center">
                                    <Link to={`/dashboard/products/${p.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</Link>
                                    <a onClick={() => handleEliminar(p.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Eliminar</a>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>


            <div class="max-w-md mx-auto">
                <button onClick={() => handleGenerarReporte("pdf")} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">PDF</button>
                <button onClick={() => handleGenerarReporte("xlsx")} type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">EXCEL</button>
            </div>

            <br />
            <form class="max-w-md mx-auto" onSubmit={(e) => handleOnChange(e)} encType='multipart/form-data'>
                <div class="relative z-0 w-full mb-5 group">
                    <input value={titulo} onChange={(e) => setTitulo(e.target.value)} type="text" name="titulo" id="titulo" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="titulo" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Titulo</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} type="text" name="descripcion" id="descripcion" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="descripcion" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descripcion</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input value={precio} onChange={(e) => setPrecio(e.target.value)} type="text" name="precio" id="precio" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="precio" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio</label>
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <input value={stock} onChange={(e) => setStock(e.target.value)} type="text" name="stock" id="stock" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="stock" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Stock</label>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                    <input onChange={handleImage} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" name='imagen' id="imagen" type="file" />
                </div>

                <div class="relative z-0 w-full mb-5 group">
                    <label for="categorias" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Selecciona una categoria</label>
                    <select id="categorias" onChange={(e) => setCategoriaSelect(e.target.value)} value={categoriaSelect} name='categorias' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <option>Selecciona una opcion</option>
                        {
                            categorias.map(c => (
                                <option value={c.id} key={c.id}>{c.nombre}</option>
                            ))
                        }
                    </select>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                    <label for="marcas" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Selecccion una marca</label>
                    <select id="marcas" onChange={(e) => setMarcaSelect(e.target.value)} value={marcaSelect} name='marcas' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <option>Selecciona una opcion</option>
                        {
                            marcas.map(m => (
                                <option value={m.id} key={m.id}>{m.nombre}</option>
                            ))
                        }
                    </select>
                </div>

                <div class="relative z-0 w-full mb-5 group">
                    <label for="colores" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Seleccciona un color</label>
                    <select id="colores" onChange={(e) => setColorSelect(e.target.value)} value={colorSelect} name='colores' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                        <option>Selecciona una opcion</option>
                        {
                            colores.map(c => (
                                <option value={c.id} key={c.id}>{c.nombre}</option>
                            ))
                        }
                    </select>
                </div>


                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Crear"}</button>
                {params.id &&
                    (
                        <Link className='mx-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' to="/dashboard/products">Cancelar</Link>
                    )
                }
            </form>

            <br />

        </>
    )
}

export default ProductsDashboardPage