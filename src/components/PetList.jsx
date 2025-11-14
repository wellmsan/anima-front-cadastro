import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPets, deletePet } from '../services/api'

export default function PetList() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [petToDelete, setPetToDelete] = useState(null)

  useEffect(() => {
    load()
  }, [])

  async function load() {
    try {
      setLoading(true)
      const data = await getPets()
      setPets(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  function handleDeleteClick(id) {
    setPetToDelete(id)
    setShowDeleteModal(true)
  }

  async function confirmDelete() {
    try {
      await deletePet(petToDelete)
      await load()
      setShowDeleteModal(false)
      setPetToDelete(null)
    } catch (e) {
      alert('Erro ao excluir: ' + e.message)
    }
  }

  function cancelDelete() {
    setShowDeleteModal(false)
    setPetToDelete(null)
  }

  if (loading) return <p>Carregando...</p>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h2>Pets</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Raça</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pets.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nome}</td>
              <td>{p.raca}</td>
              <td>{p.idade}</td>
              <td>
                <Link to={`/edit/${p.id}`} className="btn btn-sm btn-warning me-2">Editar</Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteClick(p.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmação */}
      {showDeleteModal && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999}}>
          <div style={{background: 'white', padding: 24, borderRadius: 8, minWidth: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.2)'}}>
            <h4>Confirmar exclusão</h4>
            <p>Tem certeza que deseja excluir este pet?</p>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button className="btn btn-secondary" onClick={cancelDelete}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
