const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.cjs');
const componentRoutes = require('./routes/componentRoutes.cjs');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // ermite apenas reqs do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], //Cabeçalhos
}));

app.use(morgan('dev')); //Mostra logs das reqs no terminal
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
app.use('/components', componentRoutes);
app.use((req, res, next) => {
  console.log(`🔹 Rota acessada: ${req.method} ${req.url}`);
  next();
});

if (require.main === module) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

app.post('/components/add', (req, res) => {
  console.log('📩 JSON Recebido:', req.body);
  res.json({ message: 'JSON interceptado!', recebido: req.body });
});

module.exports = app;