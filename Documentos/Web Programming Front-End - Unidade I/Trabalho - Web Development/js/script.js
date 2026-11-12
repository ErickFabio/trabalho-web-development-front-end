/*****************************************************************************************************************
 * Trabalho - Web Development Front-End
 * Projeto: Rick and Morty - Personagens dos Anos 90 e 2000
 * Autor: Erick Fábio 
 * Descrição: Consumo da API Rick and Morty e criação dinâmica de cards via JavaScript
 * API: https://rickandmortyapi.com/
 *****************************************************************************************************************/

// Configuracoes da API
const API_BASE = 'https://rickandmortyapi.com/api/character';
let paginaAtual = 1;
let buscaAtual = '';
let filtroStatusAtual = 'todos';

// Elementos do DOM
const containerCards = document.getElementById('cards');
const btnBuscar = document.getElementById('btnBuscar');
const inputBusca = document.getElementById('inputBusca');
const btnAnterior = document.getElementById('btnAnterior');
const btnProximo = document.getElementById('btnProximo');
const spanPagina = document.getElementById('paginaAtual');
const mensagem = document.getElementById('mensagem');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

// Elementos do Modal
const modal = document.getElementById('modal');
const btnFecharModal = document.getElementById('btnFecharModal');
const modalImg = document.getElementById('modalImg');
const modalNome = document.getElementById('modalNome');
const modalStatus = document.getElementById('modalStatus');
const modalEspecie = document.getElementById('modalEspecie');
const modalGenero = document.getElementById('modalGenero');
const modalOrigem = document.getElementById('modalOrigem');
const modalLocalizacao = document.getElementById('modalLocalizacao');

/**
 * Busca personagens da API Rick and Morty
 * @param {number} pagina - Numero da pagina para paginacao
 * @param {string} busca - Termo de busca (nome do personagem)
 */
