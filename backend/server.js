const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuração da porta
const port = process.env.PORT || 3000;

// Configuração do CORS
const corsOptions = {
    origin: [
        'https://atividade-9-ex-2.onrender.com',
        'https://atividade-9-ex-2.vercel.app',
        'http://localhost:8000'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

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

// Iniciar servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor iniciado na porta ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`URL: http://localhost:${port}`);
}); 