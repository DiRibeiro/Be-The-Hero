import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logo from '../../assets/logo.svg'
import './styles.css'

import api from '../../services/api'

const NewIncident = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const history = useHistory()

    const ongId = localStorage.getItem('ongId')

    const handleNewIncident = async (e) => {
        e.preventDefault()
        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('/incidents/new', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile')
        }catch(err) {
            alert(`Erro ao cadastrar caso, tente novamente`)
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section className="">
                    <img src={logo} alt='Be The Hero'/>
                
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                    <Link className='back-link' to='/profile'>
                        <FiArrowLeft size={16} color='#e02041'/>
                         Voltar para home
                    </Link>
                
                </section>
                <form>
                    <input 
                        placeholder='Título do caso'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder='Descrição do caso'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder='Valor em reais'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button onClick={() => handleNewIncident} className="button" type='submit'>
                        Cadastrar
                    </button>

                </form>
            </div>
        </div>
        )
}

export default NewIncident