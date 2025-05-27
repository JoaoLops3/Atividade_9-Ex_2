const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Configuração da porta
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // Permite todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(express.json());

// Log de todas as requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rota de teste
app.get('/', (req, res) => {
    console.log('Rota / acessada');
    res.json({ message: 'API está funcionando!' });
});

// Rotas de notas
app.get('/notas', (req, res) => {
    console.log('Rota /notas acessada');
    try {
        res.json([]); // Por enquanto retorna array vazio
    } catch (error) {
        console.error('Erro ao buscar notas:', error);
        res.status(500).json({ error: 'Erro ao buscar notas' });
    }
});

app.post('/notas', (req, res) => {
    try {
        const nota = req.body;
        nota.id = Date.now().toString();
        nota.dataCriacao = new Date();
        res.status(201).json(nota);
    } catch (error) {
        console.error('Erro ao criar nota:', error);
        res.status(500).json({ error: 'Erro ao criar nota' });
    }
});

app.put('/notas/:id', (req, res) => {
    try {
        const { id } = req.params;
        const nota = req.body;
        res.json({ ...nota, id });
    } catch (error) {
        console.error('Erro ao atualizar nota:', error);
        res.status(500).json({ error: 'Erro ao atualizar nota' });
    }
});

app.delete('/notas/:id', (req, res) => {
    try {
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao excluir nota:', error);
        res.status(500).json({ error: 'Erro ao excluir nota' });
    }
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
    console.log(`Rota não encontrada: ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error('Erro interno:', err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`URL: http://localhost:${port}`);
}); 