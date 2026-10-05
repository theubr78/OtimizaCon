import { CNPJ } from '../value-objects/CNPJ';

export interface ClienteProps {
  id: string;
  razaoSocial: string;
  nomeCurto: string;
  cnpj: string;
  municipio: string;
  contatoPrincipal: string;
  estabelecimentosQtd: number;
}

export class Cliente {
  private readonly id: string;
  private razaoSocial: string;
  private nomeCurto: string;
  private cnpj: CNPJ;
  private municipio: string;
  private contatoPrincipal: string;
  private estabelecimentosQtd: number;

  constructor(props: ClienteProps) {
    this.id = props.id;
    this.razaoSocial = props.razaoSocial;
    this.nomeCurto = props.nomeCurto || props.razaoSocial;
    this.cnpj = new CNPJ(props.cnpj);
    this.municipio = props.municipio || 'Salvador';
    this.contatoPrincipal = props.contatoPrincipal || 'Contato principal';
    this.estabelecimentosQtd = props.estabelecimentosQtd ?? 1;
  }

  public getId(): string { return this.id; }
  public getRazaoSocial(): string { return this.razaoSocial; }
  public getNomeCurto(): string { return this.nomeCurto; }
  public getCNPJ(): CNPJ { return this.cnpj; }
  public getMunicipio(): string { return this.municipio; }
  public getContatoPrincipal(): string { return this.contatoPrincipal; }
  public getEstabelecimentosQtd(): number { return this.estabelecimentosQtd; }

  public atualizarContato(novoContato: string): void {
    if (!novoContato.trim()) throw new Error('Contato não pode ser vazio');
    this.contatoPrincipal = novoContato.trim();
  }

  public toJSON(): ClienteProps {
    return {
      id: this.id,
      razaoSocial: this.razaoSocial,
      nomeCurto: this.nomeCurto,
      cnpj: this.cnpj.getValue(),
      municipio: this.municipio,
      contatoPrincipal: this.contatoPrincipal,
      estabelecimentosQtd: this.estabelecimentosQtd
    };
  }
}
