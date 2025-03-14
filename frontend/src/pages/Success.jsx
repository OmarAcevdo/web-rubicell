import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const navigate = useNavigate()
  const onButtonClick = () => {
    navigate("/")
  }

  useEffect(() => {
    const sessionId = queryParams.get('session_id');
    console.log(sessionId)
    if (sessionId) {
        // Hacer la llamada al backend con el parámetro session_id
        fetch(`http://localhost:8080/success?session_id=${sessionId}`, {
            method: 'GET',
            // Puedes incluir encabezados adicionales si es necesario
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al procesar el pago.');
                }
                // Manejar la respuesta exitosa, si es necesario
                console.log('Pago exitoso.');
            })
            .catch(error => {
                // Manejar errores
                console.error('Error al procesar el pago:', error.message);
            });
    }
}, [queryParams]);

  return (
    <div className='w-full h-[50rem] flex flex-col justify-center items-center'>
        <h4 className='font-bold'>Success!</h4>
        <p>{queryParams.toString().split("&").join("\n")}</p>
        <button onClick={onButtonClick} className='bg-green-600 px-10 py-3'>Regresar a Home</button>
    </div>
  )
}

export default Success