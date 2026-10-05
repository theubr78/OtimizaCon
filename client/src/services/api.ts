const BASE_URL = 'http://localhost:3001/api';

export const api = {
  async getPainel(modo: 'meu' | 'equipe' = 'meu') {
    const res = await fetch(`${BASE_URL}/painel?modo=${modo}`);
    return res.json();
  },

  async getProcessos(filtros: Record<string, string> = {}) {
    const params = new URLSearchParams(filtros);
    const res = await fetch(`${BASE_URL}/processos?${params.toString()}`);
    return res.json();
  },

  async getProcesso(id: string) {
    const res = await fetch(`${BASE_URL}/processos/${id}`);
    return res.json();
  },

  async mudarSituacao(id: string, payload: { situacao: string; motivo?: string; protocolo?: string; setor?: string }) {
    const res = await fetch(`${BASE_URL}/processos/${id}/situacao`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async definirProximaAcao(id: string, payload: { proximaAcao: string; responsavel?: string; prazoInterno?: string }) {
    const res = await fetch(`${BASE_URL}/processos/${id}/proxima-acao`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async concluirProcesso(id: string, payload: { dataConclusao?: string } = {}) {
    const res = await fetch(`${BASE_URL}/processos/${id}/concluir`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getDemandas() {
    const res = await fetch(`${BASE_URL}/demandas`);
    return res.json();
  },

  async criarDemanda(payload: any) {
    const res = await fetch(`${BASE_URL}/demandas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getClientes(busca?: string) {
    const url = busca ? `${BASE_URL}/clientes?busca=${encodeURIComponent(busca)}` : `${BASE_URL}/clientes`;
    const res = await fetch(url);
    return res.json();
  },

  async getGuias() {
    const res = await fetch(`${BASE_URL}/guias`);
    return res.json();
  },

  async atualizarConferenciaGuia(id: string, etapaIndex: number, concluida: boolean) {
    const res = await fetch(`${BASE_URL}/guias/${id}/conferencia`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etapaIndex, concluida })
    });
    return res.json();
  },

  async getDte() {
    const res = await fetch(`${BASE_URL}/dte`);
    return res.json();
  },

  async getVencimentos() {
    const res = await fetch(`${BASE_URL}/vencimentos`);
    return res.json();
  },

  async getBiblioteca() {
    const res = await fetch(`${BASE_URL}/biblioteca`);
    return res.json();
  },

  async getPortais() {
    const res = await fetch(`${BASE_URL}/portais`);
    return res.json();
  },

  async getRelatorios() {
    const res = await fetch(`${BASE_URL}/relatorios`);
    return res.json();
  }
};
