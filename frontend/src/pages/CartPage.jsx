import React, { useContext, useState } from 'react'
import CartCheckout from '../components/CartCheckout'
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';

const CartPage = () => {
    const { cart, total } = useContext(CartContext);
    const [customerName, setCustomerName] = useState("")
    const [customerEmail, setCustomerEmail] = useState("")

    console.log(cart)

    const handleComprar = () => {
        if (!(JSON.parse(sessionStorage.getItem('login')))) {
            Swal.fire('Advertencia', 'No puede realizar compras necesecita iniciar sesion', 'error')
        } else {

            fetch("http://localhost:8080/checkout/hosted", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map(elem => ({ name: elem.titulo, id: elem.id })),
                    customerName: customerName,
                    customerEmail: customerEmail,
                    quantities: cart.map(elem => (elem.amount))
                })
            }).then(r => r.text())
                .then(r => {
                    window.location.href = r
                })

            //Swal.fire('Exito', 'La compra ha sido exitosa', 'success')
            //dispatch(limpiarCarrito())
        }
    }

    const handleChangeName = (e) => {
        setCustomerName(e.target.value)
      }
    
      const handleChangeEmail = (e) => {
        setCustomerEmail(e.target.value)
      }


    return (
        <div>
            <section className="h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center">
                        <h1 className="text-2xl font-semibold text-gray-900">Carrito de compras</h1>
                    </div>

                    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10">
                                <div className="flow-root">
                                    <ul className="-my-8">{cart.map((item) => {
                                        return <CartCheckout item={item} key={item.id} />

                                    })}
                                    </ul>
                                </div>

                                <div className="mt-6 flex items-center justify-between pt-6">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">S/. </span>{parseFloat(total).toFixed(2)}</p>
                                </div>

                                {(JSON.parse(sessionStorage.getItem('login'))) && (
                                    <div className='flex flex-col justify-center items-center my-5'>
                                        <label htmlFor="customerName">Ingrese Nombre del Cliente:</label>
                                        <input type="text" name='customerName' id='customerName' className='px-10 py-3 w-[20rem]' value={customerName} onChange={handleChangeName} />

                                        <label htmlFor="customerName">Ingrese Email del Cliente:</label>
                                        <input type="text" name='customerEmail' id='customerEmail' className='px-10 py-3 w-[20rem]' value={customerEmail} onChange={handleChangeEmail} />
                                    </div>
                                )
                                }

                                <div className="mt-6 text-center">
                                    <button onClick={() => handleComprar()} type="button" className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                        Realizar Compra
                                        <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default CartPage