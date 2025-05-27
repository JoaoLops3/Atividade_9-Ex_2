const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/notas', (req, res) => {
    res.json([]); // Por enquanto retorna array vazio
});

app.post('/notas', (req, res) => {
    const nota = req.body;
    nota.id = Date.now().toString();
    nota.dataCriacao = new Date();
    res.status(201).json(nota);
});

app.put('/notas/:id', (req, res) => {
    const { id } = req.params;
    const nota = req.body;
    res.json({ ...nota, id });
});

app.delete('/notas/:id', (req, res) => {
    res.status(204).send();
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 