async function buscarPersonagens(pagina = 1, busca = '') {
    try {
        // Monta a URL com parametros de pagina e busca (opcional)
        let url = `${API_BASE}?page=${pagina}`;
        if (busca && busca.trim() !== '') {
            url += `&name=${encodeURIComponent(busca.trim())}`;
        }

        // Exibe mensagem de carregamento
        containerCards.innerHTML = '';
        mensagem.textContent = 'Carregando personagens...';
        mensagem.style.display = 'block';

        // Consumo da API usando fetch (obrigatorio pelo enunciado)
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na requisicao: ${response.status}`);
        }

        const dados = await response.json();

        // Filtra por status se houver filtro ativo (exceto 'todos')
        let resultados = dados.results;
        if (filtroStatusAtual && filtroStatusAtual !== 'todos') {
            resultados = resultados.filter(p => p.status.toLowerCase() === filtroStatusAtual.toLowerCase());
        }

        // Atualiza estado da paginacao
        paginaAtual = pagina;
        buscaAtual = busca;
        spanPagina.textContent = `Página ${paginaAtual}`;

        // Habilita/desabilita botoes de paginacao
        btnAnterior.disabled = paginaAtual <= 1;
        btnProximo.disabled = !dados.info.next;

        // Esconde mensagem de carregamento
        mensagem.style.display = 'none';

        // Se nao encontrou resultados com busca
        if (busca && (!resultados || resultados.length === 0)) {
            containerCards.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--cor-primaria); font-size: 1.2rem;">
                    Nenhum personagem encontrado para "${busca}".
                </div>
            `;
            return;
        }

        // Se filtro ativou mas nao encontrou resultados
        if (!busca && filtroStatusAtual !== 'todos' && (!resultados || resultados.length === 0)) {
            containerCards.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--cor-primaria); font-size: 1.2rem;">
                    Nenhum personagem com este status encontrado.
                </div>
            `;
            return;
        }

        // Cria os cards dinamicamente (obrigatorio pelo enunciado)
        criarCards(resultados);

    } catch (erro) {
        console.error('Erro ao consumir a API:', erro);
        mensagem.textContent = 'Erro ao carregar personagens. Tente novamente mais tarde.';
        mensagem.style.display = 'block';
        containerCards.innerHTML = '';
    }
}

/**
 * Cria os cards de personagens dinamicamente no DOM
 * Usando createElement e appendChild (obrigatorio pelo enunciado)
 * @param {Array} personagens - Lista de personagens retornados pela API
 */
function criarCards(personagens) {
    // Limpa o container antes de inserir novos cards
    containerCards.innerHTML = '';

    personagens.forEach(personagem => {
        // Cria o elemento card
        const card = document.createElement('article');
        card.classList.add('card');
        card.dataset.id = personagem.id;

        // Cria a imagem do personagem
        const imagem = document.createElement('img');
        imagem.src = personagem.image;
        imagem.alt = `Imagem de ${personagem.name}`;
        imagem.loading = 'lazy';

        // Cria o container do conteudo do card
        const conteudo = document.createElement('div');
        conteudo.classList.add('card-conteudo');

        // Cria o nome do personagem
        const nome = document.createElement('h3');
        nome.textContent = personagem.name;

        // Cria o status do personagem
        const status = document.createElement('span');
        status.classList.add('status');
        status.textContent = personagem.status;
        // Normaliza a classe para estilizar corretamente
        const statusLower = personagem.status.toLowerCase();
        if (statusLower === 'alive') {
            status.classList.add('vivo');
        } else if (statusLower === 'dead') {
            status.classList.add('morto');
        } else {
            status.classList.add('desconhecido');
        }

        // Cria a descricao adicional (especie)
        const descricao = document.createElement('p');
        descricao.textContent = `Especie: ${personagem.species}`;

        // Monta a estrutura do card usando appendChild (obrigatorio pelo enunciado)
        conteudo.appendChild(nome);
        conteudo.appendChild(descricao);
        conteudo.appendChild(status);

        card.appendChild(imagem);
        card.appendChild(conteudo);

        // Evento de clique para abrir modal de detalhes
        card.addEventListener('click', () => abrirModal(personagem));

        // Insere o card no container principal
        containerCards.appendChild(card);
    });
}

/**
 * Abre o modal com os detalhes do personagem
 * @param {Object} personagem - Objeto com os dados do personagem
 */
function abrirModal(personagem) {
    modalImg.src = personagem.image;
    modalImg.alt = `Imagem de ${personagem.name}`;
    modalNome.textContent = personagem.name;
    modalStatus.textContent = personagem.status;
    modalEspecie.textContent = personagem.species;
    modalGenero.textContent = personagem.gender;
    modalOrigem.textContent = personagem.origin.name;
    modalLocalizacao.textContent = personagem.location.name;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita scroll no fundo
}

/**
 * Fecha o modal de detalhes
 */
function fecharModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

/**
 * Inicializacao da aplicacao ao carregar a pagina
 */
function init() {
    // Carrega a primeira pagina ao iniciar
    buscarPersonagens(1, '');

    // Evento do botao de busca
    btnBuscar.addEventListener('click', () => {
        const termo = inputBusca.value;
        buscarPersonagens(1, termo);
    });

    // Permite buscar pressionando Enter no input
    inputBusca.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const termo = inputBusca.value;
            buscarPersonagens(1, termo);
        }
    });

    // Quando o campo de busca for esvaziado, reseta automaticamente para a lista completa
    inputBusca.addEventListener('input', () => {
        if (inputBusca.value.trim() === '') {
            buscaAtual = '';
            filtroStatusAtual = 'todos';
            // Reseta o botao de filtro ativo para 'todos'
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            const btnTodos = document.querySelector('.btn-filtro[data-status="todos"]');
            if (btnTodos) btnTodos.classList.add('ativo');
            buscarPersonagens(1, '');
        }
    });

    // Evento do botao pagina anterior
    btnAnterior.addEventListener('click', () => {
        if (paginaAtual > 1) {
            buscarPersonagens(paginaAtual - 1, buscaAtual);
        }
    });

    // Evento do botao proxima pagina
    btnProximo.addEventListener('click', () => {
        buscarPersonagens(paginaAtual + 1, buscaAtual);
    });

    // Eventos dos botoes de filtro por status
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove classe ativa de todos e adiciona ao clicado
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');

            filtroStatusAtual = botao.dataset.status;
            buscarPersonagens(1, buscaAtual);
        });
    });

    // Evento de fechar modal (botao X)
    btnFecharModal.addEventListener('click', fecharModal);

    // Fecha modal clicando fora do conteudo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Fecha modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            fecharModal();
        }
    });
}

// Executa a inicializacao quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);