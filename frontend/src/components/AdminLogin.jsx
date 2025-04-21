import React, { useState } from 'react'

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if(res.ok) {
      localStorage.setItem('token', data.token)
      onLogin()
    } else {
      alert(data.message || 'Login failed')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='p-4 max-w-sm mx-auto'>
        <input 
          type="text" 
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='block w-full mb-2 p-2 border'
        />
        <input 
          type="password" 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='block w-full mb-2 p-2 border'
        />
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer'>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin