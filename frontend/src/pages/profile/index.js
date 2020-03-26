import React, { useEffect, useState } from 'react'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import logo from '../../assets/logo.svg'

import api from '../../services/api'

import './styles.css'

const Profile = () => {
    const [incidents, setIncidents] = useState('')
    const history = useHistory()

    const ongName = localStorage.getItem('ongName')
    const ongId = localStorage.getItem('ongId')

    useEffect(() => {
        api.get('/profile', {
            header: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    const handleDelete = async (id) => {
        try {
            await api.delete(`incidents/${id}`, {
                header: {
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch(err) {
            alert(`Erro ao deletar caso, tente novamente.`)
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt='Be The Hero'/>
                <span>Bem Vindo {ongName} </span>
            
                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button onClick={() => handleLogout} type='button'>
                    <FiPower size={18} color='#E02041' />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.localeCompare(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição:</strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDelete(incident.id)}>
                        <FiTrash2 size={20} color=''/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile