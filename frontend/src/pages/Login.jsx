import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../stores/useUserStore'

const Login = () => {
  const { login, user } = useUserStore()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  

  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/'


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
        <div className='flex flex-col justify-center items-center'>
          <button className='mt-4 mb-3 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'>
            Login
          </button>
        <Link to={'/register'} className='underline'>
          Nao tem uma conta?
        </Link>
        </div>
      </form>
    </div>
  )
}

export default Login