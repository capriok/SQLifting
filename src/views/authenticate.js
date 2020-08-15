/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState } from 'react'
import { useStateValue } from '../state'
import { Button, Input } from 'godspeed'

import styles from '../styles/logbox.module.scss'

import { SQLiftingAcc } from '../api/sqlifting'

import person from '../gallery/person-black.png'
import secure from '../gallery/lock-black.png'
import blurred from '../gallery/blurred.jpg'

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
      <div className={styles.logbox}>
        <main>
          <h1>{formTitle}</h1>
          <form onSubmit={(e) => formSubmit(e)}>
            <label>
              <img src={person} alt="" />
              <Input placeholder="Username"
                value={form.username}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value.replace(/[^a-z]/ig, '').toLowerCase()
                  })} />
            </label>
            <label>
              <img src={secure} alt="" />
              <Input placeholder="Password"
                value={form.password}
                type="text"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value.replace(/[^a-z0-9]/ig, '')
                  })} />
            </label>
            <Button text={!register ? 'Login' : 'Register'} onClick={() => { }} />
          </form>
          <p onClick={() => { setRegister(!register); register ? setTitle('Login') : setTitle('Create Account') }}>
            {!register ? 'Dont have an account?' : 'Login with credentials'}
          </p>
          <div className={styles.bg}></div>
        </main>
      </div>
    </>
  )
}

export default Authenticate
