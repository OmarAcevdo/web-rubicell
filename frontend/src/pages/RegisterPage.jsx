import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { registerService } from '../services/registerService'
import Swal from 'sweetalert2'

const RegisterPage = () => {

  const navigate = useNavigate()

  const [register, setRegister] = useState({
    username: '',
    password: '',
    email: ''
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: ""
  })



  const onChangeInput = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value
    })
  }

  const onRegister = async (e) => {
    e.preventDefault()
    try {
      await registerService(register)
      Swal.fire(
        'Usuario Creado',
        'El usuario ha sido creado con exito!',
        'success'
      )
      
      navigate('/')
      

    } catch (error) {
      if(error.response && error.response.status == 400){
        setErrors(error.response.data);
      } else if(error.response && error.response.status == 500 && 
              error.response.data?.message?.includes('constraint')){
        
        if(error.response.data?.message?.includes('UK_username')){
          setErrors({username: 'El username ya existe!'})
        }

        if(error.response.data?.message?.includes('UK_email')){
          setErrors({email: 'El email ya existe!'})
        }
      }else if(error.response?.status == 401){
        handlerLogout();
      }else{
        throw error;
      }
    }
}



  return (
    <div>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-blue-700">
          <img className="w-8 h-8 mr-2" src="https://seeklogo.com/images/R/rubi-logo-A333EFA6B2-seeklogo.com.png" alt="logo" />
          Rubicell
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Crear Cuenta
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onRegister}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu correo electrónico</label>
                <input onChange={onChangeInput} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su correo" />
                <p className='text-red-500'>{errors?.email}</p>
              </div>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de usuario</label>
                <input onChange={onChangeInput} type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingrese su usuario" />
                <p className='text-red-500'>{errors?.username}</p>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input onChange={onChangeInput} type="password" name="password" id="password" placeholder="Ingrese su contraseña" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <p className='text-red-500'>{errors?.password}</p>
              </div>

              <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear cuenta</button>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500">Entre aquí</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegisterPage