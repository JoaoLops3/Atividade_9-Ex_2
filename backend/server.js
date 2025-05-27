const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuração da porta
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../frontend')));

// Log de todas as requisições
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rota de teste
app.get('/api/test', (req, res) => {
    console.log('Rota /api/test acessada');
    res.json({ message: 'API está funcionando!' });
});

// Rotas de notas
app.get('/api/notas', (req, res) => {
    console.log('Rota /api/notas acessada');
    res.json([]);
});

app.post('/api/notas', (req, res) => {
    console.log('Rota POST /api/notas acessada');
    const nota = req.body;
    nota.id = Date.now().toString();
    nota.dataCriacao = new Date();
    res.status(201).json(nota);
});

app.put('/api/notas/:id', (req, res) => {
    console.log(`Rota PUT /api/notas/${req.params.id} acessada`);
    const { id } = req.params;
    const nota = req.body;
    res.json({ ...nota, id });
});

app.delete('/api/notas/:id', (req, res) => {
    console.log(`Rota DELETE /api/notas/${req.params.id} acessada`);
    res.status(204).send();
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