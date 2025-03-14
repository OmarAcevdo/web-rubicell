import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

const UsersDashboardPage = () => {

  const params = useParams()
  const navigate = useNavigate()

  const [usuarios, setUsuarios] = useState([])
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [admin, setAdmin] = useState(false)

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");



  const obtenerUsuarios = async () => {
    const response = await fetch("http://localhost:8080/api/v1/usuarios")
    const data = await response.json()
    setUsuarios(data)
    setUsuariosFiltrados(data);
  }

  useEffect(() => {
    obtenerUsuarios()
    setEmail("");
    setUsername("");
    setPassword("");
    setAdmin(false);
  }, [navigate])


  useEffect(() => {
    if (params.id) {
      const usuarioEncontrado = usuarios.find(u => u.id === Number(params.id))
      if (usuarioEncontrado) {
        setEmail(usuarioEncontrado.email)
        setUsername(usuarioEncontrado.username)
        setAdmin(usuarioEncontrado.admin)
      }
    }
  }, [params.id])



  const handleOnChange = async (e) => {
    e.preventDefault();
    if (params.id) {
      try {
        const response = await axios.put(`http://localhost:8080/api/v1/usuarios/${params.id}`, {
          email,
          username,
          admin,
        }, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          }
        });
        const usuarioActualizado = response.data;

        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
          (usuario.id === Number(params.id) ? {
            ...usuario,
            username: usuarioActualizado.username, email: usuarioActualizado.email, admin: usuarioActualizado.admin
          } : usuario))
        );

        setEmail("");
        setUsername("");
        setPassword("");
        setAdmin(false);
        navigate("/dashboard/users")
      } catch (error) {
        console.error("Error al actualizar el usuario:", error);
      }
    } else {

      try {
        const response = await axios.post("http://localhost:8080/api/v1/usuarios", {
          email,
          username,
          password,
          admin,
        });
        const nuevoUsuario = response.data;

        setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);

        setEmail("");
        setUsername("");
        setPassword("");
        setAdmin(false);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      }
    }


  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/usuarios/${id}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      });
      setUsuarios((prevUsuarios) => prevUsuarios.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  }

  const filtrarUsuarios = (term) => {
    const usuariosFiltrados = usuarios.filter((usuario) =>
      usuario.username.toLowerCase().includes(term.toLowerCase())
    );
    setUsuariosFiltrados(usuariosFiltrados);
  };

  const handleGenerarReporte = async (formato) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/reportes/usuario-reporte/${formato}`, {
        responseType: 'arraybuffer', // Important for binary data
      });
  
      const blob = new Blob([response.data], { type: `application/${formato}` });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `usuario-reporte.${formato}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error al generar el informe ${formato}:`, error);
    }
  };


  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto my-20 w-[55%]">
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
              placeholder="Buscar usuarios por username"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filtrarUsuarios(e.target.value);
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
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                IsAdmin
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(u => (

              <tr key={u.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.id}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {u.username}
                </th>
                <td className="px-6 py-4">
                  {u.email}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {(u.admin).toString()}
                </td>
                <td className="px-6 py-4 flex justify-around items-center">
                  <Link to={`/dashboard/users/${u.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</Link>
                  <a onClick={() => handleEliminar(u.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Eliminar</a>
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
      <form class="max-w-md mx-auto" onSubmit={(e) => handleOnChange(e)}>
        <div class="relative z-0 w-full mb-5 group">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Correo Electronico</label>
        </div>
        <div class="relative z-0 w-full mb-5 group">
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
          <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
        </div>
        {
          !params.id && (
            <div class="relative z-0 w-full mb-5 group">
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
          )
        }

        <div class="relative z-0 w-full mb-5 group">
          <input id="admin" checked={admin} type="checkbox" onChange={(e) => setAdmin((prev) => !prev)} value={admin} name='admin' class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          <label for="admin" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">Admin</label>
        </div>

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{params.id ? "Actualizar" : "Crear"}</button>
        {params.id &&
          (
            <Link className='mx-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' to="/dashboard/users">Cancelar</Link>
          )
        }
      </form>


    </>
  )
}

export default UsersDashboardPage