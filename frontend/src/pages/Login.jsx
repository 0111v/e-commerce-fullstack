import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const Login = () => {
  const { login, user } = useUserStore()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'

  console.log(user)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      await login(email, password)
      navigate(from)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin} className='p-4 max-w-sm mx-auto'>
        <input 
          type="text" 
          placeholder='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='block w-full mb-2 p-2 border'
        />
        <input 
          type="password" 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='block w-full mb-2 p-2 border'
        />
        <div className='flex flex-row'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'>Login</button>
        </div>

      </form>

      {/* <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer'>Registrar</button> */}

    </div>
  )
}

export default Login