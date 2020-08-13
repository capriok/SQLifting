import React, { useState } from 'react'
import { useStateValue } from '../state'
import { Button, Input } from 'godspeed'

import { SQLiftingAcc } from '../api/sqlifting'

const Authenticate = () => {
  const [, dispatch] = useStateValue()
  const [register, setRegister] = useState(false)
  const [formTitle, setTitle] = useState('Login')
  const [form, setForm] = useState({
    username: '', password: ''
  })

  const signUp = () => {
    SQLiftingAcc.post('/register', {
      username: form.username,
      password: form.password
    })
      .then(res => {
        console.log(res);
        if (res.data === 'Username taken') return setTitle(res.data)
        setTitle(res.data)
        setRegister(false)
        setTimeout(() => login(), 500);
      })
      .catch(error => {
        console.log(error);
        setTitle('idk')
      })
  }

  const login = () => {
    SQLiftingAcc.post('/login', {
      username: form.username,
      password: form.password
    })
      .then(async res => {
        console.log(res);
        setTitle(`Welcome ${res.data.user.name.capitalize()}`)
        localStorage.setItem('SQLifting-token', res.data.token)
        localStorage.setItem('SQLifting-user', JSON.stringify(res.data.user))
        await dispatch({
          type: 'AUTHORIZATION',
          user: {
            isAuthenticated: true,
            token: res.data.token,
            details: res.data.user
          }
        })
      })
      .then(() => window.location.pathname = '/database')
      .catch(error => {
        console.log(error);
        setTitle('Invalid Credentials')
      })
  }

  const formSubmit = e => {
    e.preventDefault()
    if (form.username && form.password) {
      if (!register) {
        login()
      } else {
        signUp()
      }
    }
  }

  return (
    <>
      <div className="log-box">
        <header><h1>{formTitle}</h1></header>
        <section>
          <form onSubmit={(e) => formSubmit(e)}>
            <div>
              <Input placeholder="Username" value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value.replace(/[^a-z]/ig, '').toLowerCase() })} />
              <Input placeholder="Password" value={form.password} type="text"
                onChange={(e) => setForm({ ...form, password: e.target.value.replace(/[^a-z0-9]/ig, '') })} />
            </div>
            <div>
              <Button text={!register ? 'Login' : 'Register'} onClick={() => { }} />
            </div>
          </form>
          <p onClick={() => { setRegister(!register); register ? setTitle('Login') : setTitle('Create Account') }}>
            {!register ? 'Dont have an account?' : 'Login with credentials'}
          </p>
        </section>
      </div>
    </>
  )
}

export default Authenticate
