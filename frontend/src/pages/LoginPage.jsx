import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { verificarAuth } from '../store/authSlice'
import { loginUser } from '../services/authService'

const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const { username, password } = login


    const onChangeInput = (e) => {
        setLogin({...login,
            [e.target.name]: e.target.value
        })
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        if(!username || !password){
            Swal.fire('Error de validación', 'Username y password requeridos', 'error')
        }
        try{
            const response = await loginUser(login)
            const token = response.data.token;
            console.log(token)
            const claims = JSON.parse(window.atob(token.split(".")[1]));
            console.log(claims)
            const user = claims.sub
            dispatch(verificarAuth({user, isAdmin: claims.isAdmin}))
            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user,
            }))
            sessionStorage.setItem('token', `Bearer ${token}`)
            navigate("/dashboard/users")

        }catch(error) {
            if(error.response?.status == 401){
                console.log(error)
              Swal.fire('Error Login', 'Username o password invalidos', 'error')
            }else if(error.response?.status == 403){
              Swal.fire('Error Login', 'No tiene acceso al recurso o permisos!', 'error')
            }else{
              throw error
            }
        }
    }


    return (
        <div>

            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-blue-700">
                    <img className="w-8 h-8 mr-2" src="https://seeklogo.com/images/R/rubi-logo-A333EFA6B2-seeklogo.com.png"
                        alt="logo" />
                    Rubicell
                </a>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1
                            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Iniciar Sesion
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={loginSubmit}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu
                                    Username</label>
                                <input type="text" name="username" id="username"
                                    onChange={onChangeInput}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="ingrese su correo" required="" />
                            </div>
                            <div>
                                <label
                                    htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input type="password" name="password" id="password" placeholder="ingrese su contrseña"
                                    onChange={onChangeInput}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required="" />
                            </div>

                            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar
                                sesión</button>
                            <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                                ¿Aún no tienes una cuenta? <Link to="/register"
                                    className="text-blue-700 hover:underline dark:text-blue-500">Registrarse</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default LoginPage