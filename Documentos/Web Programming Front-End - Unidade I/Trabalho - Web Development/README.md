# Trabalho - Web Development Front-End

## Sobre o Projeto

Aplicação front-end que consome a **API Rick and Morty** para exibir cards dinâmicos de personagens de desenhos de sucesso dos anos 90 e 2000.

Desenvolvido utilizando exclusivamente **HTML, CSS puro e JavaScript**, sem frameworks.

### Principais Recursos Implementados

- **Busca por nome** com reset automático ao limpar o campo
- **Filtro por status** (Todos, Vivo, Morto, Desconhecido)
- **Modal de detalhes** com informações completas do personagem (imagem, status, espécie, gênero, origem e localização)
- **Paginação** (anterior/próxima)
- **Layout responsivo** para mobile e desktop
- **Tratamento de erros** na requisição da API
- **Animações** de carregamento e transições visuais

## Tecnologias Utilizadas

- HTML5 (semântico)
- CSS3 (responsivo, Grid Layout)
- JavaScript ES6+ (async/await, fetch, DOM manipulation)
- API: [Rick and Morty API](https://rickandmortyapi.com/)

## Estrutura de Pastas

```
Trabalho - Web Development/
├── index.html        # Estrutura da página
├── css/
│   └── style.css     # Estilos da aplicação
├── js/
│   └── script.js     # Lógica de consumo da API e criação de cards
└── README.md         # Este arquivo
```

## Como Executar

1. Abra a pasta do projeto em qualquer editor de código (ex: VS Code).
2. Abra o arquivo `index.html` no navegador (duplo clique ou "Open with Live Server").
3. Os cards dos personagens serão carregados automaticamente da API.

## Funcionalidades

- ✅ Consumo de API pública via `fetch`
- ✅ Criação dinâmica de cards com `createElement` e `appendChild`
- ✅ Exibição de nome, imagem e status/espécie de cada personagem
- ✅ Busca de personagens por nome
- ✅ **Reset automático da busca** ao apagar o campo (volta para a lista completa sem recarregar a página)
- ✅ **Filtro por status** (Todos, Vivo, Morto, Desconhecido)
- ✅ **Modal de detalhes** ao clicar no card (imagem, status, espécie, gênero, origem e localização)
- ✅ Paginação (anterior/próxima)
- ✅ Layout responsivo para mobile e desktop
- ✅ Tratamento de erros na requisição
- ✅ Animações de carregamento e transições visuais

## 📊 Entregáveis do Trabalho

| Parte | Peso | Descrição |
|-------|------|-----------|
| Parte Teórica | 25% | PDF explicando API, DOM manipulation, fetch, createElement, appendChild |
| Parte Prática | 50% | Este site com consumo de API e cards dinâmicos |
| Vídeo Pitch | 25% | Apresentação de até 4 minutos |

## API Utilizada

- **Rick and Morty API**: https://rickandmortyapi.com/
- Gratuita, não requer cadastro nem token de acesso
- Endpoint utilizado: `/api/character?page=X&name=Y`
