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

```bash
NEXTEVENTS2/
├── public/
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── layout.js            # Layout global com <Menu />
│   │   ├── globals.css          # Estilos globais
│   │   ├── layout.module.css    # Estilos locais do layout
│   │   ├── page.js              # Página inicial (home)
│   │   └── evento/
│   │       └── [id]/
│   │           ├── page.jsx     # Página de detalhes do evento
│   │           └── eventoPage.module.css
│   ├── components/
│   │   ├── EventoCard.jsx
│   │   ├── eventoCard.module.css
│   │   ├── EventosContext.jsx   # Contexto com buscarEventos
│   │   ├── Menu.jsx
│   │   └── Menu.module.css
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package-lock.json
└── README.md
```

# 🎫 NextEvents – Plataforma de Eventos no Brasil

Aplicação web feita com **Next.js** que consome a API da **Ticketmaster** para listar e filtrar eventos culturais no Brasil. Interface responsiva com navegação fluida e contextualização via Context API.

---

## 🧠 Como funciona o projeto?

A aplicação é composta por:

### 🏠 Home (`Home.jsx`)
- Exibe eventos com base na cidade selecionada ou mostra todos os do Brasil.
- Usa o componente `EventoCard` para renderizar cada evento individualmente.

### 📌 Menu lateral (`Menu.jsx`)
- Permite navegar entre páginas (Home, Sobre, Contato).
- Mostra um botão para buscar eventos por cidade, que abre uma lista de cidades disponíveis com eventos.

### 🧩 EventoCard (`EventoCard.jsx`)
- Componente visual de cada evento.
- Mostra imagem, nome, data e local.
- Todo o card é clicável e redireciona para a rota dinâmica `/evento/[slug]`.

### 🧠 Contexto (`EventosContext.jsx`)
- Centraliza os dados de eventos e a função `buscarEventos`.
- Permite que vários componentes compartilhem esses dados sem prop drilling.

---

## 🔍 Como funciona o botão “Buscar Eventos por Cidade”

### ✅ Localização
Presente no menu lateral, visível apenas quando **não estamos na tela de evento individual**.

### ⚙️ O que ele faz?
- Ao ser clicado, mostra **botões de cidades** extraídas da resposta da API.
- Usa os nomes das cidades onde há eventos disponíveis no Brasil.
- Filtra automaticamente a partir do retorno da Ticketmaster e remove duplicatas com `Set`.

### 📡 Fonte das cidades
```js
eventos.map((e) => e._embedded?.venues?.[0]?.city?.name).filter(Boolean)
```

- Esse trecho coleta a cidade do local do evento.
- Converte o resultado em uma lista única com `Array.from(new Set(...))`.

### 📲 O que acontece ao clicar em uma cidade?
- Executa `buscarEventos(cidade)`
- Refaz a requisição para API com a cidade como parâmetro
- Atualiza a tela com os eventos correspondentes

### 🧠 Como os botões de cidade são gerados dinamicamente?

Os botões exibidos ao clicar em **"Buscar Eventos por Cidade"** são **gerados dinamicamente a partir da resposta da API**, e **apenas para cidades que realmente possuem eventos**. Isso evita mostrar cidades irrelevantes ou vazias.

#### 🔍 Lógica no código:
```js
const eventos = data._embedded?.events || [];

const cidades = new Set(
  eventos
    .map((e) => e._embedded?.venues?.[0]?.city?.name)
    .filter(Boolean) // remove nulos/undefined
);

const cidadesUnicas = Array.from(cidades).sort();
```

---

## 📦 Porque usamos Context API?

- Para compartilhar `eventos`, `buscarEventos()` e `cidadeSelecionada` entre os componentes.
- Evita passar props manualmente por várias camadas (prop drilling).
- Simples e eficaz para esse tipo de app SPA com dados globais.

### 🧠 Componentes que usam o Context:
- `Menu.jsx`
- `Home.jsx`

---



---

Desenvolvido para estudo e prática com Next.js, APIs externas, contexto global e responsividade.
