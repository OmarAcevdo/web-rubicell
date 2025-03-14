import React from 'react'
import { useNavigate } from 'react-router-dom'

const Failure = () => {
  const queryParams = new URLSearchParams(window.location.search)
  const navigate = useNavigate()
  const onButtonClick = () => {
    navigate("/")
  }

  return (
    <div className='w-full h-[50rem] flex flex-col justify-center items-center'>
        <h4 className='font-bold'>Failure!</h4>
        <p>{queryParams.toString().split("&").join("\n")}</p>
        <button onClick={onButtonClick} className='bg-red-600 px-10 py-3'>Regresar a Home</button>
    </div>
  )
}

export default Failure