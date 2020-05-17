import React, { useState } from 'react'
import { useStateValue } from '../state'
import axios from 'axios'
import Input from 'godspeed/build/Input'
import Button from 'godspeed/build/Button'

const LogBox = () => {
  const [, dispatch] = useStateValue()
  const [register, setRegister] = useState(false)
  const [formTitle, setTitle] = useState('Login')
  const [form, setForm] = useState({
    username: '', password: ''
  })

  const login = () => {
    axios.post(process.env.REACT_APP_ACCOUNT + '/login', {
      username: form.username,
      password: form.password
    })
      .then(async res => {
        localStorage.setItem('SQLifting-token', res.data.token)
        localStorage.setItem('SQLifting-user', JSON.stringify(res.data.user))
        await dispatch({
          type: 'auth',
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

  const signUp = () => {
    axios.post(process.env.REACT_APP_ACCOUNT + '/register', {
      username: form.username,
      password: form.password
    })
      .then(res => {
        setTitle(res.data)
        setRegister(false)
        setTimeout(() => login(), 500);
      })
      .catch(error => {
        console.log(error);
        setTitle('Username already exists')
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
              <Input placeholder="Password" value={form.password} type="password"
                onChange={(e) => setForm({ ...form, password: e.target.value.replace(/[^a-z]/ig, '').toLowerCase() })} />
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

export default LogBox
