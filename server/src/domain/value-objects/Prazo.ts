export interface PrazoChip {
  show: boolean;
  dias: number;
  label: string;
  corTexto: string;
  corFundo: string;
  corBorda: string;
}

export class Prazo {
  private readonly dataStr: string; // formato DD/MM/AAAA ou DD/MM
  private readonly dataObj: Date | null;

  constructor(dataStr: string) {
    this.dataStr = (dataStr || '').trim();
    this.dataObj = Prazo.parseDate(this.dataStr);
  }

  public getDataStr(): string {
    return this.dataStr;
  }

  public hasData(): boolean {
    return this.dataObj !== null;
  }

  public getDiasRestantes(dataReferencia: Date = new Date(2026, 9, 2)): number {
    if (!this.dataObj) return 999;
    const diffMs = this.dataObj.getTime() - dataReferencia.getTime();
    return Math.round(diffMs / (1000 * 60 * 60 * 24));
  }

  public isVencido(dataReferencia?: Date): boolean {
    return this.getDiasRestantes(dataReferencia) < 0;
  }

  public getChip(prefixo: string = '', dataReferencia?: Date): PrazoChip {
    if (!this.dataStr || !this.dataObj) {
      return { show: false, dias: 999, label: '', corTexto: '', corFundo: '', corBorda: '' };
    }
    const d = this.getDiasRestantes(dataReferencia);
    const p = prefixo ? `${prefixo} ` : '';

    if (d < 0) {
      return { show: true, dias: d, label: `${p}${this.dataStr} · vencido`, corTexto: '#FF6B6B', corFundo: '#3A1414', corBorda: '#6B2222' };
    }
    if (d === 0) {
      return { show: true, dias: d, label: `${p}${this.dataStr} · hoje`, corTexto: '#F5A05A', corFundo: '#3A2410', corBorda: '#6B4520' };
    }
    if (d <= 3) {
      return { show: true, dias: d, label: `${p}${this.dataStr} · em ${d} ${d === 1 ? 'dia' : 'dias'}`, corTexto: '#F5A05A', corFundo: '#3A2410', corBorda: '#6B4520' };
    }
    return { show: true, dias: d, label: `${p}${this.dataStr}`, corTexto: '#D4D4D8', corFundo: '#1A1A1D', corBorda: '#2E2E33' };
  }

  public static parseDate(s: string): Date | null {
    if (!s) return null;
    const partes = s.split('/');
    if (partes.length < 2) return null;
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1;
    const ano = partes.length >= 3 ? parseInt(partes[2], 10) : 2026;
    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) return null;
    return new Date(ano, mes, dia);
  }
}
