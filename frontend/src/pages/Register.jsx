import React, { useState } from 'react'
import { useUserStore } from '../stores/useUserStore'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register } = useUserStore()
  const [ user, setUser ] = useState()
  const [ email, setEmail ] = useState()
  const [ password, setPassword ] = useState()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()


    await register(user, email, password)
    // navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleRegister} className='p-4 max-w-sm mx-auto'>
        <input 
          type="text"
          placeholder='username'
          value={user}
          onChange={(e) => setUser(e.target.value)} 
          className='block w-full mb-2 p-2 border'
        />
        <input 
          type="text"
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className='block w-full mb-2 p-2 border'
        />
        <input 
          type="text"
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          className='block w-full mb-2 p-2 border'
        />
        <div>
          <button className='mt-3 mb-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'>Criar conta</button>
        </div>
      </form>
    </div>
  )
}

export default Register