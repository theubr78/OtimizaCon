export type StatusGuia = 'emitir' | 'emitida' | 'enviada' | 'paga' | 'baixada';

export interface GuiaParcelamentoProps {
  id: string;
  clienteNome: string;
  cnpj: string;
  orgao: string;
  modalidade: string;
  numeroAcordo: string;
  parcela: string;
  vencimento: string;
  valor: number;
  origem: string;
  statusGuia: StatusGuia;
  contatoEnvio: string;
  tributo: string;
  situacaoAcordo?: 'Ativo' | 'Em atraso' | 'Rescindido';
  etapasConferencia?: boolean[]; // 6 etapas de conciliação
  dataEnvio?: string;
  dataPagamento?: string;
}

export class GuiaParcelamento {
  private readonly id: string;
  private readonly clienteNome: string;
  private readonly cnpj: string;
  private readonly orgao: string;
  private readonly modalidade: string;
  private readonly numeroAcordo: string;
  private parcela: string;
  private vencimento: string;
  private valor: number;
  private origem: string;
  private statusGuia: StatusGuia;
  private contatoEnvio: string;
  private tributo: string;
  private situacaoAcordo: 'Ativo' | 'Em atraso' | 'Rescindido';
  private etapasConferencia: boolean[];
  private dataEnvio?: string;
  private dataPagamento?: string;

  constructor(props: GuiaParcelamentoProps) {
    this.id = props.id;
    this.clienteNome = props.clienteNome;
    this.cnpj = props.cnpj;
    this.orgao = props.orgao;
    this.modalidade = props.modalidade;
    this.numeroAcordo = props.numeroAcordo;
    this.parcela = props.parcela;
    this.vencimento = props.vencimento;
    this.valor = props.valor;
    this.origem = props.origem || 'Portal';
    this.statusGuia = props.statusGuia || 'emitir';
    this.contatoEnvio = props.contatoEnvio;
    this.tributo = props.tributo;
    this.situacaoAcordo = props.situacaoAcordo || 'Ativo';
    this.etapasConferencia = props.etapasConferencia || [false, false, false, false, false, false];
    this.dataEnvio = props.dataEnvio;
    this.dataPagamento = props.dataPagamento;
  }

  public getId(): string { return this.id; }
  public getValor(): number { return this.valor; }
  public getStatusGuia(): StatusGuia { return this.statusGuia; }
  public getEtapasConferencia(): boolean[] { return [...this.etapasConferencia]; }

  public marcarConferencia(etapaIdx: number, concluida: boolean): void {
    if (etapaIdx < 0 || etapaIdx >= 6) {
      throw new Error(`Índice de conferência inválido: ${etapaIdx}`);
    }
    this.etapasConferencia[etapaIdx] = concluida;
  }

  public isTotalmenteConciliada(): boolean {
    return this.etapasConferencia.every(c => c === true);
  }

  public atualizarStatus(novoStatus: StatusGuia): void {
    this.statusGuia = novoStatus;
  }

  public registrarEnvio(dataEnvio: string = '02/10'): void {
    this.statusGuia = 'enviada';
    this.dataEnvio = dataEnvio;
  }

  public registrarPagamento(dataPag: string = '02/10'): void {
    this.statusGuia = 'paga';
    this.dataPagamento = dataPag;
  }

  public toJSON(): GuiaParcelamentoProps {
    return {
      id: this.id,
      clienteNome: this.clienteNome,
      cnpj: this.cnpj,
      orgao: this.orgao,
      modalidade: this.modalidade,
      numeroAcordo: this.numeroAcordo,
      parcela: this.parcela,
      vencimento: this.vencimento,
      valor: this.valor,
      origem: this.origem,
      statusGuia: this.statusGuia,
      contatoEnvio: this.contatoEnvio,
      tributo: this.tributo,
      situacaoAcordo: this.situacaoAcordo,
      etapasConferencia: [...this.etapasConferencia],
      dataEnvio: this.dataEnvio,
      dataPagamento: this.dataPagamento
    };
  }
}
