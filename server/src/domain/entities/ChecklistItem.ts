export interface ChecklistItemProps {
  id: string;
  processoId: string;
  etapaNumero: number;
  descricao: string;
  obrigatorio: boolean;
  concluido: boolean;
  responsavelNome?: string;
  concluidoEm?: string;
  evidenciaTexto?: string;
}

export class ChecklistItem {
  private readonly id: string;
  private readonly processoId: string;
  private readonly etapaNumero: number;
  private readonly descricao: string;
  private readonly obrigatorio: boolean;
  private concluido: boolean;
  private responsavelNome?: string;
  private concluidoEm?: string;
  private evidenciaTexto?: string;

  constructor(props: ChecklistItemProps) {
    this.id = props.id;
    this.processoId = props.processoId;
    this.etapaNumero = props.etapaNumero;
    this.descricao = props.descricao;
    this.obrigatorio = props.obrigatorio;
    this.concluido = props.concluido ?? false;
    this.responsavelNome = props.responsavelNome;
    this.concluidoEm = props.concluidoEm;
    this.evidenciaTexto = props.evidenciaTexto;
  }

  public getId(): string { return this.id; }
  public getDescricao(): string { return this.descricao; }
  public isObrigatorio(): boolean { return this.obrigatorio; }
  public isConcluido(): boolean { return this.concluido; }
  public getEvidencia(): string | undefined { return this.evidenciaTexto; }

  // Regra de Negócio 3: Item obrigatório exige evidência com quem e quando
  public marcarConcluido(responsavel: string, evidencia?: string, data: string = '02/10'): void {
    if (this.obrigatorio && (!evidencia || !evidencia.trim())) {
      throw new Error(`O item obrigatório "${this.descricao}" exige comprovação por evidência (número de protocolo, link ou referência de anexo).`);
    }
    this.concluido = true;
    this.responsavelNome = responsavel;
    this.concluidoEm = data;
    this.evidenciaTexto = evidencia ? evidencia.trim() : '';
  }

  public desmarcar(): void {
    this.concluido = false;
    this.responsavelNome = undefined;
    this.concluidoEm = undefined;
    this.evidenciaTexto = undefined;
  }

  public toJSON(): ChecklistItemProps {
    return {
      id: this.id,
      processoId: this.processoId,
      etapaNumero: this.etapaNumero,
      descricao: this.descricao,
      obrigatorio: this.obrigatorio,
      concluido: this.concluido,
      responsavelNome: this.responsavelNome,
      concluidoEm: this.concluidoEm,
      evidenciaTexto: this.evidenciaTexto
    };
  }
}
