export type SituacaoTipo = 'nao' | 'and' | 'cli' | 'org' | 'set' | 'conc' | 'canc';

export interface SituacaoMetadata {
  codigo: SituacaoTipo;
  label: string;
  corTexto: string;
  corFundo: string;
  corPonto: string;
  exigeMotivo: boolean;
}

export class SituacaoProcesso {
  private readonly tipo: SituacaoTipo;

  private static readonly METADADOS: Record<SituacaoTipo, SituacaoMetadata> = {
    nao: { codigo: 'nao', label: 'Não iniciado', corTexto: '#C4C4CC', corFundo: '#26262A', corPonto: '#6B6B73', exigeMotivo: false },
    and: { codigo: 'and', label: 'Em andamento', corTexto: '#7DB2F0', corFundo: '#172A42', corPonto: '#2F6FC0', exigeMotivo: false },
    cli: { codigo: 'cli', label: 'Aguardando cliente', corTexto: '#F2B25C', corFundo: '#3A2A10', corPonto: '#D98A0B', exigeMotivo: true },
    org: { codigo: 'org', label: 'Aguardando órgão', corTexto: '#B79CF5', corFundo: '#2A1F45', corPonto: '#7C4DDB', exigeMotivo: true },
    set: { codigo: 'set', label: 'Aguardando setor', corTexto: '#6FD3E6', corFundo: '#0F3238', corPonto: '#1395B0', exigeMotivo: true },
    conc: { codigo: 'conc', label: 'Concluído', corTexto: '#6FD69B', corFundo: '#13301F', corPonto: '#2E9E5B', exigeMotivo: false },
    canc: { codigo: 'canc', label: 'Cancelado', corTexto: '#8E8E96', corFundo: '#232327', corPonto: '#6B6B73', exigeMotivo: true }
  };

  constructor(tipo: SituacaoTipo) {
    if (!SituacaoProcesso.METADADOS[tipo]) {
      throw new Error(`Situação inválida: ${tipo}`);
    }
    this.tipo = tipo;
  }

  public getTipo(): SituacaoTipo {
    return this.tipo;
  }

  public getMetadata(): SituacaoMetadata {
    return SituacaoProcesso.METADADOS[this.tipo];
  }

  public isAguardando(): boolean {
    return this.tipo === 'cli' || this.tipo === 'org' || this.tipo === 'set';
  }

  public isFinalizado(): boolean {
    return this.tipo === 'conc' || this.tipo === 'canc';
  }

  public isAberto(): boolean {
    return !this.isFinalizado();
  }

  public static getTodosMetadados(): SituacaoMetadata[] {
    return Object.values(SituacaoProcesso.METADADOS);
  }
}
