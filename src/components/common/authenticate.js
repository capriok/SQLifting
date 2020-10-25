import React, { useState } from 'react'
import { SQLiftingAcc } from '../../api/sqlifting'
import { useStateValue } from '../../global/state'

import styles from '../../styles/common/authbox.module.scss'
import person from '../../assets/authbox_person.png'
import lock from '../../assets/authbox_lock.png'

import { Button, Input } from 'godspeed'

const Authenticate = () => {
  const [, dispatch] = useStateValue()
  const [register, setRegister] = useState(false)
  const [formTitle, setTitle] = useState('Login')
  const [form, setForm] = useState({
    username: '', password: ''
  })

  function postUser() {
    SQLiftingAcc.post('/user', {
      username: form.username,
      password: form.password
    })
      .then(res => {
        console.log(res);
        if (res.data === 'Username taken') return setTitle(res.data)
        setTitle(res.data)
        setRegister(false)
        setTimeout(() => getUser(), 500);
      })
      .catch(error => {
        console.log(error);
        // setTitle('idk')
      })
  }

  function getUser() {
    SQLiftingAcc.get('/user', {
      params: {
        username: form.username,
        password: form.password
      }
    })
      .then(async res => {
        setTitle(`Welcome ${res.data.user.username.capitalize()}`)
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

  function formSubmit(e) {
    e.preventDefault()
    if (form.username && form.password) {
      if (!register) {
        getUser()
      } else {
        postUser()
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
              <Input
                placeholder="Password"
                value={form.password}
                type="password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value.replace(/[^a-z0-9]/ig, '')
                  })} />
            </label>
            <Button
              text={!register ? 'Login' : 'Register'}
              onClick={() => { }} />
          </form>
          <p
            onClick={() => {
              setRegister(!register)
              register
                ? setTitle('Login')
                : setTitle('Create Account')
            }}>
            {!register ? 'Dont have an account?' : 'Login with credentials'}
          </p>
          <div className={styles.bg}></div>
        </main>
      </div>
    </>
  )
}

export default Authenticate
