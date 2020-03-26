import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import './styles.css'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whats, setWhats] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory()

    const handleRegister = async (e) => {
        e.preventDefault()

        const data = {
            name,
            email, 
            whats, 
            city, 
            uf
        }
        try {
            const response = await applicationCache.post('ongs', data)
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/')
        }catch(err) {
            history.push('/register')
            alert(`Erro no cadastro, tente novamente.`)
        }
    }

    return (
        <div className="register-content">
            <div className="content">
                <section className="">
                    <img src={logo} alt='Be The Hero'/>
                
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>
                
                    <Link className='back-link' to='/'>
                        <FiArrowLeft size={16} color='#e02041'/>
                         Não tenho cadastro
                    </Link>
                
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder='Nome da ONG'
                        value={name}
                        onChange={ (e) => {setName(e.targer.value)}}
                    />
                    <input 
                        type="email" 
                        placeholder='E-mail'
                        value={email}
                        onChange={ (e) => {setEmail(e.targer.value)}}    
                    />
                    <input 
                        placeholder='WhatsApp'
                        value={whats}
                        onChange={ (e) => {setWhats(e.targer.value)}}
                    />

                    <div className="input-group">
                        <input 
                            placeholder='Cidade'
                            value={city}
                            onChange={ (e) => {setCity(e.targer.value)}}
                        />
                        <input 
                            placeholder='UF' 
                            style={{width: 80}}
                            value={uf}
                            onChange={ (e) => {setUf(e.targer.value)}}   
                        />
                    </div>

                    <button onClick={() => handleRegister} className="button" type='submit'>
                        Cadastrar
                    </button>

                </form>
            </div>
        </div>
        )
}

export default Register