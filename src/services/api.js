const BASE = '/pets'

export async function getPets() {
  const res = await fetch(BASE)
  if (!res.ok) throw new Error('Erro ao buscar pets')
  return res.json()
}

export async function getPet(id) {
  const res = await fetch(`${BASE}/${id}`)
  if (!res.ok) throw new Error('Pet não encontrado')
  return res.json()
}

export async function createPet(pet) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pet)
  })
  if (!res.ok) throw new Error('Erro ao criar pet')
  return res.json()
}

export async function deletePet(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Erro ao excluir pet')
  return true
}

// Observação: a API backend original não expõe um endpoint de update (PUT).
// Aqui implentamos update como: deletar o registro antigo e criar um novo com os novos dados.
export async function updatePet(id, pet) {
  // Deletar antigo
  await deletePet(id)
  // Criar novo
  return createPet(pet)
}
