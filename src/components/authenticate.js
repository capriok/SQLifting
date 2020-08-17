/*eslint react-hooks/exhaustive-deps: "off"*/
/*eslint no-unused-vars: "off"*/
import React, { useState } from 'react'
import { useStateValue } from '../state'
import { Button, Input } from 'godspeed'

import styles from '../styles/authbox.module.scss'

import { SQLiftingAcc } from '../api/sqlifting'

import person from '../gallery/authbox_person.png'
import lock from '../gallery/authbox_lock.png'

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
        // setTitle('idk')
      })
  }

  const login = () => {
    SQLiftingAcc.post('/login', {
      username: form.username,
      password: form.password
    })
      .then(async res => {
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
      .then(() => window.location.href = '/')
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
      <div className={styles.authbox}>
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
              <img src={lock} alt="" />
              <Input placeholder="Password"
                value={form.password}
                type="password"
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
