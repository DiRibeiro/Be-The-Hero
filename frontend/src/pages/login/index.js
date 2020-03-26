import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

import api from '../../services/api'

const Login = () => {
    const [id, setId] = useState('')

    const history = useHistory()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = api.post('sessions', { id })
            
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')

        } catch (err) {
            history.push('/')
            alert(`Falha no login, tente novamente`)
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt='Be The Hero'/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder='Sua ID' 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className='button' type='submit'>Entrar</button>
                    
                    <Link className='back-link' to='/register'><FiLogIn size={16} color='#e02041'/> Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt=''/>
        </div>
    )
}

export default Login