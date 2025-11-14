import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPet, getPet, updatePet } from '../services/api'

export default function PetForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const editing = !!id

  const [nome, setNome] = useState('')
  const [raca, setRaca] = useState('')
  const [idade, setIdade] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (editing) load()
  }, [id])

  async function load() {
    try {
      setLoading(true)
      const pet = await getPet(id)
      setNome(pet.nome || '')
      setRaca(pet.raca || '')
      setIdade(pet.idade || 0)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      setLoading(true)
      const payload = { nome, raca, idade: Number(idade) }
      if (editing) {
        await updatePet(id, payload)
      } else {
        await createPet(payload)
      }
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      <h2>{editing ? 'Editar Pet' : 'Cadastrar Pet'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input className="form-control" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Raça</label>
          <input className="form-control" value={raca} onChange={e => setRaca(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Idade</label>
          <input type="number" className="form-control" value={idade} onChange={e => setIdade(e.target.value)} required />
        </div>
        <button className="btn btn-success me-2" type="submit">Salvar</button>
        <button className="btn btn-secondary" type="button" onClick={() => navigate('/')}>Cancelar</button>
      </form>
    </div>
  )
}
