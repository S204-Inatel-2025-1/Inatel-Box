import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/fireBaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const LoginPage = () => {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]); //estado para armazenar os usuários cadastrados
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const navigate = useNavigate();

  //funcao para verificar se um user ainda existe no bd
  const verificarUsuarioNoBanco = async (matricula) => {
    const usuarioRef = doc(db, 'alunos', matricula);
    const usuarioDoc = await getDoc(usuarioRef);
    return usuarioDoc.exists();
  };

  //carrega e verifica os users cadastrados
  useEffect(() => {
    const carregarUsuarios = async () => {
      const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Verifica cada usuário no localStorage
      const usuariosValidos = [];
      for (const usuario of usuariosCadastrados) {
        const usuarioExiste = await verificarUsuarioNoBanco(usuario.matricula);
        if (usuarioExiste) {
          usuariosValidos.push(usuario); //adiciona a lista apenas se o user existir no bd
        }
      }

      //atualiza o localStorage com a lista de usuários válidos
      localStorage.setItem('usuarios', JSON.stringify(usuariosValidos));
      setUsuarios(usuariosValidos);
    };

    carregarUsuarios();
  }, []);

  const handleLogin = async () => {
    try {
      if (!usuarioSelecionado) {
        alert('Selecione um usuário!');
        return;
      }

      //verificar senha
      if (usuarioSelecionado.senha === senha) {
        console.log('Login bem-sucedido!');
        navigate('/home');
      } else {
        alert('Senha incorreta!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <div style={styles.form}>
        <select
          style={styles.select}
          value={usuarioSelecionado ? usuarioSelecionado.matricula : ''}
          onChange={(e) => {
            const usuario = usuarios.find((u) => u.matricula === e.target.value);
            setUsuarioSelecionado(usuario);
            setMatricula(usuario.matricula);
          }}
        >
          <option value="">Selecione um usuário</option>
          {usuarios.map((usuario) => (
            <option key={usuario.matricula} value={usuario.matricula}>
              {usuario.matricula} - {usuario.curso}
            </option>
          ))}
        </select>

        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div style={{ height: '10px' }}></div>
        
        <button onClick={handleLogin} style={styles.button}>
          Entrar
        </button>

        <div style={{ height: '40px' }}></div>

        <button onClick={() => navigate('/register')} style={styles.button}>
          Novo Usuário
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f0f0f0',
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    boxSizing: 'border-box',
  },
  input: {
    marginBottom: '10px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    boxSizing: 'border-box',
  },
  select: {
    marginBottom: '10px',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
};

export default LoginPage;