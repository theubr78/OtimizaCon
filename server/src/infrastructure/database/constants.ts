export const DTE_CAIXAS = [
  { cli: 'Atlântico Distribuidora', cx: 'e-CAC — Receita', code: 6, done: true, by: 'Ana Ribeiro', at: '08:12', per: '25/09 a 02/10' },
  { cli: 'Atlântico Distribuidora', cx: 'DT-e Bahia — matriz', code: 14, done: true, by: 'Ana Ribeiro', at: '08:20', per: '25/09 a 02/10' },
  { cli: 'Atlântico Distribuidora', cx: 'DT-e Bahia — filial Camaçari', code: 14, done: true, by: 'Ana Ribeiro', at: '08:24', per: '25/09 a 02/10' },
  { cli: 'Atlântico Distribuidora', cx: 'DTE Camaçari — filial', code: 34, done: false, by: '', at: '', per: '' },
  { cli: 'Spazio Comércio', cx: 'e-CAC — Receita', code: 6, done: true, by: 'Ana Ribeiro', at: '08:31', per: '25/09 a 02/10' },
  { cli: 'Spazio Comércio', cx: 'DT-e Bahia', code: 14, done: true, by: 'Ana Ribeiro', at: '08:35', per: '25/09 a 02/10' },
  { cli: 'Spazio Comércio', cx: 'DTE-SN', code: 11, done: true, by: 'Ana Ribeiro', at: '08:38', per: '25/09 a 02/10' },
  { cli: 'Techsale Comércio', cx: 'e-CAC — Receita', code: 6, done: true, by: 'Ana Ribeiro', at: '08:44', per: '25/09 a 02/10' },
  { cli: 'Techsale Comércio', cx: 'Regularize — PGFN', code: 9, done: false, by: '', at: '', per: '' },
  { cli: 'Techsale Comércio', cx: 'DTE-SN', code: 11, done: true, by: 'Ana Ribeiro', at: '08:50', per: '25/09 a 02/10' },
  { cli: 'Gesso Forte', cx: 'DTE-SN', code: 11, done: true, by: 'Ana Ribeiro', at: '08:55', per: '25/09 a 02/10' },
  { cli: 'V25 Serviços', cx: 'DTE Camaçari', code: 34, done: false, by: '', at: '', per: '' },
  { cli: 'V25 Serviços', cx: 'DTE-SN', code: 11, done: true, by: 'Ana Ribeiro', at: '09:02', per: '25/09 a 02/10' },
  { cli: 'Loyola Fonoaudiologia', cx: 'e-CAC — Receita', code: 6, done: true, by: 'Ana Ribeiro', at: '09:06', per: '25/09 a 02/10' }
];

export const DTE_MSGS = [
  { org: 'DT-e Bahia', cli: 'Atlântico Distribuidora', estab: 'Filial Camaçari', num: '2026/884512', ass: 'Intimação para apresentação de livros fiscais', disp: '01/10/2026', cien: '02/10/2026', lit: '10 dias', regra: 'Dias corridos a partir da ciência', venc: '12/10/2026', cls: 'Exigência', code: '30', proc: null },
  { org: 'DTE-SN', cli: 'Gesso Forte', estab: 'Matriz', num: 'TE 2026/000731', ass: 'Termo de exclusão do Simples Nacional por débitos', disp: '30/09/2026', cien: 'Não lida', lit: '30 dias', regra: 'Da ciência; leitura gera ciência', venc: 'A calcular na ciência', cls: 'Exclusão', code: '35', proc: null },
  { org: 'e-CAC', cli: 'Techsale Comércio', estab: 'Matriz', num: 'Caixa Postal 9.104.233', ass: 'Comunicado de pendência — DCTFWeb 07/2026', disp: '01/10/2026', cien: '01/10/2026', lit: '30 dias', regra: 'Dias corridos a partir da ciência', venc: '31/10/2026', cls: 'Cobrança', code: '17', proc: 'P-108' },
  { org: 'DT-e Bahia', cli: 'Spazio Comércio', estab: 'Matriz', num: '2026/871033', ass: 'Comunicado de malha — energia adquirida no mercado livre', disp: '26/09/2026', cien: '26/09/2026', lit: '30 dias da ciência', regra: 'Dias corridos a partir da ciência', venc: '26/10/2026', cls: 'Malha', code: '29', proc: 'P-114' }
];

