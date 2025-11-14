import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import PetList from './components/PetList'
import PetForm from './components/PetForm'

export default function App() {
  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link to="/" className="btn btn-secondary">Lista de Pets</Link>
        <Link to="/new" className="btn btn-primary ms-2">Novo Pet</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PetList />} />
        <Route path="/new" element={<PetForm />} />
        <Route path="/edit/:id" element={<PetForm />} />
      </Routes>
    </div>
  )
}
