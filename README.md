# Procuradoria | Officecon — Plataforma de Gestão de Processos

Plataforma corporativa de gestão de processos do setor de Procuradoria de escritório de contabilidade em Salvador/BA, construída com princípios de **Clean Architecture**, **Domain-Driven Design (DDD)**, **Programação Orientada a Objetos (POO)** e persistência relacional **SQLite**.

---

## 🏗️ Arquitetura do Sistema

O projeto é dividido em camadas desacopladas seguindo Clean Architecture:

```
procuradoria-naveg-vel-prototype/
├── server/                              # BACKEND (Node.js + TypeScript + Express + SQLite)
│   ├── src/
│   │   ├── domain/                      # 1. DOMÍNIO (POO Pura & Invariantes de Negócio)
│   │   │   ├── entities/                # Entidades ricas com encapsulamento
│   │   │   │   ├── Processo.ts          # Aggregate Root: regras de situação, prazos, bloqueios
│   │   │   │   ├── Demanda.ts           # Recebimento e conversão em múltiplos processos
│   │   │   │   ├── Cliente.ts           # Estabelecimentos, contatos e dados cadastrais
│   │   │   │   ├── GuiaParcelamento.ts  # Ciclo de conciliação mensal em 6 etapas
│   │   │   │   ├── ChecklistItem.ts     # Exigência de evidência obrigatória (Regra 3)
│   │   │   │   └── EventoTimeline.ts    # Fato comprovado vs. Relato (Regra 6)
│   │   │   ├── value-objects/           # Objetos de Valor com validações
│   │   │   │   ├── CNPJ.ts              # Validação de dígitos e formatação
│   │   │   │   ├── SituacaoProcesso.ts  # Máquina de estados das 7 situações
│   │   │   │   └── Prazo.ts             # Cálculos de dias úteis e chips visuais
│   │   │   └── repositories/            # Contratos abstratos de persistência
│   │   │       ├── IProcessoRepository.ts
│   │   │       ├── IDemandaRepository.ts
│   │   │       └── IClienteRepository.ts
│   │   ├── application/                 # 2. CASOS DE USO (Application Services)
│   │   │   └── use-cases/
│   │   │       └── CriarDemandaComProcessosUseCase.ts
│   │   ├── infrastructure/              # 3. INFRAESTRUTURA & PERSISTÊNCIA
│   │   │   ├── database/
│   │   │   │   ├── Database.ts          # Driver SQLite com @libsql/client
│   │   │   │   ├── seedData.ts          # Dados iniciais (11 clientes, 18 processos, etc.)
│   │   │   │   └── seed.ts              # Migração e seed automatizado
│   │   │   └── repositories/            # Implementações concretas SQLite
│   │   │       ├── SqliteProcessoRepository.ts
│   │   │       ├── SqliteDemandaRepository.ts
│   │   │       └── SqliteClienteRepository.ts
│   │   └── interfaces/http/             # 4. APRESENTAÇÃO HTTP (API REST)
│   │       └── server.ts                # Endpoints REST e controllers
│   ├── package.json
│   └── tsconfig.json
│
├── project/                             # FRONTEND (Interface Rica & Conectada à API)
│   ├── Procuradoria.dc.html             # Interface com sincronização com a API REST
│   ├── support.js                       # Runtime reativo
│   └── serve.ps1                        # Servidor HTTP frontend
└── README.md
```

---

## 🚀 Como Executar o Projeto

### 1. Iniciar o Backend (API REST + SQLite)
Em um terminal na pasta `server`:
```bash
npm run dev
# ou
npx tsx src/interfaces/http/server.ts
```
O servidor inicializará o banco `server/procuradoria.db`, criará as tabelas e o seed automaticamente, e ficará disponível em:
👉 **`http://localhost:3001`**

### 2. Iniciar o Frontend
Em outro terminal na pasta `project`:
```powershell
powershell -ExecutionPolicy Bypass -File "serve.ps1" -Port 8899
```
Acesse a aplicação no navegador em:
👉 **`http://localhost:8899/Procuradoria.dc.html`**

---

## 📡 Endpoints da API REST

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/painel?modo=meu` | Retorna contadores, fila ordenada por prazo e parados há mais tempo |
| `GET` | `/api/processos` | Lista de processos com filtros por situação, responsável e busca |
| `GET` | `/api/processos/:id` | Detalhes de um processo específico |
| `PATCH` | `/api/processos/:id/situacao` | Altera situação (valida campos de "Aguardando..." ou "Cancelado") |
| `PATCH` | `/api/processos/:id/proxima-acao`| Define nova próxima ação, responsável e prazo |
| `POST` | `/api/processos/:id/concluir` | Conclui o processo com checklist de conclusão |
| `GET` | `/api/demandas` | Lista todas as demandas recebidas |
| `POST` | `/api/demandas` | Cria demanda e gera automaticamente 1 ou mais processos vinculados |
| `GET` | `/api/clientes` | Lista os clientes com contagem de processos abertos |
| `GET` | `/api/guias` | Lista os acordos e guias de parcelamentos do mês |
| `PATCH` | `/api/guias/:id/conferencia` | Atualiza o checklist de conciliação das 6 etapas |
| `PATCH` | `/api/guias/:id/status` | Atualiza o status da guia (emitir, emitida, enviada, paga, baixada) |