export const VENCIMENTOS = [
  { tipo: 'Certificado digital', cli: 'Gesso Forte', item: 'e-CNPJ A1', det: 'Instalado em Domínio, Onvio e Jettax', venc: '12/10', lead: 30, code: '10' },
  { tipo: 'Certificado digital', cli: 'Spazio Comércio', item: 'e-CNPJ A1', det: 'Instalado em Domínio, Onvio e SIEG/NFStock', venc: '14/10', lead: 30, code: '10' },
  { tipo: 'Certificado digital', cli: 'Loyola Fonoaudiologia', item: 'e-CPF A3 — Graziela Loyola', det: 'Instalado em Onvio', venc: '16/10', lead: 30, code: '10' },
  { tipo: 'Certificado digital', cli: 'Techsale Comércio', item: 'e-CNPJ A1', det: 'Domínio, Onvio, Jettax · renovação em P-115', venc: '20/10', lead: 30, code: '10', proc: 'P-115' },
  { tipo: 'Procuração', cli: 'Techsale Comércio', item: 'Procuração Receita (e-CAC)', det: 'Outorgado: Officecon', venc: '21/10', lead: 20, code: '11' },
  { tipo: 'Alvará/licença', cli: 'Atlântico Distribuidora', item: 'Alvará de funcionamento — filial Camaçari', det: '12.345.678/0002-71', venc: '31/10', lead: 45, code: '12' },
  { tipo: 'Alvará/licença', cli: 'Escola Encontro Infantil', item: 'Licença sanitária', det: 'Vigilância Salvador', venc: '05/11', lead: 45, code: '14' },
  { tipo: 'Procuração', cli: 'Spazio Comércio', item: 'Habilitação SEFAZ-BA', det: 'Contador vinculado', venc: '09/11', lead: 20, code: '11' },
  { tipo: 'Mandato', cli: 'Instituto Semear', item: 'Mandato da diretoria', det: 'Eleição em assembleia', venc: '15/11', lead: 45, code: '09' },
  { tipo: 'Alvará/licença', cli: 'Atlântico Distribuidora', item: 'Licença de publicidade — matriz', det: 'Fachada, 4,2 m²', venc: '18/11', lead: 45, code: '13' },
  { tipo: 'Alvará/licença', cli: 'Loyola Fonoaudiologia', item: 'Licença sanitária', det: 'Vigilância Salvador', venc: '25/11', lead: 45, code: '14' },
  { tipo: 'Certificado digital', cli: 'Atlântico Distribuidora', item: 'e-CNPJ A1', det: 'Domínio, Onvio, Jettax', venc: '28/11', lead: 30, code: '10' },
  { tipo: 'Regime especial', cli: 'Atlântico Distribuidora', item: 'Acordo atacadista (Decreto 7.799/2000)', det: 'Vigência até 30/11/2026', venc: '30/11', lead: 60, code: '32' },
  { tipo: 'Mandato', cli: 'Missão Pescadores', item: 'Mandato da diretoria', det: 'Ata registrada no RCPJ', venc: '01/12', lead: 45, code: '09' }
];

export const CATEGORIAS_PROCEDIMENTOS: Record<string, string> = {
  A: 'Entrada, cadastro e implantação',
  B: 'Registro empresarial',
  C: 'Acessos, certificados e sistemas',
  D: 'Alvarás e licenças',
  E: 'Situação fiscal, certidões e cobranças',
  F: 'Parcelamentos',
  G: 'Comunicações e processos administrativos',
  H: 'Notas fiscais e regime',
  I: 'Outros'
};

export const CATALOGO_PROCEDIMENTOS = [
  { cat: 'A', code: '01', titulo: 'Receber demanda, abrir tarefa e cadastrar cliente' },
  { cat: 'A', code: '02', titulo: 'Analisar viabilidade, atividade e endereço' },
  { cat: 'B', code: '03', titulo: 'Abrir empresa: matriz' },
  { cat: 'B', code: '04', titulo: 'Abrir filial' },
  { cat: 'B', code: '05', titulo: 'Alterar empresa, transformar ou corrigir cadastro' },
  { cat: 'B', code: '06', titulo: 'MEI: formalizar, alterar, baixar e desenquadrar' },
  { cat: 'B', code: '07', titulo: 'Baixar empresa ou filial' },
  { cat: 'B', code: '08', titulo: 'Regularizar IM, IE e situação cadastral' },
  { cat: 'B', code: '09', titulo: 'Cartório, associações e outros registros' },
  { cat: 'C', code: '10', titulo: 'Emitir, renovar e controlar certificado digital' },
  { cat: 'C', code: '11', titulo: 'Cadastrar procurações e recuperar acessos' },
  { cat: 'C', code: '38', titulo: 'Implantar aplicativo Acessórias e contato do cliente' },
  { cat: 'C', code: '39', titulo: 'Vincular contador e obter acesso estadual SEFAZ' },
  { cat: 'C', code: '41', titulo: 'Abrir atendimento na Receita e encaminhar ao setor' },
  { cat: 'C', code: '42', titulo: 'Localizar faturamento e recuperar pastas internas' },
  { cat: 'D', code: '12', titulo: 'Alvará de funcionamento: obter e renovar' },
  { cat: 'D', code: '13', titulo: 'Alvará/licença de publicidade' },
  { cat: 'D', code: '14', titulo: 'Licenciamento sanitário de estabelecimento e veículos' },
  { cat: 'D', code: '15', titulo: 'Bombeiros e licença ambiental' },
  { cat: 'D', code: '16', titulo: 'Conselhos profissionais: CORE e demais' },
  { cat: 'E', code: '17', titulo: 'Consultar situação fiscal: federal, estadual e municipal' },
  { cat: 'E', code: '18', titulo: 'Emitir certidões e comprovar regularidade' },
  { cat: 'E', code: '19', titulo: 'Consultar CADIN e acompanhar regularização' },
  { cat: 'E', code: '20', titulo: 'TFF, taxas municipais, ISS e pendências de IPTU' },
  { cat: 'E', code: '21', titulo: 'Isenção, imunidade e restituição de ISS/TFF' },
  { cat: 'F', code: '22', titulo: 'Parcelamento federal na Receita e Simples Nacional' },
  { cat: 'F', code: '23', titulo: 'PGFN: parcelamento, transação e guias de dívida ativa' },
  { cat: 'F', code: '24', titulo: 'Parcelamento estadual Bahia e dívida ativa estadual' },
  { cat: 'F', code: '25', titulo: 'Parcelamento municipal e REFIS' },
  { cat: 'F', code: '26', titulo: 'Emitir e conferir todas as guias mensais de parcelamentos' },
  { cat: 'F', code: '43', titulo: 'Guias federais: simplificado, PERT-SN, RELP e previdenciário' },
  { cat: 'G', code: '27', titulo: 'DTE: consultar comunicações e controlar prazos' },
  { cat: 'G', code: '28', titulo: 'PAF estadual: localizar processo novo e acompanhar' },
  { cat: 'G', code: '29', titulo: 'Malha fiscal e comunicado de energia no Mercado Livre' },
  { cat: 'G', code: '30', titulo: 'Protocolar requerimento, cumprir exigência e apoiar defesa' },
  { cat: 'G', code: '31', titulo: 'Regime especial: conceder, alterar e renovar' },
  { cat: 'G', code: '32', titulo: 'Acordo atacadista e demanda REDAE' },
  { cat: 'H', code: '33', titulo: 'NFS-e: cadastro, senha, credenciamento e bloqueios' },
  { cat: 'H', code: '34', titulo: 'Cancelar ou substituir nota fiscal' },
  { cat: 'H', code: '35', titulo: 'Simples Nacional: opção, exclusão e apoio ao Fiscal' },
  { cat: 'I', code: '36', titulo: 'DETRAN: CRLV e indicação de principal condutor' },
  { cat: 'I', code: '37', titulo: 'Interrupção temporária e apoio documental aos setores' },
  { cat: 'I', code: '40', titulo: 'Certidão TJBA de falência e recuperação' }
];

