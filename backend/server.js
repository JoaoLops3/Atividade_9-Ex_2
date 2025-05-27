const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

// Rotas de notas
app.get('/notas', (req, res) => {
    try {
        res.json([]); // Por enquanto retorna array vazio
    } catch (error) {
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
        res.status(500).json({ error: 'Erro ao criar nota' });
    }
});

app.put('/notas/:id', (req, res) => {
    try {
        const { id } = req.params;
        const nota = req.body;
        res.json({ ...nota, id });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar nota' });
    }
});

app.delete('/notas/:id', (req, res) => {
    try {
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir nota' });
    }
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 