export type CanalDemanda = 'WhatsApp' | 'E-mail' | 'Telefone' | 'DTE' | 'Interno' | 'Presencial';
export type StatusDemanda = 'Nova' | 'Em triagem' | 'Convertida' | 'Arquivada';

export interface DemandaProps {
  id: string;
  data: string;
  canal: CanalDemanda;
  clienteNome: string;
  solicitante: string;
  descricao: string;
  anexos?: string;
  status?: StatusDemanda;
  processosVinculados?: string[];
}

export class Demanda {
  private readonly id: string;
  private readonly data: string;
  private readonly canal: CanalDemanda;
  private readonly clienteNome: string;
  private readonly solicitante: string;
  private descricao: string;
  private anexos: string;
  private status: StatusDemanda;
  private processosVinculados: string[];

  constructor(props: DemandaProps) {
    if (!props.id) throw new Error('ID da demanda é obrigatório');
    if (!props.clienteNome) throw new Error('Nome do cliente é obrigatório');
    if (!props.descricao) throw new Error('Descrição da demanda é obrigatória');

    this.id = props.id;
    this.data = props.data || '02/10/2026';
    this.canal = props.canal || 'WhatsApp';
    this.clienteNome = props.clienteNome;
    this.solicitante = props.solicitante || '—';
    this.descricao = props.descricao;
    this.anexos = props.anexos || '';
    this.status = props.status || 'Nova';
    this.processosVinculados = props.processosVinculados || [];
  }

  public getId(): string { return this.id; }
  public getData(): string { return this.data; }
  public getCanal(): CanalDemanda { return this.canal; }
  public getClienteNome(): string { return this.clienteNome; }
  public getSolicitante(): string { return this.solicitante; }
  public getDescricao(): string { return this.descricao; }
  public getAnexos(): string { return this.anexos; }
  public getStatus(): StatusDemanda { return this.status; }
  public getProcessosVinculados(): string[] { return [...this.processosVinculados]; }

  public converterEmProcessos(novosProcessoIds: string[]): void {
    if (novosProcessoIds.length === 0) {
      throw new Error('A conversão de demanda exige ao menos um processo gerado.');
    }
    this.status = 'Convertida';
    for (const pid of novosProcessoIds) {
      if (!this.processosVinculados.includes(pid)) {
        this.processosVinculados.push(pid);
      }
    }
  }

  public arquivar(): void {
    this.status = 'Arquivada';
  }

  public emTriagem(): void {
    if (this.status === 'Nova') {
      this.status = 'Em triagem';
    }
  }

  public toJSON(): DemandaProps {
    return {
      id: this.id,
      data: this.data,
      canal: this.canal,
      clienteNome: this.clienteNome,
      solicitante: this.solicitante,
      descricao: this.descricao,
      anexos: this.anexos,
      status: this.status,
      processosVinculados: [...this.processosVinculados]
    };
  }
}