export const PORTAIS_LISTA = [
  { c: '01', org: 'JUCEB', n: 'Guias por ato e natureza jurídica', esf: 'Estadual', mun: 'Bahia', url: 'https://www.ba.gov.br/juceb/passo-passo' },
  { c: '02', org: 'JUCEB', n: 'Requerimento Universal / REGIN', esf: 'Estadual', mun: 'Bahia', url: 'https://regin.juceb.ba.gov.br/RequerimentoUniversal/NovoLogin.aspx' },
  { c: '03', org: 'REDESIM', n: 'Serviços e acompanhamento de CNPJ', esf: 'Federal', mun: '—', url: 'https://www.gov.br/empresas-e-negocios/pt-br/redesim' },
  { c: '04', org: 'Receita', n: 'MAT — Módulo de Administração Tributária', esf: 'Federal', mun: '—', url: 'https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-tributario' },
  { c: '05', org: 'Receita', n: 'Portal de Serviços', esf: 'Federal', mun: '—', url: 'https://servicos.receitafederal.gov.br/' },
  { c: '06', org: 'Receita', n: 'e-CAC', esf: 'Federal', mun: '—', url: 'https://servicos.receita.fazenda.gov.br/servicos/servicos-ecac/default.aspx' },
  { c: '09', org: 'PGFN', n: 'Regularize', esf: 'Federal', mun: '—', url: 'https://www.regularize.pgfn.gov.br/' },
  { c: '11', org: 'Simples Nacional', n: 'Opções, DTE-SN, parcelamento', esf: 'Federal', mun: '—', url: 'https://www8.receita.fazenda.gov.br/SimplesNacional/' },
  { c: '14', org: 'SEFAZ-BA', n: 'Inspetoria Eletrônica ICMS', esf: 'Estadual', mun: 'Bahia', url: 'https://www.sefaz.ba.gov.br/inspetoria-eletronica/icms/' },
  { c: '21', org: 'SEFAZ Salvador', n: 'Portal de serviços', esf: 'Municipal', mun: 'Salvador', url: 'https://www2.sefaz.salvador.ba.gov.br/' },
  { c: '28', org: 'SEFAZ Salvador', n: 'NFS-e Salvador', esf: 'Municipal', mun: 'Salvador', url: 'https://nfse.salvador.ba.gov.br/default.aspx' },
  { c: '31', org: 'SEFAZ Camaçari', n: 'Serviços tributários', esf: 'Municipal', mun: 'Camaçari', url: 'https://sefaz.camacari.ba.gov.br/servicos/' },
  { c: '35', org: 'SEFAZ Lauro de Freitas', n: 'SEFAZ municipal', esf: 'Municipal', mun: 'Lauro de Freitas', url: 'https://sefaz.laurodefreitas.ba.gov.br/' },
  { c: '56', org: 'Acessórias', n: 'Acessórias', esf: 'Interno', mun: '—', url: 'https://app.acessorias.com/' }
];
