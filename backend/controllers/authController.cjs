const { db } = require('../services/fireBaseConfig.cjs');
const { generateCustomToken, verificarUsuario } = require('../services/authService.cjs');

const login = async (req, res) => {
  const { matricula, senha } = req.body;

  try {
    const userRef = db.collection('usuarios').doc(matricula);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const userData = userDoc.data();

    if (userData.senha !== senha) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const customToken = await generateCustomToken(userData.matricula, userData.tipo);

    res.json({ token: customToken, ...userData, matricula});
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  const { matricula, senha, curso } = req.body;

  try {
    if (!matricula || !senha || !curso) {
      return res.status(400).json({ error: 'Preencha todos os campos!' });
    }

    const snapshot = await db.collection('usuarios')
      .where('matricula', '==', matricula)
      .where('curso', '==', curso)
      .get();

    if (!snapshot.empty) {
      return res.status(400).json({ error: 'Já existe um usuário com essa matrícula e curso.' });
    }

    const userRef = db.collection('usuarios').doc(matricula);
    await userRef.set({
      matricula,
      senha,
      curso,
      tipo: 'aluno',
    });

    res.json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection('usuarios').get();
    const users = [];

    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, register, listUsers };