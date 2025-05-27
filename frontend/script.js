const API_URL = 'https://atividade-9-ex-2-backend.onrender.com/api';

// Elementos do DOM
const notaForm = document.getElementById('notaForm');
const formTitle = document.getElementById('formTitle');
const notaId = document.getElementById('notaId');
const tituloInput = document.getElementById('titulo');
const conteudoInput = document.getElementById('conteudo');
const cancelarBtn = document.getElementById('cancelarBtn');
const listaNotas = document.getElementById('listaNotas');

// Carregar notas ao iniciar
carregarNotas();

// Event Listeners
notaForm.addEventListener('submit', handleSubmit);
cancelarBtn.addEventListener('click', cancelarEdicao);

// Funções
async function carregarNotas() {
    try {
        const response = await fetch(`${API_URL}/notas`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const notas = await response.json();
        exibirNotas(notas);
    } catch (error) {
        console.error('Erro ao carregar notas:', error);
        alert('Erro ao carregar notas. Tente novamente.');
    }
}

function exibirNotas(notas) {
    listaNotas.innerHTML = '';
    notas.forEach(nota => {
        const notaElement = criarElementoNota(nota);
        listaNotas.appendChild(notaElement);
    });
}

function criarElementoNota(nota) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    const data = new Date(nota.dataCriacao).toLocaleDateString('pt-BR');
    
    col.innerHTML = `
        <div class="card nota-card">
            <div class="card-body">
                <h5 class="card-title">${nota.titulo}</h5>
                <p class="card-text">${nota.conteudo}</p>
                <p class="nota-data">Criado em: ${data}</p>
                <div class="nota-acoes">
                    <button class="btn btn-sm btn-primary me-2" onclick="editarNota('${nota.id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="excluirNota('${nota.id}')">Excluir</button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const nota = {
        titulo: tituloInput.value,
        conteudo: conteudoInput.value
    };
    
    try {
        if (notaId.value) {
            await atualizarNota(notaId.value, nota);
        } else {
            await criarNota(nota);
        }
        
        limparFormulario();
        carregarNotas();
    } catch (error) {
        console.error('Erro ao salvar nota:', error);
        alert('Erro ao salvar nota. Tente novamente.');
    }
}

async function criarNota(nota) {
    const response = await fetch(`${API_URL}/notas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nota)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

async function atualizarNota(id, nota) {
    const response = await fetch(`${API_URL}/notas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nota)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

async function excluirNota(id) {
    if (!confirm('Tem certeza que deseja excluir esta nota?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/notas/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        carregarNotas();
    } catch (error) {
        console.error('Erro ao excluir nota:', error);
        alert('Erro ao excluir nota. Tente novamente.');
    }
}

async function editarNota(id) {
    try {
        const response = await fetch(`${API_URL}/notas/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const nota = await response.json();
        
        notaId.value = nota.id;
        tituloInput.value = nota.titulo;
        conteudoInput.value = nota.conteudo;
        
        formTitle.textContent = 'Editar Nota';
        cancelarBtn.style.display = 'inline-block';
        
        tituloInput.focus();
    } catch (error) {
        console.error('Erro ao carregar nota:', error);
        alert('Erro ao carregar nota. Tente novamente.');
    }
}

function cancelarEdicao() {
    limparFormulario();
}

function limparFormulario() {
    notaForm.reset();
    notaId.value = '';
    formTitle.textContent = 'Nova Nota';
    cancelarBtn.style.display = 'none';
} 