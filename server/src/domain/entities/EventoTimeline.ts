export type TipoEvento =
  | 'Nota'
  | 'Contato com cliente'
  | 'Protocolo'
  | 'Exigência'
  | 'Decisão'
  | 'Pagamento'
  | 'Mudança de situação';

export type TipoProva = 'fato' | 'relato' | 'auto';

export interface EventoTimelineProps {
  id?: string;
  processoId: string;
  data: string; // DD/MM/AAAA
  hora: string; // HH:MM
  autor: string;
  tipo: TipoEvento;
  descricao: string;
  prova: TipoProva;
}

export class EventoTimeline {
  private readonly id?: string;
  private readonly processoId: string;
  private readonly data: string;
  private readonly hora: string;
  private readonly autor: string;
  private readonly tipo: TipoEvento;
  private readonly descricao: string;
  private readonly prova: TipoProva;

  constructor(props: EventoTimelineProps) {
    if (!props.descricao.trim()) {
      throw new Error('A descrição do evento na linha do tempo é obrigatória.');
    }
    this.id = props.id;
    this.processoId = props.processoId;
    this.data = props.data || '02/10/2026';
    this.hora = props.hora || '12:00';
    this.autor = props.autor || 'Matheus Silva';
    this.tipo = props.tipo || 'Nota';
    this.descricao = props.descricao.trim();
    this.prova = props.prova || 'relato';
  }

  public getDescricao(): string { return this.descricao; }
  public getTipo(): TipoEvento { return this.tipo; }
  public getProva(): TipoProva { return this.prova; }
  public isFatoComprovado(): boolean { return this.prova === 'fato'; }

  public toJSON(): EventoTimelineProps {
    return {
      id: this.id,
      processoId: this.processoId,
      data: this.data,
      hora: this.hora,
      autor: this.autor,
      tipo: this.tipo,
      descricao: this.descricao,
      prova: this.prova
    };
  }
}
