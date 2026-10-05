export class CNPJ {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value === '—') {
      this.value = '—';
      return;
    }
    const clean = value.replace(/\D/g, '');
    if (clean.length === 14 && CNPJ.isValid(clean)) {
      this.value = CNPJ.format(clean);
    } else {
      this.value = value.trim();
    }
  }

  public getValue(): string {
    return this.value;
  }

  public getDigits(): string {
    return this.value.replace(/\D/g, '');
  }

  public isEmAbertura(): boolean {
    return this.value === '—' || this.value.toLowerCase().includes('abertura');
  }

  public static isValid(cnpj: string): boolean {
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(clean)) return false;

    let tamanho = clean.length - 2;
    let numeros = clean.substring(0, tamanho);
    const digitos = clean.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0), 10)) return false;

    tamanho = tamanho + 1;
    numeros = clean.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1), 10);
  }

  public static format(cnpj: string): string {
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) return cnpj;
    return clean.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  }
}
