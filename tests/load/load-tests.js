import http from 'k6/http';
import { check, sleep } from 'k6';
import { BASE_URL, alunoCredenciais } from './config.js';

// 👥 Token do admin mockado (ou real)
const admToken = 'Bearer fake-token-for-ADMTESTE';

export const options = {
  vus: 1000,
  duration: '10s',
};

export function setup() {
  // 🧹 Remove aluno antes, se existir
  http.del(`${BASE_URL}/auth/delete/${alunoCredenciais.matricula}`, null, {
    headers: { Authorization: admToken },
  });

  console.log('🔥 Setup concluído');
}

export default function () {
  // 1. Registro do aluno
  const registerRes = http.post(`${BASE_URL}/auth/register`, JSON.stringify({
    ...alunoCredenciais,
    tipo: 'ALUNO',
    nome: 'Aluno Teste',
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(registerRes, {
    'registro status 200 ou 400': (r) => r.status === 200 || r.status === 400,
  });

  // 2. Login
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify(alunoCredenciais), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
  });

  const token = loginRes.json('token');

  // 3. Listagem
  const listRes = http.get(`${BASE_URL}/components/list`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(listRes, {
    'listagem ok': (r) => r.status === 200,
  });

  // 4. Busca
  /*const tipo = 'Resistor';
  const buscaRes = http.get(`${BASE_URL}/components/search/${tipo}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  check(buscaRes, {
    'busca ok': (r) => r.status === 200,
  });

  sleep(1);*/
}