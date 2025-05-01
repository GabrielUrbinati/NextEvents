# NextEvents
Projeto de NodeJS
# 🎭 Eventos Culturais - Web App

Este é um projeto em React para exibição de eventos culturais por **data**, **localização**, **gêneros** e **proximidade**, com consumo de uma **API externa de eventos**.

## 🚀 Objetivo

Permitir que os usuários descubram eventos de forma prática e organizada, com foco em usabilidade e acessibilidade. O sistema inclui filtros por data e localização, detalhes completos dos eventos e favoritos personalizados.

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/) para consumo de API
- [JavaScript (ES6+)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- CSS/Styled Components ou Tailwind (à escolha)

## 📂 Estrutura de Pastas

'eventos-app/
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── page.js                  # Página inicial (home)
│   │   ├── layout.js                # Layout global com <Menu />
│   │   ├── globals.css              # Estilos globais
│   │   ├── page.module.css          # Estilos locais (ex: home)
│   │
│   │   ├── evento/
│   │   │   └── [id]/
│   │   │       └── page.js          # Página de detalhes do evento
│   │   │
│   │   ├── buscar/
│   │   │   ├── data/
│   │   │   │   └── page.js          # Busca por data
│   │   │   ├── localizacao/
│   │   │   │   └── page.js          # Busca por localização
│   │   │   └── genero/
│   │   │       └── page.js          # Busca por gênero
│   │
│   │   └── favoritos/
│   │       └── page.js              # Lista de eventos favoritados
│
│   ├── components/
│   │   ├── Menu.jsx                 # Navegação principal (com <Link />)
│   │   ├── EventoCard.jsx          # Cartão resumo de evento
│   │   ├── EventoDetalhes.jsx      # Detalhes completos
│   │   ├── BuscarPorData.jsx
│   │   ├── BuscarPorLocalizacao.jsx
│   │   ├── Generos.jsx
│   │   └── PertoDeVoce.jsx
│
│   ├── services/
│   │   └── api.js                   # Axios configs e chamadas à API
│
│   ├── styles/
│   │   ├── variables.css            # Variáveis globais de estilo
│   │   └── components.module.css    # Estilos CSS Modules (opcional)
│
├── .gitignore
├── package.json
├── README.md'
