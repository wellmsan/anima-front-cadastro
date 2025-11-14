# Frontend - API Cadastro (React + Vite)

Este diretório contém um frontend simples em React para consumir a API `api-cadastro` (Spring Boot).

Requisitos:
- Node.js 18+ (npm ou yarn)
- Backend rodando em `http://localhost:8080` (endpoints: `/pets`)

Instalação e execução:

```bash
cd frontend
npm install
npm run dev
```

O Vite inicia por padrão em `http://localhost:3000`. A configuração de proxy encaminha chamadas para `/pets` ao backend em `http://localhost:8080`.

Observações:
- A API backend não fornece um endpoint `PUT /pets/{id}` para atualizar registros; o frontend implementa atualização como "deletar o registro antigo e criar um novo". Se preferir, podemos adicionar um endpoint de update no backend.

Páginas:
- `/` - Lista de pets
- `/new` - Formulário para criar pet
- `/edit/:id` - Formulário para editar (efetua delete+create por trás)

Se quiser que eu adicione testes automatizados, build automático ou integração com Docker, diga qual abordagem prefere.
