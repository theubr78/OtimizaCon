class Component extends DCLogic {
  SIT = {
    nao: { l: 'Não iniciado', fg: '#C4C4CC', bg: '#26262A', dot: '#6B6B73' },
    and: { l: 'Em andamento', fg: '#7DB2F0', bg: '#172A42', dot: '#2F6FC0' },
    cli: { l: 'Aguardando cliente', fg: '#F2B25C', bg: '#3A2A10', dot: '#D98A0B' },
    org: { l: 'Aguardando órgão', fg: '#B79CF5', bg: '#2A1F45', dot: '#7C4DDB' },
    set: { l: 'Aguardando setor', fg: '#6FD3E6', bg: '#0F3238', dot: '#1395B0' },
    conc: { l: 'Concluído', fg: '#6FD69B', bg: '#13301F', dot: '#2E9E5B' },
    canc: { l: 'Cancelado', fg: '#8E8E96', bg: '#232327', dot: '#6B6B73' }
  };
  PEOPLE = { Matheus: ['Matheus Silva', 'MS', 'Procuradoria'], Ana: ['Ana Ribeiro', 'AR', 'Procuradoria'], Carla: ['Carla Menezes', 'CM', 'Fiscal'], Rafael: ['Rafael Souza', 'RS', 'Contábil'], Juliana: ['Juliana Costa', 'JC', 'Pessoal'], Paulo: ['Paulo Lima', 'PL', 'Liderança'] };
  CATS = { A: 'Entrada, cadastro e implantação', B: 'Registro empresarial', C: 'Acessos, certificados e sistemas', D: 'Alvarás e licenças', E: 'Situação fiscal, certidões e cobranças', F: 'Parcelamentos', G: 'Comunicações e processos administrativos', H: 'Notas fiscais e regime', I: 'Outros' };
  CATALOG = `A|01|Receber demanda, abrir tarefa e cadastrar cliente
A|02|Analisar viabilidade, atividade e endereço
B|03|Abrir empresa: matriz
B|04|Abrir filial
B|05|Alterar empresa, transformar ou corrigir cadastro
B|06|MEI: formalizar, alterar, baixar e desenquadrar
B|07|Baixar empresa ou filial
B|08|Regularizar IM, IE e situação cadastral
B|09|Cartório, associações e outros registros
C|10|Emitir, renovar e controlar certificado digital
C|11|Cadastrar procurações e recuperar acessos
C|38|Implantar aplicativo Acessórias e contato do cliente
C|39|Vincular contador e obter acesso estadual SEFAZ
C|41|Abrir atendimento na Receita e encaminhar ao setor
C|42|Localizar faturamento e recuperar pastas internas
D|12|Alvará de funcionamento: obter e renovar
D|13|Alvará/licença de publicidade
D|14|Licenciamento sanitário de estabelecimento e veículos
D|15|Bombeiros e licença ambiental
D|16|Conselhos profissionais: CORE e demais
E|17|Consultar situação fiscal: federal, estadual e municipal
E|18|Emitir certidões e comprovar regularidade
E|19|Consultar CADIN e acompanhar regularização
E|20|TFF, taxas municipais, ISS e pendências de IPTU
E|21|Isenção, imunidade e restituição de ISS/TFF
F|22|Parcelamento federal na Receita e Simples Nacional
F|23|PGFN: parcelamento, transação e guias de dívida ativa
F|24|Parcelamento estadual Bahia e dívida ativa estadual
F|25|Parcelamento municipal e REFIS
F|26|Emitir e conferir todas as guias mensais de parcelamentos
F|43|Guias federais: simplificado, PERT-SN, RELP e previdenciário
G|27|DTE: consultar comunicações e controlar prazos
G|28|PAF estadual: localizar processo novo e acompanhar
G|29|Malha fiscal e comunicado de energia no Mercado Livre
G|30|Protocolar requerimento, cumprir exigência e apoiar defesa
G|31|Regime especial: conceder, alterar e renovar
G|32|Acordo atacadista e demanda REDAE
H|33|NFS-e: cadastro, senha, credenciamento e bloqueios
H|34|Cancelar ou substituir nota fiscal
H|35|Simples Nacional: opção, exclusão e apoio ao Fiscal
I|36|DETRAN: CRLV e indicação de principal condutor
I|37|Interrupção temporária e apoio documental aos setores
I|40|Certidão TJBA de falência e recuperação`.split('\n').map(l => { const a = l.split('|'); return { cat: a[0], c: a[1], n: a[2] }; });
  PORTAIS = `01|JUCEB|Guias por ato e natureza jurídica|Estadual|Bahia|https://www.ba.gov.br/juceb/passo-passo
02|JUCEB|Requerimento Universal / REGIN|Estadual|Bahia|https://regin.juceb.ba.gov.br/RequerimentoUniversal/NovoLogin.aspx
03|REDESIM|Serviços e acompanhamento de CNPJ|Federal|—|https://www.gov.br/empresas-e-negocios/pt-br/redesim
04|Receita|MAT — Módulo de Administração Tributária|Federal|—|https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/cnpj-tributario
05|Receita|Portal de Serviços|Federal|—|https://servicos.receitafederal.gov.br/
06|Receita|e-CAC|Federal|—|https://servicos.receita.fazenda.gov.br/servicos/servicos-ecac/default.aspx
07|Receita|Dívidas e pendências fiscais|Federal|—|https://www.gov.br/pt-br/servicos/consultar-dividas-e-pendencias-fiscais
08|Receita|Certidões federais|Federal|—|https://servicos.receita.fazenda.gov.br/Servicos/certidao/
09|PGFN|Regularize|Federal|—|https://www.regularize.pgfn.gov.br/
10|PGFN|SISPAR (guia de parcela)|Federal|—|https://sisparnet.pgfn.fazenda.gov.br/sisparInternet/internet/darf/consultaParcelamentoDarfInternet.xhtml
11|Simples Nacional|Opções, DTE-SN, parcelamento|Federal|—|https://www8.receita.fazenda.gov.br/SimplesNacional/
12|MEI|Portal do Empreendedor|Federal|—|https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei
13|MEI|Desenquadramento|Federal|—|https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/servicos-para-mei/quero-crescer-desenquadramento
14|SEFAZ-BA|Inspetoria Eletrônica ICMS|Estadual|Bahia|https://www.sefaz.ba.gov.br/inspetoria-eletronica/icms/
15|SEFAZ-BA|Certidão de débitos|Estadual|Bahia|https://servicos.sefaz.ba.gov.br/sistemas/DSCRE/Modulos/Publico/EmissaoCertidao.aspx
16|SEFAZ-BA|Consulta pública por PAF|Estadual|Bahia|https://servicos.sefaz.ba.gov.br/sistemas/DSCRE/Modulos/Publico/ConsultaDebitos.aspx
17|SEFAZ-BA|Dívida ativa|Estadual|Bahia|https://servicos.sefaz.ba.gov.br/sistemas/DSCRE/Modulos/Publico/DividaAtiva.aspx
18|Bahia|Regime especial (serviço 1554)|Estadual|Bahia|https://servicos.ba.gov.br/detalhe/servico/1554
19|SEFAZ-BA|Decreto 7.799/2000 (acordo atacadista)|Estadual|Bahia|https://mbusca.sefaz.ba.gov.br/DITRI/normas_complementares/decretos/decreto_2000_7799.pdf
20|Bahia|SEI|Estadual|Bahia|https://www.portalseibahia.saeb.ba.gov.br/sei-bahia
21|SEFAZ Salvador|Portal de serviços|Municipal|Salvador|https://www2.sefaz.salvador.ba.gov.br/
22|SEFAZ Salvador|Certidões e relatório de pendências|Municipal|Salvador|https://www2.sefaz.salvador.ba.gov.br/index.php/servico/certidoes
23|SEFAZ Salvador|Emissão de alvará|Municipal|Salvador|https://www2.sefaz.salvador.ba.gov.br/servico/emissao-alvara
24|SEDUR|TVL / publicidade|Municipal|Salvador|https://servicos.sedur.salvador.ba.gov.br/
25|SEDUR|Carta de serviços de publicidade|Municipal|Salvador|https://servicos.sedur.salvador.ba.gov.br/carta-servicos/16
26|Saúde Salvador|Licenciamento sanitário|Municipal|Salvador|https://saude.salvador.ba.gov.br/licenciamento-sanitario/
27|SEFAZ Salvador|FAS — atendimento e processos|Municipal|Salvador|https://fas.sefaz.salvador.ba.gov.br/
28|SEFAZ Salvador|NFS-e Salvador|Municipal|Salvador|https://nfse.salvador.ba.gov.br/default.aspx
29|SEFAZ Salvador|CADIN municipal|Municipal|Salvador|https://cadin.sefaz.salvador.ba.gov.br/CADIN/Default.aspx
30|SEFAZ Salvador|Restituição de ISS PJ|Municipal|Salvador|https://www2.sefaz.salvador.ba.gov.br/servicos/carta-de-servicos/restituicao-de-importancia-iss-pessoa-juridica
31|SEFAZ Camaçari|Serviços tributários|Municipal|Camaçari|https://sefaz.camacari.ba.gov.br/servicos/
32|SEFAZ Camaçari|Manuais do sistema tributário|Municipal|Camaçari|https://sefaz.camacari.ba.gov.br/central-de-conteudo/passo-a-passo-do-sistema-tributario/
33|SEFAZ Camaçari|Processos administrativos|Municipal|Camaçari|https://sefaz.camacari.ba.gov.br/processos/
34|SEFAZ Camaçari|DTE|Municipal|Camaçari|https://sefaz.camacari.ba.gov.br/dte/
35|SEFAZ Lauro de Freitas|SEFAZ municipal|Municipal|Lauro de Freitas|https://sefaz.laurodefreitas.ba.gov.br/
36|Lauro de Freitas|SolosWeb|Municipal|Lauro de Freitas|https://solosweb.laurodefreitas.ba.gov.br/
37|Lauro de Freitas|Cancelamento de NFS-e|Municipal|Lauro de Freitas|https://solosweb.laurodefreitas.ba.gov.br/servico.jsf?servico=1302
38|ITI|Certificação digital — orientações|Federal|—|https://www.gov.br/iti/pt-br/acesso-a-informacao/perguntas-frequentes/certificacao-digital
39|ITI|Meu Certificado|Federal|—|https://meucertificado.iti.gov.br/
40|ITI|VALIDAR|Federal|—|https://validar.iti.gov.br/
41|CORE-BA|Registro de pessoa jurídica|Conselho|Bahia|https://corebahia.org.br/registro-pessoa-juridica-ltda-unipessoal-e-s-a/
42|RTD Brasil|Registro de títulos e documentos|Conselho|—|https://www.rtdbrasil.org.br/
43|CBMBA|Regularização de edificações|Estadual|Bahia|https://www.ba.gov.br/bombeiros/procedimentos-para-regularizacao-das-edificacoes-pt-e-pts
44|CBMBA|Processo e autenticidade|Estadual|Bahia|https://www.ba.gov.br/bombeiros/consultar-processo-e-autenticidade
45|INEMA|Licenciamento / SEIA|Estadual|Bahia|https://www.inema.ba.gov.br/
46|DETRAN-BA|CRLV eletrônico|Estadual|Bahia|https://www.ba.gov.br/detran/novo-crlv-eletronico
47|SENATRAN|Principal condutor|Federal|—|https://www.gov.br/pt-br/servicos/indicar-online-o-principal-condutor-de-um-veiculo
48|PGFN|CADIN|Federal|—|https://cadin.pgfn.gov.br/
49|CREA-BA|Registro de empresas|Conselho|Bahia|https://www.creaba.org.br/registro-de-empresas/
50|CRM-BA|Inscrição de pessoa jurídica|Conselho|Bahia|https://crmvirtual.cfm.org.br/BA/servico/inscricao-de-pessoa-juridica-cadastro-ou-registro
51|Domínio/Onvio|Suporte|Interno|—|https://suporte.dominioatendimento.com/
52|Jettax|Jettax 360|Interno|—|https://admin.jettax360.com.br/
53|Jettax|Central de ajuda|Interno|—|https://jettax360-help.freshdesk.com/support/solutions
54|Receita|Receita Atende|Federal|—|https://servicos.receitafederal.gov.br/servico/receita-atende/navegacao
55|TJBA|Certidões de primeiro grau|Estadual|Bahia|https://portalcertidoes.tjba.jus.br/#/primeirograu
56|Acessórias|Acessórias|Interno|—|https://app.acessorias.com/
57|Acessórias|Guias do app|Interno|—|https://conteudos.acessorias.com/kit-app
58|Domínio|Código de acesso Simples|Interno|—|https://suporte.dominioatendimento.com/central/faces/solucao.html?codigo=86
59|Onvio|Gerenciador de certificados|Interno|—|https://suporte.dominioatendimento.com/central/faces/solucao.html?codigo=12783
60|SEFAZ Camaçari|STM — Sistema Tributário Municipal|Municipal|Camaçari|https://sefazweb.camacari.ba.gov.br/prefeituras/login.tela
61|Receita|PERT-SN|Federal|—|https://www.gov.br/pt-br/servicos/acompanhar-pert-sn
62|SEFAZ-BA|Credenciamento contribuinte/contador|Estadual|Bahia|https://efisc.sefaz.ba.gov.br/credenciamento/jsp/credenciamento/solicitarSenha.jsf`.split('\n').map(l => { const a = l.split('|'); return { c: a[0], org: a[1], n: a[2], esf: a[3], mun: a[4], url: a[5] }; });
  SITES = { '01': [51, 52, 56], '02': [1, 2, 3, 24], '03': [1, 2, 3, 4], '04': [1, 2, 3, 4, 14], '05': [1, 2, 3, 5], '06': [11, 12, 13, 1], '07': [1, 2, 3, 14, 21], '08': [3, 14, 21, 31, 35], '09': [3, 5, 42], '10': [38, 39, 40, 51, 59], '11': [5, 6, 9, 14, 21, 31, 35], '12': [21, 23, 24, 31, 60, 35, 36], '13': [24, 25, 31, 35, 36], '14': [26, 31, 35, 36], '15': [43, 44, 45, 24], '16': [41, 49, 50], '17': [5, 7, 9, 14, 21, 22, 31, 35], '18': [8, 15, 22, 31, 35], '19': [48, 29, 5, 9], '20': [21, 27, 31, 35, 36], '21': [21, 27, 30, 31, 35], '22': [5, 6, 11], '23': [9, 10], '24': [14, 16, 17], '25': [21, 27, 33, 31, 35, 36], '26': [52, 53, 6, 11, 9, 10, 14, 21, 31, 35], '27': [6, 11, 9, 14, 34], '28': [14, 16, 17], '29': [5, 14], '30': [1, 5, 9, 14, 20, 27, 33, 36], '31': [14, 18], '32': [14, 18, 19], '33': [21, 28, 31, 32, 35, 36], '34': [28, 31, 33, 35, 36, 37, 14], '35': [3, 4, 5, 9, 11, 58], '36': [46, 47], '37': [3, 5, 14, 21, 51], '38': [56, 57], '39': [3, 14, 62], '40': [55], '41': [5, 6, 54], '42': [51], '43': [6, 11, 61] };
  ETAPAS = {
    '03': ['Solicitação e escopo', 'Viabilidade e DBE', 'Documentação', 'Assinaturas e protocolo', 'CNPJ e regularização', 'Conclusão'],
    '05': ['Levantamento antes/depois', 'Viabilidade', 'Validação Fiscal', 'Assinaturas e taxas', 'Registro JUCEB', 'Atualização de CNPJ e inscrições'],
    '07': ['Solicitação e levantamento', 'DBE e ato de encerramento', 'Conferência e assinaturas', 'Protocolo na Junta', 'Confirmar baixas', 'Atualizar sistemas'],
    '10': ['Validade e tipo', 'Orçamento e autorização', 'Documentos e agendamento', 'Emissão e teste', 'Instalar nos sistemas', 'Controle de vencimento'],
    '12': ['Consultar cadastro e alvará', 'Risco, TVL e licenças', 'Emitir pelo município', 'Levantar pendência', 'Emitir e cadastrar vencimento'],
    '17': ['Federal', 'Estadual', 'Municipal', 'Consolidar por órgão', 'Confrontar com comprovantes', 'Entregar diagnóstico'],
    '24': ['Identificar origem', 'Modalidade vigente', 'Entrada, parcelas e garantias', 'Simulação e aprovação', 'Adesão e DAE', 'Cadastrar no inventário'],
    '28': ['Ambiente autorizado', 'Registrar PAFs', 'Consulta pública', 'Comparar com lista anterior', 'Auto, ciência e prazo', 'Entregar lista'],
    '29': ['Autenticidade e ciência', 'Conferir CNPJ e período', 'Conciliação pelo Fiscal', 'Recolher ou justificar', 'Enviar justificativa', 'Acompanhar retorno'],
    '33': ['Município e emissor', 'IM, CNC e regime', 'Pedir senha/credenciamento', 'Diagnóstico de bloqueio', 'Validar perfil e testar', 'Entregar acesso'],
    '34': ['Confirmar modelo', 'Prazo e regras', 'Requerimento e declaração', 'Protocolo', 'Decisão e substituta', 'Comunicar Fiscal'],
    '04': ['Confirmar UF e órgão', 'Atividade e viabilidade', 'Ato e coleta REDESIM', 'Assinaturas e protocolo', 'CNPJ, IE, IM e licenças', 'Atualizar sistemas'],
    '31': ['Ler regime existente', 'Requerimento e fundamentação', 'Emitir e pagar TPS', 'Protocolo CPTWEB', 'Dossiê', 'Parecer e renovação'],
    '18': ['Identificar certidão', 'Emitir no portal', 'Conferir e classificar', 'Pendências', 'Pedido de liberação', 'Entregar e registrar validade'],
    '08': ['Consultar cadastros', 'Motivo oficial', 'Evento e requerimento', 'Protocolo e integração', 'Teste de emissão', 'Atualizar sistemas'],
    '11': ['Representação e escopo', 'Procuração Receita', 'PGFN, SEFAZ e município', 'Recuperação de acesso', 'Testar perfil', 'Registrar vencimento'],
    '13': ['Estabelecimento e equipamento', 'Modalidade', 'Requerimento e projeto', 'Guia e pagamento', 'Vistoria', 'Licença e renovação'],
    '14': ['Órgão e risco', 'Lista de documentos', 'Cadastro e documentos técnicos', 'Taxa e protocolo', 'Inspeção e exigências', 'Licença'],
    '30': ['Órgão, objeto e etapa', 'Canal obrigatório', 'Exigências e matriz', 'Representação e anexos', 'Protocolar', 'Acompanhar decisão'],
    '35': ['Elegibilidade', 'Constituição ou janela', 'Termo e prazo', 'Regularizar pendências', 'Contestação', 'Consulta Optantes'],
    '39': ['Confirmar contador', 'Vínculo atual', 'Evento REDESIM', 'Natureza jurídica', 'Credenciamento', 'Testar e comunicar']
  };
  DOCS = {
    '03': ['Viabilidade deferida', 'Documentos dos sócios e administrador', 'Comprovantes de endereço', 'Capital social e quotas', 'Objeto social e CNAEs', 'Nome empresarial pretendido', 'Autorização assinada', 'Dados do imóvel'],
    '05': ['Ato consolidado atual', 'Cartão CNPJ', 'Inscrições (IM/IE)', 'Dados antes/depois', 'Documentos dos sócios', 'Autorização do cliente', 'Parecer Fiscal'],
    '07': ['Autorização expressa', 'Atos atuais', 'CNPJ/IM/IE', 'Distrato', 'Signatários', 'Levantamento Fiscal/Contábil/Pessoal', 'Procuração'],
    '10': ['Documentos pedidos pela certificadora', 'CNPJ/CPF do titular', 'Ato e representação', 'Contatos do titular', 'Certificado vigente', 'Orçamento autorizado'],
    '12': ['CNPJ e ato', 'Inscrição municipal', 'Endereço e inscrição imobiliária', 'Atividades e área', 'Viabilidade/TVL', 'Licença anterior', 'Sanitária, bombeiros e ambiental'],
    '17': ['Procuração e-CAC ativa', 'Acesso ao Regularize', 'Inscrição municipal', 'Comprovantes de pagamento recentes'],
    '24': ['Número do PAF/acordo', 'Extrato da SEFAZ-BA', 'Autorização do cliente'],
    '28': ['Lista de PAFs anterior (01/09)', 'Extrato da Inspetoria Eletrônica'],
    '29': ['Comunicado SEFAZ (DT-e)', 'NF-e de compra de energia', 'Contratos de energia (ACL)'],
    '33': ['IM e CNC', 'Requerimento assinado', 'Documento do representante', 'Contato do responsável'],
    '34': ['Nota fiscal ou XML', 'Número/chave da nota', 'CNPJ do emissor e do tomador', 'Motivo do cancelamento', 'Declaração do tomador', 'Análise do Fiscal']
  };
  CUID = {
    '03': ['Em 2026, considerar o MAT.', 'Não presumir emissão imediata do CNPJ.', 'Honorário e taxa pública sempre separados.'],
    '05': ['ME/EPP é porte, não tipo societário.', 'Alteração cadastral não confirma opção ou exclusão tributária.', 'Não concluir se o cadastro final divergir do ato.'],
    '07': ['Baixa não comprova quitação.', 'Não eliminar acessos antes de cumprir obrigações posteriores.'],
    '10': ['Nunca anexar senha ou chave privada.', 'VALIDAR não prova poderes societários.', 'Meu Certificado não recupera chave perdida.'],
    '12': ['Pagar TFF não prova licenciamento.', 'Licença de outro endereço não vale.'],
    '17': ['Uma CND não substitui inventário.', 'Consulta pública pode não mostrar parcelamentos.'],
    '24': ['Não existe teto geral de R$ 200 mil por CNPJ ou imposto definido; a resposta depende da modalidade.'],
    '28': ['Comparar sempre com a lista anterior datada.'],
    '29': ['O prazo de 30 dias da ciência vale apenas neste modelo de comunicado.', 'Justificativas exclusivamente para malhaenergia@sefaz.ba.gov.br.'],
    '33': ['Validar o perfil com o Fiscal; não emitir nota fictícia para teste.'],
    '34': ['Solicitação enviada não é nota cancelada.']
  };
  DEPS = {
    '03': [['10', 'Certificado digital'], ['11', 'Procuração Receita'], ['39', 'Vincular contador SEFAZ'], ['38', 'Implantar Acessórias'], ['12', 'Alvará de funcionamento']],
    '04': [['12', 'Alvará de funcionamento da filial'], ['39', 'Vincular contador SEFAZ (filial)']],
    '05': [['08', 'Atualizar IE na SEFAZ-BA'], ['01', 'Atualizar contrato no Domínio']],
    '07': [['37', 'Encaminhar declarações finais aos setores']],
    '10': [['10', 'Agendar próxima renovação']],
    '12': [['12', 'Programar renovação do alvará']]
  };
  CLIENTES = [
    { id: 'atl', n: 'Atlântico Distribuidora Ltda', s: 'Atlântico Distribuidora', cnpj: '12.345.678/0001-90', mun: 'Salvador', contato: 'Hugo Andrade (sócio)', estabs: 2 },
    { id: 'ges', n: 'Gesso Forte Ltda', s: 'Gesso Forte', cnpj: '23.456.789/0001-01', mun: 'Salvador', contato: 'Márcio Reis', estabs: 1 },
    { id: 'spa', n: 'Spazio Comércio Ltda', s: 'Spazio Comércio', cnpj: '34.567.890/0001-12', mun: 'Lauro de Freitas', contato: 'Tânia Vieira (financeiro)', estabs: 1 },
    { id: 'v25', n: 'V25 Serviços Ltda', s: 'V25 Serviços', cnpj: '45.678.901/0001-23', mun: 'Camaçari', contato: 'Rose Santos', estabs: 1 },
    { id: 'loy', n: 'Loyola Fonoaudiologia Ltda', s: 'Loyola Fonoaudiologia', cnpj: '56.789.012/0001-34', mun: 'Salvador', contato: 'Graziela Loyola', estabs: 1 },
    { id: 'sem', n: 'Instituto Semear', s: 'Instituto Semear', cnpj: '67.890.123/0001-45', mun: 'Salvador', contato: 'Diretoria', estabs: 1 },
    { id: 'tec', n: 'Techsale Comércio Ltda', s: 'Techsale Comércio', cnpj: '78.901.234/0001-56', mun: 'Salvador', contato: 'Mônica Prado', estabs: 1 },
    { id: 'esc', n: 'Escola Encontro Infantil Ltda', s: 'Escola Encontro Infantil', cnpj: '89.012.345/0001-67', mun: 'Salvador', contato: 'Helberte Lima', estabs: 1 },
    { id: 'ant', n: 'Antônio & Filho Ltda', s: 'Antônio & Filho', cnpj: '90.123.456/0001-78', mun: 'Salvador', contato: 'Rose Almeida', estabs: 1 },
    { id: 'mis', n: 'Missão Pescadores', s: 'Missão Pescadores', cnpj: '01.234.567/0001-89', mun: 'Salvador', contato: 'Pastor João', estabs: 1 },
    { id: 'mar', n: 'Marco Aurélio Consultoria (em abertura)', s: 'Marco Aurélio Consultoria', cnpj: '—', mun: 'Salvador', contato: 'Marco Aurélio', estabs: 0 }
  ];
  mkP(id, cli, code, proc, sit, dias, step, next, resp, pInt, o) {
    const c = this.CLIENTES.find(x => x.s === cli) || {};
    return Object.assign({ id, cli, cnpj: c.cnpj || '—', estab: 'Matriz', code, proc, sit, dias, step, next, resp, pInt, pExt: '', marcos: [], setor: '', motivo: '', lastUpd: '01/10', mun: c.mun || 'Salvador', dem: '' }, o || {});
  }
  initProcs() {
    const m = this.mkP.bind(this);
    return [
      m('P-101', 'Atlântico Distribuidora', '05', 'Alteração — inclusão de sócia', 'cli', 4, 4, 'Cobrar assinatura do sócio', 'Matheus', '05/10', { marcos: [{ t: 'Enviado', d: '30/09' }], motivo: 'Assinatura de Jales Consultoria e pagamento da taxa', lastUpd: '02/10', dem: 'D-052', org: 'JUCEB' }),
      m('P-102', 'Gesso Forte', '05', 'Alteração de endereço', 'org', 3, 5, 'Consultar protocolo BAP2600456789', 'Matheus', '06/10', { marcos: [{ t: 'Pago', d: '25/09' }, { t: 'Protocolado', d: '29/09' }], motivo: 'Protocolo JUCEB BAP2600456789', dem: 'D-048', org: 'JUCEB' }),
      m('P-103', 'Gesso Forte', '12', 'Alvará de funcionamento — Salvador', 'nao', 0, 1, 'Aguardar deferimento da alteração', 'Matheus', '20/10', { blocked: 'P-102', dem: 'D-048', org: 'SEFAZ Salvador' }),
      m('P-104', 'Spazio Comércio', '24', 'Atualização de DAE de PAF 2136870025', 'and', 0, 5, 'Emitir DAE atualizado na SEFAZ-BA', 'Matheus', '02/10', { dem: 'D-044', org: 'SEFAZ-BA', lastUpd: '02/10' }),
      m('P-105', 'V25 Serviços', '33', 'Senha NFS-e — Camaçari', 'org', 9, 3, 'Ligar para a SEFAZ Camaçari', 'Ana', '30/09', { marcos: [{ t: 'Protocolado', d: '23/09' }], motivo: 'Requerimento de senha nº 2026/0918', dem: 'D-040', org: 'SEFAZ Camaçari', lastUpd: '25/09' }),
      m('P-106', 'Loyola Fonoaudiologia', '05', 'Mudança de UF Bahia → Goiás', 'and', 0, 2, 'Protocolar viabilidade na Junta de Goiás', 'Matheus', '08/10', { org: 'JUCEG', dem: 'D-049' }),
      m('P-107', 'Instituto Semear', '34', 'Cancelamento de NFS-e', 'nao', 0, 1, '', '', '', { lastUpd: '16/09', dem: 'D-046', org: 'SEFAZ Salvador' }),
      m('P-108', 'Techsale Comércio', '17', 'Diagnóstico de débitos', 'set', 2, 5, 'Carla validar valores retificados', 'Carla', '07/10', { setor: 'Fiscal', motivo: 'Validar valores retificados das DCTFWeb', org: 'Receita / SEFAZ-BA / Salvador', dem: 'D-051' }),
      m('P-109', 'Escola Encontro Infantil', '07', 'Baixa de empresa', 'nao', 0, 1, 'Levantar débitos e obrigações com os setores', 'Ana', '15/10', { lastUpd: '22/09', dem: 'D-047', org: 'JUCEB' }),
      m('P-110', 'Antônio & Filho', '34', 'Cancelamento de nota fiscal', 'cli', 12, 3, 'Obter declaração do tomador', 'Matheus', '03/10', { motivo: 'Obter declaração do tomador', dem: 'D-050', org: 'SEFAZ Salvador' }),
      m('P-111', 'Missão Pescadores', '12', 'Alvará — regularizar pendências do CNPJ', 'org', 6, 4, 'Acompanhar nova viabilidade', 'Ana', '10/10', { marcos: [{ t: 'Exigência', d: '24/09' }, { t: 'Protocolado', d: '26/09' }], motivo: 'Nova viabilidade REGIN', dem: 'D-045', org: 'SEDUR' }),
      m('P-112', 'Marco Aurélio Consultoria', '03', 'Abertura de empresa', 'cli', 2, 1, 'Receber documentos dos sócios', 'Matheus', '09/10', { estab: 'Em abertura', motivo: 'Documentos dos sócios', dem: 'D-055', org: 'JUCEB' }),
      m('P-113', 'Atlântico Distribuidora', '28', 'PAF estadual — verificar novos', 'and', 0, 2, 'Comparar com lista de 01/09', 'Matheus', '07/10', { dem: 'D-059', org: 'SEFAZ-BA' }),
      m('P-114', 'Spazio Comércio', '29', 'Comunicado malha energia', 'set', 3, 3, 'Conciliação de NF-e', 'Carla', '12/10', { setor: 'Fiscal', pExt: '26/10', ciencia: '26/09', fund: '30 dias da ciência — comunicado SEFAZ (DT-e)', motivo: 'Conciliação de NF-e de compra de energia', dem: 'D-057', org: 'SEFAZ-BA' }),
      m('P-115', 'Techsale Comércio', '10', 'Renovação de certificado e-CNPJ', 'cli', 1, 3, 'Agendar validação com a titular', 'Ana', '14/10', { pExt: '20/10', ciencia: '', fund: 'Vencimento do certificado e-CNPJ A1', motivo: 'Data para validação com Mônica Prado', dem: 'D-058', org: 'Certificadora' }),
      m('P-098', 'Atlântico Distribuidora', '04', 'Abertura de filial — Camaçari', 'conc', 0, 6, '', 'Matheus', '', { estab: 'Filial', concl: '25/09', marcos: [{ t: 'Deferido', d: '19/09' }], org: 'JUCEB' }),
      m('P-099', 'Gesso Forte', '18', 'Certidão federal', 'conc', 0, 6, '', 'Ana', '', { concl: '28/09', org: 'Receita' }),
      m('P-097', 'Atlântico Distribuidora', '31', 'Regime especial renovado', 'conc', 0, 6, '', 'Matheus', '', { concl: '22/09', marcos: [{ t: 'Deferido', d: '22/09' }], org: 'SEFAZ-BA' })
    ];
  }
  initDem() {
    const d = (id, data, canal, cli, solic, desc, procs, st) => ({ id, data, canal, cli, solic, desc, procs, st });
    return [
      d('D-063', '02/10/2026', 'E-mail', 'Loyola Fonoaudiologia', 'Graziela Loyola', 'Precisamos da certidão negativa federal para licitação até o dia 09.', [], 'Nova'),
      d('D-062', '02/10/2026', 'DTE', 'Atlântico Distribuidora', 'DT-e Bahia', 'Intimação para apresentação de livros fiscais — filial Camaçari.', [], 'Em triagem'),
      d('D-064', '01/10/2026', 'Telefone', 'Escola Encontro Infantil', 'Helberte Lima', 'Dúvida sobre prazo para encerrar a inscrição municipal após a baixa.', [], 'Nova'),
      d('D-059', '01/10/2026', 'Interno', 'Atlântico Distribuidora', 'Paulo Lima', 'Verificar novos PAFs do mês.', ['P-113'], 'Convertida'),
      d('D-058', '29/09/2026', 'WhatsApp', 'Techsale Comércio', 'Mônica Prado', 'Certificado da empresa vence dia 20.', ['P-115'], 'Convertida'),
      d('D-057', '27/09/2026', 'DTE', 'Spazio Comércio', 'DT-e Bahia', 'Comunicado de malha — energia adquirida no mercado livre.', ['P-114'], 'Convertida'),
      d('D-055', '25/09/2026', 'WhatsApp', 'Marco Aurélio Consultoria', 'Marco Aurélio', 'Quero abrir minha consultoria.', ['P-112'], 'Convertida'),
      d('D-052', '22/09/2026', 'WhatsApp', 'Atlântico Distribuidora', 'Hugo Andrade', 'Incluir a Jales Consultoria como sócia da Atlântico.', ['P-101'], 'Convertida'),
      d('D-051', '21/09/2026', 'E-mail', 'Techsale Comércio', 'Mônica Prado', 'Levantar todos os débitos antes de pedir financiamento.', ['P-108'], 'Convertida'),
      d('D-050', '20/09/2026', 'E-mail', 'Antônio & Filho', 'Rose Almeida', 'Cancelar a NFS-e 1.284 emitida com valor errado.', ['P-110'], 'Convertida'),
      d('D-048', '18/09/2026', 'WhatsApp', 'Gesso Forte', 'Márcio Reis', 'Mudamos de endereço: alterar o contrato e emitir o alvará novo.', ['P-102', 'P-103'], 'Convertida'),
      d('D-046', '16/09/2026', 'E-mail', 'Instituto Semear', 'Diretoria', 'Cancelar nota emitida em duplicidade.', ['P-107'], 'Convertida'),
      d('D-041', '12/09/2026', 'WhatsApp', 'V25 Serviços', 'Rose Santos', 'Pedido repetido de senha NFS-e (já atendido pela D-040).', [], 'Arquivada')
    ];
  }
  initGuias() {
    const g = (id, cli, cnpj, org, mod, ac, parc, venc, val, orig, jettax, st, contato, trib, o) => Object.assign({ id, cli, cnpj, org, mod, ac, parc, venc, val, orig, jettax, st, contato, trib, acSit: 'Ativo', prev: val, resp: 'Matheus', conf: [false, false, false, false, false, false], anterior: false }, o || {});
    return [
      g('g1', 'Spazio Comércio', '34.567.890/0001-12', 'SEFAZ-BA', 'Estadual ICMS', 'PAF 2136870025', '8/24', '30/10', 1842.10, 'Portal SEFAZ', false, 'emitir', 'Tânia Vieira · WhatsApp', 'ICMS 2023–2024'),
      g('g2', 'Techsale Comércio', '78.901.234/0001-56', 'Receita', 'Simplificado', '12.345.678', '15/60', '30/10', 612.40, 'Jettax', true, 'enviada', 'Mônica Prado · e-mail', 'IRPJ/CSLL 2024', { prev: 609.80, conf: [true, true, true, true, true, true], envio: '01/10 · E-mail' }),
      g('g3', 'Techsale Comércio', '78.901.234/0001-56', 'PGFN', 'Transação', '9876543', '22/120', '30/10', 389.90, 'Jettax não trouxe', false, 'emitir', 'Mônica Prado · e-mail', 'Dívida ativa 2022–2023', { missing: true, prev: 388.10 }),
      g('g4', 'Gesso Forte', '23.456.789/0001-01', 'Simples Nacional', 'Convencional', '2025000123', '11/60', '30/10', 455.77, 'Jettax', true, 'paga', 'Márcio Reis · WhatsApp', 'DAS 2024', { prev: 452.30, conf: [true, true, true, true, true, true], envio: '30/09 · WhatsApp', pago: '01/10' }),
      g('g5', 'V25 Serviços', '45.678.901/0001-23', 'Simples Nacional', 'PERT-SN', '2018004567', '87/120', '30/10', 301.15, 'Portal Simples', false, 'emitida', 'Rose Santos · WhatsApp', 'DAS 2015–2017', { prev: 214.90, conf: [true, true, true, true, true, true] }),
      g('g6', 'Antônio & Filho', '90.123.456/0001-78', 'Prefeitura de Salvador', 'Municipal/REFIS', '77788', '5/12', '10/10', 980.00, 'Portal Salvador', false, 'enviada', 'Rose Almeida · e-mail', 'ISS/TFF 2023', { conf: [true, true, true, true, true, true], envio: '29/09 · E-mail' }),
      g('g7', 'Loyola Fonoaudiologia', '56.789.012/0001-34', 'Receita', 'Previdenciário', '55.443.322', '3/60', '30/10', 274.30, 'Jettax', true, 'baixada', 'Graziela Loyola · e-mail', 'Contribuições previdenciárias 2025', { prev: 272.90, conf: [true, true, true, true, true, true], envio: '28/09 · E-mail', pago: '30/09' }),
      g('g8', 'Atlântico Distribuidora', '12.345.678/0001-90', 'Simples Nacional', 'RELP', '2022009988', '30/180', '30/10', 1120.00, 'Portal Simples', false, 'emitir', 'Hugo Andrade · WhatsApp', 'DAS 2019–2021', { acSit: 'Em atraso', atraso: 2 })
    ];
  }
  CAMINHOS = {
    'Simplificado': [6, 'Pagamentos e Parcelamentos › Parcelamento – Solicitar e acompanhar › Consultar informações › situação “Todos” › acordo › Ações › Extrato › Demonstrativo de Parcelas › emitir DARF'],
    'Convencional': [11, 'Parcelamento (Simples e SIMEI) › Solicitar, acompanhar e emitir DAS › Emissão de Parcela'],
    'PERT-SN': [61, 'Serviço da modalidade em Pagamentos e Parcelamentos / Simples Nacional [11]'],
    'RELP': [11, 'Serviço da modalidade RELP em Simples Nacional › Parcelamento'],
    'Previdenciário': [6, 'Modalidade previdenciária vinculada ao débito › emitir DARF da parcela'],
    'Transação': [9, 'Negociações/acordos › emissão da guia (alternativa: SISPAR [10])'],
    'Estadual ICMS': [14, 'Inspetoria Eletrônica › Parcelamento › DAE do parcelamento'],
    'Municipal/REFIS': [21, 'Serviços › Dívida ativa › DAM da parcela/REFIS']
  };
  initDte() {
    const b = (cli, cx, code, done, at, per) => ({ cli, cx, code, done, by: done ? 'Ana Ribeiro' : '', at: done ? at : '', per: per || (done ? '25/09 a 02/10' : '') });
    return [
      b('Atlântico Distribuidora', 'e-CAC — Receita', 6, true, '08:12'), b('Atlântico Distribuidora', 'DT-e Bahia — matriz', 14, true, '08:20'), b('Atlântico Distribuidora', 'DT-e Bahia — filial Camaçari', 14, true, '08:24'), b('Atlântico Distribuidora', 'DTE Camaçari — filial', 34, false),
      b('Spazio Comércio', 'e-CAC — Receita', 6, true, '08:31'), b('Spazio Comércio', 'DT-e Bahia', 14, true, '08:35'), b('Spazio Comércio', 'DTE-SN', 11, true, '08:38'),
      b('Techsale Comércio', 'e-CAC — Receita', 6, true, '08:44'), b('Techsale Comércio', 'Regularize — PGFN', 9, false), b('Techsale Comércio', 'DTE-SN', 11, true, '08:50'),
      b('Gesso Forte', 'DTE-SN', 11, true, '08:55'), b('V25 Serviços', 'DTE Camaçari', 34, false), b('V25 Serviços', 'DTE-SN', 11, true, '09:02'), b('Loyola Fonoaudiologia', 'e-CAC — Receita', 6, true, '09:06')
    ];
  }
  DTE_MSGS = [
    { org: 'DT-e Bahia', cli: 'Atlântico Distribuidora', estab: 'Filial Camaçari', num: '2026/884512', ass: 'Intimação para apresentação de livros fiscais', disp: '01/10/2026', cien: '02/10/2026', lit: '10 dias', regra: 'Dias corridos a partir da ciência', venc: '12/10/2026', cls: 'Exigência', code: '30', proc: null },
    { org: 'DTE-SN', cli: 'Gesso Forte', estab: 'Matriz', num: 'TE 2026/000731', ass: 'Termo de exclusão do Simples Nacional por débitos', disp: '30/09/2026', cien: 'Não lida', lit: '30 dias', regra: 'Da ciência; leitura gera ciência', venc: 'A calcular na ciência', cls: 'Exclusão', code: '35', proc: null },
    { org: 'e-CAC', cli: 'Techsale Comércio', estab: 'Matriz', num: 'Caixa Postal 9.104.233', ass: 'Comunicado de pendência — DCTFWeb 07/2026', disp: '01/10/2026', cien: '01/10/2026', lit: '30 dias', regra: 'Dias corridos a partir da ciência', venc: '31/10/2026', cls: 'Cobrança', code: '17', proc: 'P-108' },
    { org: 'DT-e Bahia', cli: 'Spazio Comércio', estab: 'Matriz', num: '2026/871033', ass: 'Comunicado de malha — energia adquirida no mercado livre', disp: '26/09/2026', cien: '26/09/2026', lit: '30 dias da ciência', regra: 'Dias corridos a partir da ciência', venc: '26/10/2026', cls: 'Malha', code: '29', proc: 'P-114' }
  ];
  VENC = [
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
  RICH = {
    'P-101': {
      1: { items: [['Registrar quadro societário antes/depois', true, 'Matheus', '23/09', 'Planilha antes/depois — Dropbox'], ['Classificar: ato societário (não é correção cadastral)', false, 'Matheus', '23/09', '']], docs: [['Ato consolidado atual', 'Conferido'], ['Cartão CNPJ', 'Conferido']], setor: 'Procuradoria', sites: [[1, 'Passo a passo › Alteração › Sociedade limitada']] },
      2: { na: 'Inclusão de sócia sem mudança de nome, endereço ou atividade. Viabilidade não exigida (JUCEB › Viabilidade › Pedido). Justificativa registrada por Matheus em 23/09.', items: [], setor: 'Procuradoria', sites: [[1, 'Viabilidade › Pedido: município, instituição, evento']] },
      3: { items: [['Validar impacto no Simples Nacional (sócia pessoa jurídica)', true, 'Carla', '24/09', 'Parecer por e-mail 24/09 14:10'], ['Conferir atividades e regime após a inclusão', false, 'Carla', '24/09', '']], setor: 'Fiscal', resp: 'Carla', sites: [] },
      4: { items: [['Gerar DBE', true, 'Matheus', '26/09', 'Protocolo BAP2600123456'], ['Redigir instrumento de alteração', false, 'Matheus', '27/09', 'Minuta v2 — Dropbox'], ['Minuta aprovada pelo cliente', true, 'Matheus', '29/09', 'WhatsApp 29/09 — Hugo Andrade'], ['Emitir taxa JUCEB', false, 'Matheus', '30/09', 'DAE R$ 241,47 — Emitida, Enviada'], ['Coletar assinaturas dos sócios', true, null, null, null, 'Hugo assinou · Jales pendente'], ['Confirmar pagamento da taxa', true, null, null, null, '']], docs: [['Instrumento de alteração (minuta v2)', 'Conferido'], ['DBE BAP2600123456', 'Conferido'], ['Ato e CNPJ da Jales Consultoria', 'Recebido'], ['Documento do representante da Jales', 'Pendente'], ['Comprovante de pagamento do DAE JUCEB', 'Pendente']], setor: 'Procuradoria · Cliente (assinaturas)', sites: [[1, 'Passo a passo › Alteração › Sociedade limitada'], [2, 'Requerimento Universal › Acompanhar processo'], [3, 'Meu CNPJ › Acompanhar solicitação']] },
      5: { items: [['Protocolar na JUCEB', true], ['Acompanhar e cumprir exigências', false], ['Baixar ato registrado', true]], setor: 'Procuradoria', sites: [[2, 'Requerimento Universal › Protocolo'], [1, '']] },
      6: { items: [['Comparar ato registrado com o CNPJ', true], ['Conferir IE e IM', true], ['Atualizar Domínio e Onvio', false], ['Informar data de efeito ao cliente e aos setores', false]], setor: 'Procuradoria', sites: [[3, 'Meu CNPJ › Consultar'], [5, 'CNPJ › Comprovante de inscrição'], [14, 'Cadastro › Alteração cadastral']] }
    },
    'P-114': {
      1: { items: [['Confirmar autenticidade do comunicado no DT-e', true, 'Matheus', '27/09', 'DT-e nº 2026/871033'], ['Registrar data de ciência e prazo', true, 'Matheus', '27/09', 'Ciência 26/09 · prazo 26/10']], docs: [['Comunicado SEFAZ (DT-e)', 'Conferido']], setor: 'Procuradoria', sites: [[14, 'DT-e › Mensagens › Comunicados']] },
      2: { items: [['Conferir CNPJ e período do comunicado', true, 'Matheus', '29/09', 'Período 01/2025 a 12/2025'], ['Solicitar notas de compra de energia ao cliente', false, 'Matheus', '29/09', 'WhatsApp a Tânia Vieira']], docs: [['NF-e de compra de energia', 'Recebido']], setor: 'Procuradoria', sites: [[14, 'Inspetoria Eletrônica › NF-e › Consulta destinadas']] },
      3: { items: [['Exportar NF-e de compra de energia do período', false, 'Carla', '30/09', 'Planilha NF-e — Dropbox'], ['Conferir base de cálculo e ICMS recolhido', true, null, null, null, ''], ['Identificar duplicidades', false, null, null, null, ''], ['Memória de cálculo validada pelo Fiscal', true, null, null, null, '']], docs: [['Comunicado SEFAZ (DT-e)', 'Conferido'], ['NF-e de compra de energia', 'Recebido'], ['Contratos de energia (ACL)', 'Pendente']], setor: 'Fiscal', resp: 'Carla', sites: [[14, 'Inspetoria Eletrônica › Extrato do contribuinte'], [5, 'Portal de Serviços › NF-e']] },
      4: { items: [['Decidir: recolher ou justificar', true], ['Emitir DAE complementar, se houver', false]], setor: 'Fiscal', sites: [[14, 'DAE › Emissão']] },
      5: { items: [['Enviar justificativa para malhaenergia@sefaz.ba.gov.br', true], ['Arquivar e-mail enviado', true]], setor: 'Procuradoria', sites: [] },
      6: { items: [['Acompanhar retorno da SEFAZ', false], ['Verificar se gerou PAF', true]], setor: 'Procuradoria', sites: [[16, 'Consulta por PAF']] }
    }
  };
  TL0 = {
    'P-101': [
      ['02/10/2026', '09:40', 'Matheus Silva', 'Mudança de situação', 'Situação → Aguardando cliente. Falta: assinatura de Jales Consultoria e pagamento da taxa.', 'auto'],
      ['02/10/2026', '09:38', 'Matheus Silva', 'Contato com cliente', 'Cobrança de assinatura por WhatsApp a Hugo Andrade.', 'relato'],
      ['30/09/2026', '16:05', 'Matheus Silva', 'Pagamento', 'DAE da taxa JUCEB (R$ 241,47) enviado ao cliente.', 'fato'],
      ['29/09/2026', '11:22', 'Matheus Silva', 'Contato com cliente', 'Cliente aprovou a minuta por WhatsApp.', 'fato'],
      ['28/09/2026', '15:10', 'Matheus Silva', 'Nota', 'Minuta do instrumento de alteração enviada a Hugo Andrade.', 'fato'],
      ['26/09/2026', '10:02', 'Matheus Silva', 'Protocolo', 'DBE gerado — protocolo BAP2600123456.', 'fato'],
      ['24/09/2026', '14:10', 'Carla Menezes', 'Decisão', 'Fiscal validou o impacto da inclusão da sócia no Simples Nacional.', 'fato'],
      ['23/09/2026', '17:30', 'Matheus Silva', 'Nota', 'Levantamento antes/depois concluído. Viabilidade não exigida.', 'relato'],
      ['22/09/2026', '08:51', 'Matheus Silva', 'Nota', 'Demanda D-052 recebida por WhatsApp de Hugo Andrade: “Incluir a Jales Consultoria como sócia da Atlântico”.', 'fato']
    ],
    'P-114': [
      ['30/09/2026', '10:15', 'Matheus Silva', 'Mudança de situação', 'Situação → Aguardando setor (Fiscal). Conciliação de NF-e de compra de energia com Carla.', 'auto'],
      ['29/09/2026', '16:40', 'Matheus Silva', 'Contato com cliente', 'Tânia Vieira enviou as NF-e de compra de energia de 2025.', 'fato'],
      ['29/09/2026', '09:05', 'Matheus Silva', 'Nota', 'Cliente informou que os contratos de energia estão com a comercializadora.', 'relato'],
      ['27/09/2026', '08:30', 'Matheus Silva', 'Exigência', 'Comunicado de malha confirmado no DT-e (nº 2026/871033). Ciência em 26/09; prazo de 30 dias.', 'fato'],
      ['27/09/2026', '08:22', 'Ana Ribeiro', 'Nota', 'Processo criado a partir da consulta DTE do dia.', 'auto']
    ]
  };

  state = {
    screen: 'painel', panelMode: 'meu', procView: 'lista', group: '', fSit: '', fResp: '', fCli: '', fCat: '', fPrazo: '', fSemNext: false, fText: '',
    procs: this.initProcs(), dems: this.initDem(), guias: this.initGuias(), dte: this.initDte(), dteMsgs: this.DTE_MSGS.map(x => Object.assign({}, x)),
    procId: 'P-101', stepSel: null, sideTab: 'tempo', chk: {}, tl: {}, evIdx: null, evText: '', evErr: false, cuidOpen: true, sitMenu: false,
    nxEdit: false, nxText: '', nxResp: 'Matheus', nxDate: '', nxErr: false, noteText: '', noteTipo: 'Nota', noteProva: 'relato',
    modal: null, mProc: null, mTarget: null, mMotivo: '', mSetor: 'Fiscal', mProt: '', mErr: false, concl: [false, false, false, false, false, false], conclStage: 1, deps: [], mTitle: '', mText: '', pxData: '', pxCien: '', pxFund: '',
    ndStep: 1, ndCli: '', ndEstab: 'Matriz', ndSolic: '', ndCanal: 'WhatsApp', ndData: '02/10/2026', ndDesc: '', ndAnexos: '', ndSel: [], ndQ: '', ndCat: '', ndResp: 'Matheus', ndPrazo: '', ndNext: '', ndErr: '', ndDem: null,
    search: '', searchOpen: false, toast: null, absent: { Ana: false }, demTab: 'Todas',
    parcTab: 'mes', parcStep: 2, escopoAtraso: true, histAc: 'g1', cliId: 'atl', bibQ: '', bibCat: '', procCode: '03', portalQ: '', portalEsf: '', cfgTab: 'modelo', modelSel: 3,
    modelSteps: [
      { n: 'Solicitação e escopo', items: [['Confirmar natureza jurídica', true, false], ['Definir órgão de registro (JUCEB ou cartório)', true, false], ['Registrar autorização do cliente', true, true]], resp: 'Procuradoria', dias: 1 },
      { n: 'Viabilidade e DBE', items: [['Consultar viabilidade no REGIN', true, true], ['Coleta REDESIM e geração do DBE', true, true]], resp: 'Procuradoria', dias: 3 },
      { n: 'Documentação', items: [['Redigir ato constitutivo', true, false], ['Enviar minuta e registrar aprovação', true, true], ['Gerar requerimento e taxas', true, true]], resp: 'Procuradoria', dias: 3 },
      { n: 'Assinaturas e protocolo', items: [['Coletar assinaturas', true, true], ['Confirmar pagamento das taxas', true, true], ['Protocolar na JUCEB', true, true], ['Acompanhar exigências', false, false]], resp: 'Procuradoria · Cliente', dias: 5 },
      { n: 'CNPJ e regularização', items: [['Concluir MAT com o Fiscal', true, true], ['Obter e conferir CNPJ', true, true], ['Conferir IM, IE e licenças', true, false]], resp: 'Procuradoria · Fiscal', dias: 5 },
      { n: 'Conclusão', items: [['Entregar dossiê ao cliente', true, true], ['Gerar processos dependentes', false, false]], resp: 'Procuradoria', dias: 1 }
    ],
    alertParams: { venc3: 3, cli: 5, org: 5, set: 3, semAtu: 7, certAnt: 30, alvAnt: 45 },
    cols: { fase: false }
  };

  mainRef = React.createRef();
  searchRef = React.createRef();
  componentDidMount() {
    this._kd = e => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); this.searchRef.current && this.searchRef.current.focus(); }
      if (e.key === 'Escape') this.setState({ modal: null, sitMenu: false, searchOpen: false });
    };
    window.addEventListener('keydown', this._kd);

    // Integração automática com o Backend API SQLite
    fetch('http://localhost:3001/api/processos')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const procsMapped = data.map(p => ({
            id: p.id,
            cli: p.clienteNome,
            cnpj: p.cnpj,
            estab: p.estabelecimento || 'Matriz',
            code: p.codigoProcedimento,
            proc: p.titulo,
            sit: p.situacao,
            dias: p.diasParado || 0,
            step: p.etapaAtual || 1,
            next: p.proximaAcao || '',
            resp: p.responsavel || 'Matheus',
            pInt: p.prazoInterno || '',
            pExt: p.prazoExterno || '',
            ciencia: p.dataCiencia || '',
            fund: p.fundamentoPrazo || '',
            marcos: (p.marcos || []).map(m => ({ t: m.tipo, d: m.data })),
            motivo: p.motivoAguardando || '',
            setor: p.setorAguardando || '',
            protocolo: p.protocoloAguardando || '',
            blocked: p.bloqueadoPorId || '',
            dem: p.demandaOrigemId || '',
            orgao: p.orgao || '',
            concl: p.dataConclusao || '',
            lastUpd: p.ultimaAtualizacao || '02/10'
          }));
          this.setState({ procs: procsMapped });
        }
      })
      .catch(() => {});

    fetch('http://localhost:3001/api/demandas')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const demsMapped = data.map(d => ({
            id: d.id,
            data: d.data,
            canal: d.canal,
            cli: d.clienteNome,
            solic: d.solicitante,
            desc: d.descricao,
            anexos: d.anexos || '',
            st: d.status,
            procs: d.processosVinculados || []
          }));
          this.setState({ dems: demsMapped });
        }
      })
      .catch(() => {});
  }
  componentWillUnmount() { window.removeEventListener('keydown', this._kd); }

  pd(s) { if (!s) return null; const a = s.split('/'); return new Date(+(a[2] || 2026), +a[1] - 1, +a[0]); }
  dd(s) { const d = this.pd(s); return d === null ? null : Math.round((d - new Date(2026, 9, 2)) / 864e5); }
  fmt(n) { return 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  now() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }
  chip(s, pre) {
    if (!s) return { show: false, label: '', n: 999 };
    const n = this.dd(s); const p = pre || '';
    if (n < 0) return { show: true, n, label: p + s + ' · vencido', fg: '#FF6B6B', bg: '#3A1414', bd: '#6B2222' };
    if (n === 0) return { show: true, n, label: p + s + ' · hoje', fg: '#F5A05A', bg: '#3A2410', bd: '#6B4520' };
    if (n <= 3) return { show: true, n, label: p + s + ' · em ' + n + (n === 1 ? ' dia' : ' dias'), fg: '#F5A05A', bg: '#3A2410', bd: '#6B4520' };
    return { show: true, n, label: p + s, fg: '#D4D4D8', bg: '#1A1A1D', bd: '#2E2E33' };
  }
  near(p) {
    if (p.sit === 'conc' || p.sit === 'canc') return p.concl ? { show: true, n: 999, label: 'concluído ' + p.concl, fg: '#6FD69B', bg: '#1A1A1D', bd: '#2E2E33' } : { show: false };
    const a = this.chip(p.pInt, 'int. '), b = this.chip(p.pExt, 'ext. ');
    if (!a.show) return b; if (!b.show) return a; return a.n <= b.n ? a : b;
  }
  minDays(p) { const a = [p.pInt, p.pExt].filter(Boolean).map(x => this.dd(x)); return a.length ? Math.min(...a) : 999; }
  isOpen(p) { return p.sit !== 'conc' && p.sit !== 'canc'; }
  steps(p) { return this.ETAPAS[p.code] || ['Captação', 'Planejamento', 'Execução', 'Conclusão', 'Conferência', 'Sistematização']; }
  procName(code) { const c = this.CATALOG.find(x => x.c === code); return c ? c.n : ''; }
  portal(code, path) { const p = this.PORTAIS[code - 1]; return { code: '[' + p.c + ']', org: p.org, n: p.n, path: path || '', hasPath: !!path, url: p.url, label: p.org + ' — ' + p.n }; }
  alertsOf(p) {
    const a = []; if (!this.isOpen(p)) return a; const ap = this.state.alertParams; const m = this.minDays(p);
    if (m < 0) a.push('Prazo vencido'); else if (m <= ap.venc3) a.push('Vence em até 3 dias');
    if (['cli', 'org', 'set'].includes(p.sit) && p.dias > ap[p.sit]) a.push('Aguardando há ' + p.dias + ' dias');
    if (!p.next) a.push('Sem próxima ação');
    const u = this.dd(p.lastUpd); if (u !== null && -u > ap.semAtu) a.push('Sem atualização há ' + (-u) + ' dias');
    return a;
  }
  dec(p) {
    const S = this.SIT[p.sit]; const st = this.steps(p); const per = this.PEOPLE[p.resp]; const tot = st.length;
    const parado = ['cli', 'org', 'set'].includes(p.sit) ? (p.dias ? 'parado há ' + p.dias + (p.dias === 1 ? ' dia' : ' dias') : 'parado desde hoje') : '';
    const done = p.sit === 'conc';
    return Object.assign({}, p, {
      sitL: S.l + (p.sit === 'set' && p.setor ? ' · ' + p.setor : ''), sitFg: S.fg, sitBg: S.bg, sitDot: S.dot,
      chip: this.near(p), parado, hasParado: !!parado, respIni: per ? per[1] : '—', respN: per ? per[0] : 'Sem responsável',
      stepLbl: done ? 'Concluído — ' + tot + ' de ' + tot + ' etapas' : 'Etapa ' + p.step + ' de ' + tot + ' — ' + st[p.step - 1],
      stepShort: done ? 'Concluído' : p.step + '/' + tot + ' · ' + st[p.step - 1], pct: done ? '100%' : Math.round((p.step - 1) / tot * 100 + 4) + '%',
      hasNext: !!p.next, nextL: done ? 'Concluído em ' + (p.concl || '') : (p.next || 'Sem próxima ação'), nextFg: (p.next || done) ? '#F4F4F5' : '#FF6B6B',
      cnpjS: p.cnpj === '—' ? 'CNPJ em abertura' : p.cnpj.slice(0, 6) + '…' + p.cnpj.slice(10),
      marcosD: (p.marcos || []).map(m => ({ l: m.t + ' ' + m.d })), hasMarcos: (p.marcos || []).length > 0,
      procL: p.code + '. ' + p.proc, open: () => this.openProc(p.id),
      onDragStart: e => { this.dragId = p.id; try { e.dataTransfer.setData('text/plain', p.id); } catch (_) { } }
    });
  }
  go(screen, extra) { this.setState(Object.assign({ screen, searchOpen: false, sitMenu: false }, extra || {})); if (this.mainRef.current) this.mainRef.current.scrollTop = 0; }
  openProc(id) { this.go('ficha', { procId: id, stepSel: null, sideTab: 'tempo', evIdx: null, nxEdit: false, sitMenu: false }); }
  toast(t) { clearTimeout(this._tt); this.setState({ toast: t }); this._tt = setTimeout(() => this.setState({ toast: null }), 3000); }
  getProc(id) { return this.state.procs.find(p => p.id === id); }
  updProc(id, ch) { this.setState(s => ({ procs: s.procs.map(p => p.id === id ? Object.assign({}, p, ch, { lastUpd: '02/10' }) : p) })); }
  genTl(p) {
    const d = this.state.dems.find(x => x.id === p.dem);
    const out = [];
    if (p.sit !== 'nao' && p.sit !== 'and') out.push(['01/10/2026', '17:20', this.PEOPLE[p.resp] ? this.PEOPLE[p.resp][0] : 'Matheus Silva', 'Mudança de situação', 'Situação → ' + this.SIT[p.sit].l + (p.motivo ? '. Motivo: ' + p.motivo + '.' : '.'), 'auto']);
    if (d) out.push([d.data, '09:00', 'Matheus Silva', 'Nota', 'Processo criado a partir da demanda ' + d.id + ' (' + d.canal + '): “' + d.desc + '”', 'auto']);
    else out.push(['02/10/2026', this.now(), 'Matheus Silva', 'Nota', 'Processo criado.', 'auto']);
    return out;
  }
  getTl(p) { return this.state.tl[p.id] || this.TL0[p.id] || this.genTl(p); }
  addEv(id, tipo, txt, prova) {
    const p = this.getProc(id); const cur = this.getTl(p);
    const ev = ['02/10/2026', this.now(), 'Matheus Silva', tipo, txt, prova || 'auto'];
    this.setState(s => ({ tl: Object.assign({}, s.tl, { [id]: [ev].concat(cur) }) }));
  }
  baseItems(p, n) {
    const r = this.RICH[p.id] && this.RICH[p.id][n];
    const done = n < p.step || p.sit === 'conc';
    if (r) return r.items.map(it => ({ t: it[0], req: it[1], done: !!it[2] || (done && !r.na), by: it[2] || (done ? (p.resp || 'Matheus') : ''), when: it[3] || (done ? '—' : ''), ev: it[4] || '', note: it[5] || '' }));
    const nm = this.steps(p)[n - 1];
    const mk = (t, req) => ({ t, req, done, by: done ? (p.resp || 'Matheus') : '', when: done ? '25/09' : '', ev: done && req ? 'Registro no dossiê' : '', note: '' });
    return [mk('Conferir documentos de entrada da etapa', false), mk(nm + ' — executar conforme o Manual', true), mk('Registrar resultado e atualizar a próxima ação', false)];
  }
  getItems(p, n) { return this.state.chk[p.id + '-' + n] || this.baseItems(p, n); }
  setItems(p, n, items) { this.setState(s => ({ chk: Object.assign({}, s.chk, { [p.id + '-' + n]: items }) })); }
  createProc(o) {
    const n = 116 + this.state.procs.filter(p => +p.id.slice(2) >= 116).length;
    const id = 'P-' + n; const c = this.CLIENTES.find(x => x.s === o.cli || x.n === o.cli) || {};
    const p = this.mkP(id, c.s || o.cli, o.code, o.proc || this.procName(o.code), o.sit || 'nao', 0, 1, o.next || '', o.resp || 'Matheus', o.pInt || '', { dem: o.dem || '', lastUpd: '02/10', pExt: o.pExt || '', fund: o.fund || '', estab: o.estab || 'Matriz' });
    return p;
  }
  changeSit(id, k) {
    const p = this.getProc(id);
    if (['cli', 'org', 'set'].includes(k)) this.setState({ modal: 'aguard', mProc: id, mTarget: k, mMotivo: '', mProt: '', mSetor: 'Fiscal', mErr: false, sitMenu: false });
    else if (k === 'conc') this.setState({ modal: 'concl', mProc: id, concl: [false, false, false, false, false, false], conclStage: 1, sitMenu: false, deps: (this.depsFor(p)).map(() => true) });
    else if (k === 'canc') this.setState({ modal: 'cancel', mProc: id, mMotivo: '', mErr: false, sitMenu: false });
    else { this.updProc(id, { sit: k, dias: 0 }); this.addEv(id, 'Mudança de situação', 'Situação → ' + this.SIT[k].l + '.'); this.setState({ sitMenu: false }); this.toast(id + ' → ' + this.SIT[k].l); }
  }
  depsFor(p) { if (p.id === 'P-101') return [['08', 'Atualizar IE na SEFAZ-BA'], ['01', 'Atualizar contrato no Domínio']]; return this.DEPS[p.code] || [['', 'Programar acompanhamento do resultado']]; }
  openNd(extra) { this.setState(Object.assign({ modal: 'demanda', ndStep: 1, ndCli: '', ndEstab: 'Matriz', ndSolic: '', ndCanal: 'WhatsApp', ndData: '02/10/2026', ndDesc: '', ndAnexos: '', ndSel: [], ndQ: '', ndCat: '', ndResp: 'Matheus', ndPrazo: '', ndNext: '', ndErr: '', ndDem: null, searchOpen: false }, extra || {})); }
  showMsg(title, text) { this.setState({ modal: 'msg', mTitle: title, mText: text }); }
  copy(t) { try { navigator.clipboard.writeText(t); } catch (_) { } this.toast('Texto copiado para a área de transferência'); }
  monthGrid(y, m, evFn) {
    const first = new Date(y, m, 1); const off = (first.getDay() + 6) % 7; const dim = new Date(y, m + 1, 0).getDate();
    const weeks = Math.ceil((off + dim) / 7); const cells = [];
    for (let i = 0; i < weeks * 7; i++) {
      const d = new Date(y, m, 1 - off + i); const ds = String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
      const inM = d.getMonth() === m; const isT = d.getDate() === 2 && d.getMonth() === 9;
      cells.push({ day: d.getDate(), ds, bg: isT ? '#26262A' : (inM ? '#1A1A1D' : '#202024'), fg: isT ? '#F0485F' : (inM ? '#D4D4D8' : '#4A4A50'), fw: isT ? '700' : '500', ev: inM ? evFn(ds) : [] });
    }
    return cells;
  }

  renderVals() {
    const s = this.state; const V = {};
    const procsD = s.procs.map(p => this.dec(p));
    const open = s.procs.filter(p => this.isOpen(p));
    const scr = s.screen;
    const act = { ficha: 'processos', diag: 'processos', cliente: 'clientes', proced: 'biblioteca', portais: 'biblioteca' }[scr] || scr;
    const novas = s.dems.filter(d => d.procs.length === 0 && d.st !== 'Arquivada');
    const dteDone = s.dte.filter(b => b.done).length;
    const navDef = [['painel', 'Painel', 0, '10px'], ['demandas', 'Demandas', novas.length, '10px'], ['processos', 'Processos', open.length, '10px'], ['rot', 'Rotinas', 0, '10px'], ['parc', 'Parcelamentos e guias', 0, '22px'], ['dte', 'DTE e comunicações', s.dte.length - dteDone, '22px'], ['venc', 'Vencimentos', 0, '22px'], ['clientes', 'Clientes', 0, '10px'], ['biblioteca', 'Biblioteca', 0, '10px'], ['relatorios', 'Relatórios', 0, '10px'], ['config', 'Configurações', 0, '10px']];
    V.navItems = navDef.map(([k, l, c, pl]) => {
      const a = act === k; const hdr = k === 'rot';
      return { label: l, count: c, hasCount: c > 0, pl, bg: a ? '#C8102E' : 'transparent', fg: a ? '#FFFFFF' : (hdr ? '#8A8A93' : '#D4D4D8'), fw: a ? '600' : (hdr ? '500' : '450'), onClick: () => this.go(hdr ? 'parc' : k) };
    });
    V.navTop1 = V.navItems.slice(0, 3); V.navRot = V.navItems.slice(3, 4); V.navSub = V.navItems.slice(4, 7); V.navTop2 = V.navItems.slice(7);
    ['painel', 'demandas', 'processos', 'ficha', 'parc', 'dte', 'venc', 'clientes', 'cliente', 'biblioteca', 'proced', 'portais', 'diag', 'relatorios', 'config'].forEach(k => { V['is' + k[0].toUpperCase() + k.slice(1)] = scr === k; });
    V.mainRef = this.mainRef; V.searchRef = this.searchRef;
    V.openNovaDemanda = () => this.openNd();
    V.goDemandas = () => this.go('demandas');
    V.toastShow = !!s.toast; V.toastText = s.toast || '';

    // search
    V.search = s.search;
    V.onSearch = e => this.setState({ search: e.target.value, searchOpen: true });
    V.onSearchFocus = () => this.setState({ searchOpen: true });
    V.onSearchBlur = () => setTimeout(() => this.setState({ searchOpen: false }), 150);
    const q = s.search.trim().toLowerCase(); const res = [];
    if (q.length >= 2) {
      const qd = q.replace(/\D/g, '');
      this.CLIENTES.forEach(c => { if (c.n.toLowerCase().includes(q) || (qd.length >= 3 && c.cnpj.replace(/\D/g, '').includes(qd))) res.push({ kind: 'Cliente', title: c.n, sub: c.cnpj, onClick: () => this.go(c.id === 'atl' ? 'cliente' : 'clientes', { cliId: c.id, search: '' }) }); });
      s.procs.forEach(p => { const hay = (p.id + ' ' + p.cli + ' ' + p.proc + ' ' + p.next + ' ' + (p.motivo || '') + ' ' + p.cnpj).toLowerCase(); if (hay.includes(q) || (qd.length >= 4 && (p.cnpj.replace(/\D/g, '') + (p.motivo || '') + p.next + p.proc).replace(/\D/g, '').includes(qd))) res.push({ kind: 'Processo', title: p.id + ' · ' + p.proc, sub: p.cli, onClick: () => { this.setState({ search: '' }); this.openProc(p.id); } }); });
      s.guias.forEach(g => { if ((g.ac + ' ' + g.mod).toLowerCase().includes(q) || (qd.length >= 4 && g.ac.replace(/\D/g, '').includes(qd))) res.push({ kind: 'Acordo', title: g.ac + ' · ' + g.mod, sub: g.cli + ' · ' + g.org, onClick: () => this.go('parc', { parcTab: 'inv', search: '' }) }); });
      if ('bap2600123456'.includes(q.replace(/\s/g, '')) && q.length > 3) res.push({ kind: 'Protocolo', title: 'BAP2600123456 · DBE', sub: 'P-101 · Atlântico Distribuidora', onClick: () => { this.setState({ search: '' }); this.openProc('P-101'); } });
    }
    V.searchResults = res.slice(0, 10); V.searchShow = s.searchOpen && q.length >= 2; V.searchEmpty = res.length === 0;

    // ---------- PAINEL
    const meu = s.panelMode === 'meu'; V.isMeu = meu; V.isEquipe = !meu;
    V.panelTabs = [['meu', 'Meus processos'], ['equipe', 'Equipe']].map(([k, l]) => ({ label: l, bg: s.panelMode === k ? '#1A1A1D' : 'transparent', fg: s.panelMode === k ? '#F4F4F5' : '#A1A1AA', sh: s.panelMode === k ? '0 1px 2px rgba(31,41,51,.12)' : 'none', onClick: () => this.setState({ panelMode: k }) }));
    const covering = s.absent.Ana;
    const scope = meu ? open.filter(p => p.resp === 'Matheus' || (covering && p.resp === 'Ana') || (!p.resp)) : open;
    V.coverBanner = meu && covering; V.coverCount = open.filter(p => p.resp === 'Ana').length;
    const enviadasTot = 19 + s.guias.filter(g => ['enviada', 'paga', 'baixada'].includes(g.st)).length;
    const pagasTot = 10 + s.guias.filter(g => ['paga', 'baixada'].includes(g.st)).length;
    const emitirTot = 3 + s.guias.filter(g => g.st === 'emitir').length;
    const goF = f => () => this.go('processos', Object.assign({ procView: 'lista', fSit: '', fResp: meu ? 'Matheus' : '', fCli: '', fCat: '', fPrazo: '', fSemNext: false, fText: '', group: '' }, f));
    const cnt = (fn) => scope.filter(fn).length;
    V.counters = [
      { label: 'Vencidos', n: cnt(p => this.minDays(p) < 0), dot: '#D64545', red: true, onClick: goF({ fPrazo: 'venc' }) },
      { label: 'Vencem em 3 dias', n: cnt(p => { const m = this.minDays(p); return m >= 0 && m <= 3; }), dot: '#E07B1A', onClick: goF({ fPrazo: '3d' }) },
      { label: 'Aguardando cliente', n: cnt(p => p.sit === 'cli'), dot: this.SIT.cli.dot, onClick: goF({ fSit: 'cli' }) },
      { label: 'Aguardando órgão', n: cnt(p => p.sit === 'org'), dot: this.SIT.org.dot, onClick: goF({ fSit: 'org' }) },
      { label: 'Aguardando setor', n: cnt(p => p.sit === 'set'), dot: this.SIT.set.dot, onClick: goF({ fSit: 'set' }) },
      { label: 'Sem próxima ação', n: cnt(p => !p.next), dot: '#6B6B73', red: true, onClick: goF({ fSemNext: true, fResp: '' }) },
      { label: 'Guias do mês pendentes', n: 41 - enviadasTot, dot: '#F0485F', onClick: () => this.go('parc', { parcTab: 'mes' }) }
    ].map(c => Object.assign(c, { fg: c.red && c.n > 0 ? '#FF6B6B' : '#F4F4F5' }));
    const fila = scope.slice().sort((a, b) => this.minDays(a) - this.minDays(b)).map(p => Object.assign(this.dec(p), { cover: p.resp === 'Ana' && covering && meu }));
    V.fila = fila; V.filaCount = fila.length;
    V.parados = (meu ? scope : open).filter(p => ['cli', 'org', 'set'].includes(p.sit)).sort((a, b) => b.dias - a.dias).slice(0, 4).map(p => Object.assign(this.dec(p), {
      motivoL: (p.motivo || p.next).replace(/^./, c => c.toLowerCase()), cobrarL: p.sit === 'cli' ? 'Registrar cobrança' : (p.sit === 'org' ? 'Registrar consulta' : 'Lembrar setor'),
      onCobrar: () => { this.addEv(p.id, p.sit === 'cli' ? 'Contato com cliente' : 'Nota', p.sit === 'cli' ? 'Cobrança registrada: ' + (p.motivo || p.next) + '.' : (p.sit === 'org' ? 'Consulta ao órgão registrada.' : 'Lembrete enviado ao setor ' + p.setor + '.'), 'relato'); this.updProc(p.id, {}); this.toast('Registrado na linha do tempo de ' + p.id); }
    }));
    V.rotinasHoje = [
      { t: 'Consultar DTE (' + s.dte.length + ' caixas)', sub: dteDone + ' de ' + s.dte.length + ' consultadas', pct: Math.round(dteDone / s.dte.length * 100) + '%', onClick: () => this.go('dte') },
      { t: 'Guias de outubro', sub: enviadasTot + ' de 41 enviadas', pct: Math.round(enviadasTot / 41 * 100) + '%', onClick: () => this.go('parc', { parcTab: 'mes' }) },
      { t: '3 certificados vencem em 15 dias', sub: 'Gesso Forte, Spazio, Loyola', pct: '0%', onClick: () => this.go('venc') }
    ];
    V.demNovas = novas.map(d => ({ cli: d.cli, desc: d.desc, canalS: d.canal, onGerar: () => this.openNd({ ndStep: 2, ndCli: d.cli, ndSolic: d.solic, ndCanal: d.canal, ndDesc: d.desc, ndData: d.data, ndDem: d.id }) }));
    V.demNovasEmpty = novas.length === 0;
    const sitKeys = ['nao', 'and', 'cli', 'org', 'set'];
    V.sitLegend = sitKeys.map(k => ({ l: this.SIT[k].l, dot: this.SIT[k].dot }));
    const ppl = ['Matheus', 'Ana', 'Carla'];
    const maxT = Math.max(...ppl.map(n => open.filter(p => p.resp === n).length), 1);
    V.carga = ppl.map(n => {
      const mine = open.filter(p => p.resp === n); const v = mine.filter(p => this.minDays(p) < 0).length;
      return { n: this.PEOPLE[n][0], setor: this.PEOPLE[n][2], total: mine.length, venc: v, vencFg: v ? '#FF6B6B' : '#B4B4BB', segs: sitKeys.map(k => { const c = mine.filter(p => p.sit === k).length; return { w: (c / maxT * 100) + '%', bg: this.SIT[k].dot, t: this.SIT[k].l + ': ' + c }; }).filter(x => x.w !== '0%') };
    });
    V.ausencias = [['Ana', 'Matheus Silva'], ['Matheus', 'Ana Ribeiro']].map(([k, sub]) => ({ n: this.PEOPLE[k][0], sub, st: s.absent[k] ? 'ausente hoje' : 'presente', btn: s.absent[k] ? 'Marcar presente' : 'Marcar ausente', toggle: () => { this.setState(st => ({ absent: Object.assign({}, st.absent, { [k]: !st.absent[k] }) })); this.toast(s.absent[k] ? this.PEOPLE[k][0] + ' marcada como presente' : 'Processos de ' + this.PEOPLE[k][0] + ' agora aparecem no painel de ' + sub); } }));

    // ---------- DEMANDAS
    const tabs = ['Todas', 'Nova', 'Em triagem', 'Convertida', 'Arquivada'];
    V.demTabs = tabs.map(t => ({ label: t, n: t === 'Todas' ? s.dems.length : s.dems.filter(d => d.st === t).length, bg: s.demTab === t ? '#3A1218' : '#1A1A1D', fg: s.demTab === t ? '#F0485F' : '#D4D4D8', bd: s.demTab === t ? '#7A1A28' : '#2E2E33', onClick: () => this.setState({ demTab: t }) }));
    const stFg = { 'Nova': '#F0485F', 'Em triagem': '#F2B25C', 'Convertida': '#6FD69B', 'Arquivada': '#8E8E96' };
    V.demRows = s.dems.filter(d => s.demTab === 'Todas' || d.st === s.demTab).map(d => ({
      id: d.id, data: d.data.slice(0, 5), canal: d.canal, cli: d.cli, solic: d.solic, desc: d.desc, st: d.st, stFg: stFg[d.st],
      procs: d.procs.map(id => { const p = this.getProc(id); return p ? { id, procS: p.proc, sitDot: this.SIT[p.sit].dot, open: () => this.openProc(id) } : null; }).filter(Boolean),
      noProcs: d.procs.length === 0 && d.st !== 'Arquivada',
      onGerar: () => this.openNd({ ndStep: 2, ndCli: d.cli, ndSolic: d.solic, ndCanal: d.canal, ndDesc: d.desc, ndData: d.data, ndDem: d.id })
    }));

    // ---------- PROCESSOS
    V.isLista = s.procView === 'lista'; V.isQuadro = s.procView === 'quadro'; V.isCal = s.procView === 'cal';
    V.viewTabs = [['lista', 'Lista'], ['quadro', 'Quadro'], ['cal', 'Calendário']].map(([k, l]) => ({ label: l, bg: s.procView === k ? '#1A1A1D' : 'transparent', fg: s.procView === k ? '#F4F4F5' : '#A1A1AA', sh: s.procView === k ? '0 1px 2px rgba(31,41,51,.12)' : 'none', onClick: () => this.setState({ procView: k }) }));
    V.group = s.group; V.onGroup = e => this.setState({ group: e.target.value });
    V.fSit = s.fSit; V.fResp = s.fResp; V.fCli = s.fCli; V.fCat = s.fCat; V.fPrazo = s.fPrazo; V.fText = s.fText;
    V.onFSit = e => this.setState({ fSit: e.target.value }); V.onFResp = e => this.setState({ fResp: e.target.value }); V.onFCli = e => this.setState({ fCli: e.target.value }); V.onFCat = e => this.setState({ fCat: e.target.value }); V.onFPrazo = e => this.setState({ fPrazo: e.target.value }); V.onFText = e => this.setState({ fText: e.target.value });
    V.sitOpts = [{ v: '', l: 'Abertos (todas as situações)' }].concat(Object.keys(this.SIT).map(k => ({ v: k, l: this.SIT[k].l })));
    V.respOpts = [{ v: '', l: 'Todos os responsáveis' }].concat(['Matheus', 'Ana', 'Carla'].map(k => ({ v: k, l: this.PEOPLE[k][0] })));
    V.cliOpts = [{ v: '', l: 'Todos os clientes' }].concat(this.CLIENTES.map(c => ({ v: c.s, l: c.s })));
    V.catOpts = [{ v: '', l: 'Todas as categorias' }].concat(Object.keys(this.CATS).map(k => ({ v: k, l: k + ' · ' + this.CATS[k] })));
    V.semNextBg = s.fSemNext ? '#3A1414' : '#1A1A1D'; V.semNextFg = s.fSemNext ? '#FF6B6B' : '#D4D4D8'; V.semNextBd = s.fSemNext ? '#6B2222' : '#3A3A40';
    V.toggleSemNext = () => this.setState({ fSemNext: !s.fSemNext });
    V.hasFilters = !!(s.fSit || s.fResp || s.fCli || s.fCat || s.fPrazo || s.fSemNext || s.fText);
    V.clearFilters = () => this.setState({ fSit: '', fResp: '', fCli: '', fCat: '', fPrazo: '', fSemNext: false, fText: '' });
    V.savedFilters = [['Meus aguardando órgão', { fResp: 'Matheus', fSit: 'org' }], ['Vencidos da equipe', { fPrazo: 'venc', fResp: '' }], ['Aguardando Fiscal', { fSit: 'set' }], ['Esta semana', { fPrazo: 'semana' }]].map(([l, f]) => ({ l, onClick: () => this.setState(Object.assign({ fSit: '', fResp: '', fCli: '', fCat: '', fPrazo: '', fSemNext: false, fText: '' }, f)) }));
    const catOf = code => (this.CATALOG.find(c => c.c === code) || {}).cat;
    const filt = (p, ignoreSit) => {
      if (!ignoreSit) { if (s.fSit) { if (p.sit !== s.fSit) return false; } else if (!this.isOpen(p)) return false; }
      if (s.fResp && p.resp !== s.fResp) return false; if (s.fCli && p.cli !== s.fCli) return false; if (s.fCat && catOf(p.code) !== s.fCat) return false;
      if (s.fSemNext && (p.next || !this.isOpen(p))) return false;
      if (s.fText && !(p.id + p.cli + p.proc + p.next + p.cnpj).toLowerCase().includes(s.fText.toLowerCase())) return false;
      const m = this.minDays(p);
      if (s.fPrazo === 'venc' && !(m < 0)) return false; if (s.fPrazo === '3d' && !(m >= 0 && m <= 3)) return false;
      if (s.fPrazo === 'semana' && !(m <= 2)) return false; if (s.fPrazo === 'mes' && !(m <= 29)) return false;
      return true;
    };
    const list = s.procs.filter(p => filt(p)).sort((a, b) => this.minDays(a) - this.minDays(b)).map(p => this.dec(p));
    V.procCountL = list.length + ' processos' + (V.hasFilters ? ' com os filtros aplicados' : ' abertos');
    V.procEmpty = list.length === 0;
    if (!s.group) V.procGroups = [{ hasLabel: false, items: list }];
    else {
      const key = p => s.group === 'cliente' ? p.cli : s.group === 'proc' ? p.code + '. ' + this.procName(p.code) : p.respN;
      const g = {}; list.forEach(p => { (g[key(p)] = g[key(p)] || []).push(p); });
      V.procGroups = Object.keys(g).sort().map(k => ({ hasLabel: true, label: k, n: g[k].length, items: g[k] }));
    }
    V.allowDrop = e => e.preventDefault();
    V.boardCols = ['nao', 'and', 'cli', 'org', 'set', 'conc'].map(k => { const items = s.procs.filter(p => p.sit === k && filt(p, true)).map(p => this.dec(p)); return { l: this.SIT[k].l, fg: this.SIT[k].fg, dot: this.SIT[k].dot, n: items.length, items, onDrop: e => { e.preventDefault(); const id = this.dragId; if (!id) return; const p = this.getProc(id); if (p && p.sit !== k) this.changeSit(id, k); this.dragId = null; } }; });
    V.weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    V.calCells = this.monthGrid(2026, 9, ds => {
      const ev = [];
      s.procs.filter(p => filt(p)).forEach(p => {
        if (p.pInt === ds) ev.push({ l: p.id + ' · ' + p.cli.split(' ')[0], title: 'Prazo interno — ' + p.proc, bd: '#F0485F', bg: '#3A1218', open: () => this.openProc(p.id) });
        if (p.pExt === ds) ev.push({ l: p.id + ' · ext.', title: 'Prazo externo — ' + (p.fund || p.proc), bd: '#7C4DDB', bg: '#2A1F45', open: () => this.openProc(p.id) });
      });
      return ev;
    });

    this.renderMore(V, s, open, procsD);
    return V;
  }
  renderMore(V, s, open, procsD) {
    this.rFicha(V, s);
    if (this.rRotinas) this.rRotinas(V, s);
    if (this.rOutros) this.rOutros(V, s, open);
    if (this.rModals) this.rModals(V, s);
  }
  PROT = {
    'P-101': [['REDESIM', 'BAP2600123456', '26/09', 'REDESIM', 'DBE gerado — aguarda protocolo na JUCEB', 3]],
    'P-102': [['JUCEB', 'BAP2600456789', '29/09', 'REGIN', 'Em análise', 2]],
    'P-105': [['SEFAZ Camaçari', '2026/0918', '23/09', 'Processos administrativos', 'Sem resposta', 33]],
    'P-111': [['JUCEB / REGIN', 'BAV2600998877', '26/09', 'REGIN', 'Em análise — nova viabilidade', 2]],
    'P-114': [['SEFAZ-BA', 'DT-e 2026/871033', '26/09', 'DT-e', 'Comunicado — prazo 26/10', 14]]
  };
  GUIAS_P = {
    'P-101': { g: [['DAE', 'Taxa JUCEB — alteração contratual', 241.47, '06/10', 'Atlântico Distribuidora', 2]], h: [['Honorário Officecon — alteração contratual', 650]] },
    'P-102': { g: [['DAE', 'Taxa JUCEB — alteração de endereço', 241.47, '26/09', 'Gesso Forte', 4]], h: [['Honorário Officecon — alteração contratual', 650]] },
    'P-104': { g: [['DAE', 'Parcela 8/24 — PAF 2136870025 (atualizada)', 1842.10, '02/10', 'Spazio Comércio', 0]], h: [] },
    'P-112': { g: [['DAE', 'Taxa JUCEB — constituição', 0, '—', 'Marco Aurélio', 0], ['DAM', 'TFF inicial — Salvador', 0, '—', 'Marco Aurélio', 0]], h: [['Honorário Officecon — abertura de empresa', 1800]] }
  };
  GST = ['emitir', 'emitida', 'enviada', 'paga', 'baixada'];
  GSTL = { emitir: 'A emitir', emitida: 'Emitida (conferida)', enviada: 'Enviada', paga: 'Paga', baixada: 'Baixada no portal' };
  setGuia(id, ch) { this.setState(s => ({ guias: s.guias.map(g => g.id === id ? Object.assign({}, g, ch) : g) })); }
  rRotinas(V, s) {
    const G = s.guias;
    V.parcTabs = [['mes', 'Rotina do mês'], ['inv', 'Inventário de acordos'], ['hist', 'Histórico']].map(([k, l]) => ({ label: l, fg: s.parcTab === k ? '#F0485F' : '#A1A1AA', bd: s.parcTab === k ? '#F0485F' : 'transparent', onClick: () => this.setState({ parcTab: k }) }));
    V.isPMes = s.parcTab === 'mes'; V.isPInv = s.parcTab === 'inv'; V.isPHist = s.parcTab === 'hist';
    const env = 19 + G.filter(g => ['enviada', 'paga', 'baixada'].includes(g.st)).length;
    const pag = 10 + G.filter(g => ['paga', 'baixada'].includes(g.st)).length;
    const emi = 3 + G.filter(g => g.st === 'emitir').length;
    V.pHead = '41 acordos · ' + env + ' enviadas · ' + pag + ' pagas · ' + emi + ' pendentes de emissão';
    V.pEnvPct = Math.round(env / 41 * 100) + '%'; V.pPagPct = Math.round(pag / 41 * 100) + '%';
    V.escopoL = s.escopoAtraso ? 'Sim' : 'Não'; V.toggleEscopo = () => this.setState({ escopoAtraso: !s.escopoAtraso });
    V.escSimBg = s.escopoAtraso ? '#1A1A1D' : 'transparent'; V.escNaoBg = s.escopoAtraso ? 'transparent' : '#1A1A1D';
    V.escSim = () => this.setState({ escopoAtraso: true }); V.escNao = () => this.setState({ escopoAtraso: false });
    const conc = G.every(g => g.jettax || g.st !== 'emitir');
    V.concOk = conc; V.concNo = !conc;
    V.fecharMes = () => conc ? this.toast('Outubro/2026 marcado como concluído') : this.toast('Conciliação incompleta: ainda há acordos sem guia');
    const stepsDef = ['Exportar do Jettax', 'Conciliação', 'Buscar faltantes', 'Conferir guias', 'Envio', 'Pagamento e baixa'];
    V.pSteps = stepsDef.map((l, i) => ({ n: i + 1, l, bg: s.parcStep === i + 1 ? '#C8102E' : '#1A1A1D', fg: s.parcStep === i + 1 ? '#FFFFFF' : '#D4D4D8', bd: s.parcStep === i + 1 ? '#C8102E' : '#3A3A40', onClick: () => this.setState({ parcStep: i + 1 }) }));
    [1, 2, 3, 4, 5, 6].forEach(n => { V['ps' + n] = s.parcStep === n; });
    V.jettax = this.portal(52, 'Relatórios › Parcelamentos › Exportar guias do mês');
    const dg = g => {
      const cam = this.CAMINHOS[g.mod] || [6, '']; const diff = Math.abs(g.val - g.prev) / g.prev;
      return Object.assign({}, g, {
        valL: this.fmt(g.val), stL: this.GSTL[g.st], portal: this.portal(cam[0], cam[1]), jetL: g.jettax ? 'Veio na exportação' : (g.missing ? 'Jettax não trouxe — buscar na origem' : 'Origem: ' + g.orig),
        jetFg: g.jettax ? '#6FD69B' : (g.missing ? '#F2B25C' : '#B4B4BB'), jetBg: g.jettax ? '#13301F' : (g.missing ? '#3A2A10' : '#26262A'),
        jetBox: g.jettax ? '✓' : '', jetBoxBg: g.jettax ? '#2E9E5B' : '#1A1A1D', jetBoxBd: g.jettax ? '#2E9E5B' : '#6B6B73',
        toggleJet: () => this.setGuia(g.id, { jettax: !g.jettax, missing: g.jettax ? g.missing : false }),
        atrasoL: g.atraso ? g.atraso + ' parcelas em atraso — risco de rescisão' : '', hasAtraso: !!g.atraso,
        diffL: diff > 0.15 ? 'Valor ' + Math.round(diff * 100) + '% diferente do mês anterior (' + this.fmt(g.prev) + ')' : '', hasDiff: diff > 0.15,
        acSitFg: g.acSit === 'Ativo' ? '#6FD69B' : '#FF6B6B',
        canNext: g.st !== 'baixada', nextL: { emitir: 'Marcar emitida', emitida: 'Marcar enviada', enviada: 'Marcar paga', paga: 'Marcar baixada' }[g.st] || '',
        onNext: () => {
          const i = this.GST.indexOf(g.st); const nx = this.GST[i + 1]; if (!nx) return;
          if (nx === 'emitida' && !g.conf.every(Boolean)) { this.setState({ parcStep: 4 }); this.toast('Confira os 6 itens da guia antes de marcá-la como emitida'); return; }
          this.setGuia(g.id, Object.assign({ st: nx }, nx === 'enviada' ? { envio: '02/10 · ' + (g.contato.includes('e-mail') ? 'E-mail' : 'WhatsApp') } : {}, nx === 'paga' ? { pago: '02/10' } : {}));
          this.toast(g.cli + ' · ' + g.ac + ' → ' + this.GSTL[nx]);
        },
        confItems: ['CNPJ', 'Órgão', 'Acordo', 'Nº da parcela', 'Valor', 'Vencimento'].map((l, i) => ({ l, bg: g.conf[i] ? '#2E9E5B' : '#1A1A1D', bd: g.conf[i] ? '#2E9E5B' : '#6B6B73', mk: g.conf[i] ? '✓' : '', onClick: () => { const c = g.conf.slice(); c[i] = !c[i]; const ch = { conf: c }; if (c.every(Boolean) && g.st === 'emitir') { ch.st = 'emitida'; this.toast('Guia conferida e marcada como emitida'); } this.setGuia(g.id, ch); } })),
        envioL: g.envio || '', hasEnvio: !!g.envio, antL: g.anterior ? '☑ entrega anterior' : '☐ entrega anterior', toggleAnt: () => this.setGuia(g.id, { anterior: !g.anterior })
      });
    };
    const GD = G.map(dg);
    V.pBoard = this.GST.map(k => { const items = GD.filter(g => g.st === k); return { l: this.GSTL[k], n: items.length, items }; });
    V.pAll = GD; V.pFaltantes = GD.filter(g => !g.jettax); V.pFaltN = V.pFaltantes.length;
    V.pJetN = GD.filter(g => g.jettax).length; V.pMissingN = GD.filter(g => g.missing).length;
    V.pConf = GD.filter(g => g.st === 'emitir' || g.st === 'emitida');
    const byCli = {}; GD.filter(g => g.st === 'emitida').forEach(g => { (byCli[g.cli] = byCli[g.cli] || []).push(g); });
    V.pEnvio = Object.keys(byCli).map(c => {
      const gs = byCli[c]; const total = gs.reduce((a, g) => a + g.val, 0);
      const txt = 'Olá, ' + gs[0].contato.split(' ')[0] + '! Seguem as guias de parcelamento de outubro/2026 da ' + c + ':\n\n' + gs.map(g => '• ' + g.org + ' — ' + g.mod + ' ' + g.ac + ' — parcela ' + g.parc + ' — vence ' + g.venc + '/2026 — ' + this.fmt(g.val)).join('\n') + '\n\nTotal: ' + gs.length + (gs.length > 1 ? ' documentos' : ' documento') + ' · ' + this.fmt(total) + '.\nPor favor, nos envie o comprovante após o pagamento.\nProcuradoria · Officecon';
      return { cli: c, contato: gs[0].contato, n: gs.length, total: this.fmt(total), guias: gs, onMsg: () => this.showMsg('Mensagem de envio — ' + c, txt), onEnviar: () => { gs.forEach(g => this.setGuia(g.id, { st: 'enviada', envio: '02/10 · ' + (g.contato.includes('e-mail') ? 'E-mail' : 'WhatsApp') })); this.toast('Guias de ' + c + ' marcadas como enviadas'); } };
    });
    V.pEnvioEmpty = V.pEnvio.length === 0;
    V.pPag = GD.filter(g => g.st === 'enviada' || g.st === 'paga');
    const al = [];
    GD.forEach(g => {
      if (g.missing && g.st === 'emitir') al.push({ t: 'Acordo sem guia no mês', d: g.cli + ' · ' + g.org + ' ' + g.ac + ' — Jettax não trouxe' });
      if (g.st === 'enviada' && this.dd(g.venc) <= 8) al.push({ t: 'Guia vencendo sem pagamento', d: g.cli + ' · ' + g.ac + ' vence ' + g.venc });
      if (g.atraso >= 2) al.push({ t: 'Risco de rescisão', d: g.cli + ' · ' + g.mod + ' ' + g.ac + ' com ' + g.atraso + ' parcelas em atraso' });
      if (g.hasDiff) al.push({ t: 'Valor fora do padrão', d: g.cli + ' · ' + g.diffL });
    });
    V.pAlerts = al;
    V.invRows = GD.map(g => Object.assign({}, g, { periodo: g.trib }));
    V.histOpts = GD.map(g => ({ v: g.id, l: g.cli + ' · ' + g.org + ' ' + g.ac }));
    V.histAc = s.histAc; V.onHistAc = e => this.setState({ histAc: e.target.value });
    const hg = GD.find(g => g.id === s.histAc) || GD[0]; const [pc] = hg.parc.split('/').map(Number);
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    V.histRows = Array.from({ length: Math.min(pc, 8) }, (_, i) => {
      const n = pc - i; const mi = (9 - i + 120) % 12; const mm = String(mi + 1).padStart(2, '0'); const cur = i === 0;
      return { parc: n + '/' + hg.parc.split('/')[1], comp: meses[mi] + '/' + (mi > 9 - i ? 2025 : 2026), emis: cur ? (hg.st === 'emitir' ? '—' : '01/10') : '24/' + mm, env: cur ? (hg.envio || '—') : '25/' + mm + ' · ' + (hg.contato.includes('e-mail') ? 'E-mail' : 'WhatsApp'), pago: cur ? (hg.pago || '—') : (hg.atraso && i <= hg.atraso ? 'Em atraso' : '2' + (8 - (i % 3)) + '/' + mm), val: this.fmt(hg.prev - i * 2.37 * (hg.val > 1000 ? 1 : 0.4)) };
    });
    V.histTitle = hg.cli + ' · ' + hg.org + ' · ' + hg.mod + ' · ' + hg.ac;
    // DTE
    V.dteBoxes = s.dte.map((b, i) => ({
      cli: b.cli, cx: b.cx, code: '[' + String(b.code).padStart(2, '0') + ']', url: this.PORTAIS[b.code - 1].url, done: b.done, notDone: !b.done, meta: b.done ? b.by + ' · hoje ' + b.at : 'Não consultada hoje', metaFg: b.done ? '#B4B4BB' : '#F2B25C',
      boxBg: b.done ? '#2E9E5B' : '#1A1A1D', boxBd: b.done ? '#2E9E5B' : '#6B6B73', per: b.per,
      onPer: e => { const v = e.target.value; this.setState(st => ({ dte: st.dte.map((x, j) => j === i ? Object.assign({}, x, { per: v }) : x) })); },
      toggle: () => this.setState(st => ({ dte: st.dte.map((x, j) => j === i ? Object.assign({}, x, { done: !x.done, by: 'Matheus Silva', at: this.now(), per: x.per || '25/09 a 02/10' }) : x) }))
    }));
    V.dteNot = s.dte.filter(b => !b.done).length; V.dteDoneN = s.dte.length - V.dteNot;
    V.dteNotFg = V.dteNot ? '#F2B25C' : '#6FD69B';
    const cls = { 'Exigência': ['#F2B25C', '#3A2A10'], 'Exclusão': ['#FF6B6B', '#3A1414'], 'Cobrança': ['#B79CF5', '#2A1F45'], 'Malha': ['#6FD3E6', '#0F3238'] };
    V.dteMsgs = s.dteMsgs.map((m, i) => ({
      ...m, clsFg: (cls[m.cls] || ['#B4B4BB'])[0], clsBg: (cls[m.cls] || ['', '#26262A'])[1], hasProc: !!m.proc, noProc: !m.proc, procL: m.proc ? 'Vinculado a ' + m.proc : '', procName: m.code + '. ' + this.procName(m.code),
      openP: () => this.openProc(m.proc),
      criar: () => {
        const np = this.createProc({ cli: m.cli, code: m.code, proc: m.ass, next: 'Ler a comunicação e confirmar o canal obrigatório', resp: 'Matheus', pInt: '07/10', pExt: /\d\d\/\d\d\/\d{4}/.test(m.venc) ? m.venc.slice(0, 5) : '', fund: m.lit + ' — ' + m.regra, estab: m.estab });
        np.ciencia = m.cien.slice(0, 5); np.sit = 'and';
        this.setState(st => ({ procs: st.procs.concat([np]), dteMsgs: st.dteMsgs.map((x, j) => j === i ? Object.assign({}, x, { proc: np.id }) : x) }));
        this.toast(np.id + ' criado com prazo externo preenchido');
      }
    }));
    // Vencimentos
    const tipos = ['Todos', 'Certificado digital', 'Alvará/licença', 'Regime especial', 'Procuração', 'Mandato'];
    V.vencTabs = tipos.map(t => ({ label: t, bg: (s.vencFilter || 'Todos') === t ? '#3A1218' : '#1A1A1D', fg: (s.vencFilter || 'Todos') === t ? '#F0485F' : '#D4D4D8', bd: (s.vencFilter || 'Todos') === t ? '#7A1A28' : '#2E2E33', onClick: () => this.setState({ vencFilter: t }) }));
    const vf = s.vencFilter || 'Todos';
    const VI = this.VENC.filter(v => vf === 'Todos' || v.tipo === vf).map((v, i) => {
      const n = this.dd(v.venc); const ini = new Date(2026, +v.venc.split('/')[1] - 1, +v.venc.split('/')[0] - v.lead);
      const iniS = String(ini.getDate()).padStart(2, '0') + '/' + String(ini.getMonth() + 1).padStart(2, '0');
      const started = v.proc || (s.renov || {})[v.cli + v.item];
      const late = this.dd(iniS) <= 0;
      return Object.assign({}, v, { dias: n + ' dias', diasFg: n <= 15 ? '#F5A05A' : '#F4F4F5', ini: iniS, iniL: late ? 'Renovação deveria ter iniciado em ' + iniS : 'Iniciar renovação em ' + iniS, iniFg: late && !started ? '#F5A05A' : '#B4B4BB', started: !!started, notStarted: !started, startedL: 'Em renovação · ' + started, openS: () => this.openProc(started),
        iniciar: () => { const np = this.createProc({ cli: v.cli, code: v.code, proc: 'Renovação — ' + v.item, next: 'Verificar requisitos e documentos da renovação', resp: 'Matheus', pInt: iniS > v.venc ? v.venc : v.venc, pExt: v.venc, fund: 'Vencimento: ' + v.item }); this.setState(st => ({ procs: st.procs.concat([np]), renov: Object.assign({}, st.renov, { [v.cli + v.item]: np.id }) })); this.toast(np.id + ' criado: renovação de ' + v.item); } });
    });
    V.vencItems = VI;
    const evs = ds => VI.filter(v => v.venc === ds).map(v => ({ l: v.cli.split(' ')[0] + ' · ' + v.tipo.split(' ')[0], title: v.item }));
    V.vCalOct = this.monthGrid(2026, 9, evs); V.vCalNov = this.monthGrid(2026, 10, evs);
  }
  CLI_DET = {
    atl: {
      estabs: [
        { tipo: 'Matriz', cnpj: '12.345.678/0001-90', im: '123.456/001-08', ie: '123.456.789', mun: 'Salvador/BA', nat: '206-2 · Sociedade Empresária Limitada', reg: 'Simples Nacional' },
        { tipo: 'Filial', cnpj: '12.345.678/0002-71', im: '45.210-3', ie: '987.654.321', mun: 'Camaçari/BA', nat: '206-2 · Sociedade Empresária Limitada', reg: 'Simples Nacional' }
      ],
      contatos: [['Hugo Andrade', 'Sócio-administrador', 'hugo@atlanticodist.com.br', '(71) 99812-3344', true], ['Lúcia Andrade', 'Financeiro', 'financeiro@atlanticodist.com.br', '(71) 98744-1020', true], ['Jales Consultoria (em inclusão)', 'Futura sócia — via representante', 'contato@jales.com.br', '—', false]],
      setores: [['Fiscal', 'Carla Menezes'], ['Contábil', 'Rafael Souza'], ['Pessoal', 'Juliana Costa'], ['Procuradoria', 'Matheus Silva']],
      cred: 'Cofre Officecon › Clientes › Atlântico (pasta “Acessos”)'
    }
  };
  DIAG = [
    ['Federal', 'Receita', 'Simples Nacional (DAS)', '03/2026 a 05/2026', 'PGDAS-D', 4812.30, 'Exigível'],
    ['Federal', 'Receita', 'Parcelamento simplificado 12.345.678', '2024', 'Acordo', 36744.00, 'Parcelado'],
    ['Federal', 'PGFN', 'Inscrição 50.6.25.001234-11 (transação 9876543)', '2022–2023', 'Dívida ativa', 38988.00, 'Parcelado'],
    ['Federal', 'Receita', 'DCTFWeb', '07/2026', 'Declaração', 0, 'Omissão'],
    ['Estadual', 'SEFAZ-BA', 'ICMS antecipação parcial', '06/2026', 'Apuração', 1230.55, 'Pago não baixado'],
    ['Municipal', 'SEFAZ Salvador', 'TFF', '2026', 'Lançamento', 685.20, 'Exigível'],
    ['Municipal', 'SEFAZ Salvador', 'ISS próprio', '02/2026', 'Declaração', 312.00, 'Suspenso']
  ];
  rOutros(V, s, open) {
    V.goProc26 = e => { if (e && e.preventDefault) e.preventDefault(); this.go('proced', { procCode: '26' }); };
    // clientes
    V.cliRows = this.CLIENTES.map(c => {
      const ps = open.filter(p => p.cli === c.s); const al = ps.reduce((a, p) => a + this.alertsOf(p).length, 0);
      return { n: c.n, cnpj: c.cnpj, mun: c.mun, contato: c.contato, estabs: c.estabs === 2 ? 'Matriz + 1 filial' : (c.estabs ? 'Matriz' : 'Em abertura'), open: ps.length, al, alL: al ? al + (al > 1 ? ' alertas' : ' alerta') : '—', alFg: al ? '#F5A05A' : '#6B6B73', onClick: () => this.go('cliente', { cliId: c.id }) };
    });
    V.cliCount = V.cliRows.length; V.cliQ = s.cliQ || ''; V.onCliQ = e => this.setState({ cliQ: e.target.value });
    if (s.cliQ) { const q = s.cliQ.toLowerCase(); const qd = q.replace(/\D/g, ''); V.cliRows = V.cliRows.filter(r => r.n.toLowerCase().includes(q) || (qd && r.cnpj.replace(/\D/g, '').includes(qd))); }
    const c = this.CLIENTES.find(x => x.id === s.cliId) || this.CLIENTES[0]; const det = this.CLI_DET[c.id] || {
      estabs: [{ tipo: c.estabs ? 'Matriz' : 'Em abertura', cnpj: c.cnpj, im: c.estabs ? 'Cadastrada' : '—', ie: '—', mun: c.mun + '/BA', nat: c.n.includes('Instituto') || c.n.includes('Missão') ? '399-9 · Associação Privada' : '206-2 · Sociedade Empresária Limitada', reg: c.n.includes('Instituto') || c.n.includes('Missão') ? 'Imune/isenta (verificar)' : 'Simples Nacional' }],
      contatos: [[c.contato.split(' (')[0], c.contato.includes('(') ? c.contato.split('(')[1].replace(')', '') : 'Responsável', '—', '—', true]], setores: [['Fiscal', 'Carla Menezes'], ['Contábil', 'Rafael Souza'], ['Pessoal', 'Juliana Costa'], ['Procuradoria', 'Matheus Silva']], cred: 'Cofre Officecon › Clientes › ' + c.s
    };
    V.cl = { n: c.n, cnpj: c.cnpj, mun: c.mun, cred: det.cred };
    V.clEstabs = det.estabs; V.clContatos = det.contatos.map(x => ({ n: x[0], papel: x[1], email: x[2], tel: x[3], aut: x[4] ? 'Autorizado a solicitar' : 'Não autorizado', autFg: x[4] ? '#6FD69B' : '#8E8E96' }));
    V.clSetores = det.setores.map(x => ({ s: x[0], p: x[1] }));
    const cp = s.procs.filter(p => p.cli === c.s);
    V.clOpen = cp.filter(p => this.isOpen(p)).map(p => this.dec(p)); V.clDone = cp.filter(p => !this.isOpen(p)).map(p => this.dec(p));
    V.clOpenEmpty = V.clOpen.length === 0; V.clDoneEmpty = V.clDone.length === 0;
    V.clAcordos = s.guias.filter(g => g.cli === c.s).map(g => ({ t: g.org + ' · ' + g.mod + ' · ' + g.ac, d: 'Parcela ' + g.parc + ' · ' + this.fmt(g.val) + ' · ' + g.acSit, fg: g.acSit === 'Ativo' ? '#B4B4BB' : '#FF6B6B' }));
    V.clAcEmpty = V.clAcordos.length === 0;
    V.clVenc = this.VENC.filter(v => v.cli === c.s).map(v => ({ t: v.item, d: v.venc + ' · em ' + this.dd(v.venc) + ' dias' }));
    V.clVencEmpty = V.clVenc.length === 0;
    V.clDte = s.dte.filter(b => b.cli === c.s).map(b => ({ t: b.cx, d: b.done ? 'consultada hoje ' + b.at : 'não consultada hoje', fg: b.done ? '#B4B4BB' : '#F2B25C' }));
    V.clDteEmpty = V.clDte.length === 0;
    V.backClientes = () => this.go('clientes');
    V.novaDemCli = () => this.openNd({ ndCli: c.s });
    // biblioteca
    V.bibQ = s.bibQ; V.onBibQ = e => this.setState({ bibQ: e.target.value });
    const bq = s.bibQ.toLowerCase();
    V.bibGroups = Object.keys(this.CATS).map(k => ({ k, l: k + ' · ' + this.CATS[k], items: this.CATALOG.filter(p => p.cat === k && (!bq || (p.c + ' ' + p.n).toLowerCase().includes(bq))).map(p => { const n = open.filter(x => x.code === p.c).length; return { c: p.c, n: p.n, cnt: n ? n + (n > 1 ? ' abertos' : ' aberto') : '', hasCnt: n > 0, sites: (this.SITES[p.c] || []).length + ' sites', onClick: () => this.go('proced', { procCode: p.c }) }; }) })).filter(g => g.items.length);
    V.goPortais = () => this.go('portais'); V.goBib = () => this.go('biblioteca');
    const pc = s.procCode; const cat = this.CATALOG.find(x => x.c === pc) || this.CATALOG[2];
    const is03 = pc === '03';
    const steps = is03 ? s.modelSteps.map(m => ({ n: m.n, items: m.items.map(i => ({ t: i[0] + (i[1] ? ' *' : '') })), resp: m.resp, dias: m.dias + ' dias úteis' })) : (this.ETAPAS[pc] || []).map(n => ({ n, items: [], resp: 'Procuradoria', dias: '' }));
    const nOpen = open.filter(x => x.code === pc).length;
    V.pr = {
      c: pc, n: cat.n, cat: cat.cat + ' · ' + this.CATS[cat.cat], cnt: nOpen + (nOpen === 1 ? ' processo aberto deste tipo' : ' processos abertos deste tipo'),
      quando: is03 ? 'Quando o cliente quer constituir uma empresa nova (matriz) e a viabilidade de nome e localização já foi analisada (procedimento 02). Objetivo: empresa registrada, com CNPJ, inscrições e situação cadastral conferidos.' : (pc === '26' ? 'Rotina mensal: emitir, conferir e enviar todas as guias de parcelamento de todos os clientes, sem esquecer nenhum acordo, e controlar o pagamento.' : (pc === '43' ? 'Referência rápida dos caminhos de menu das guias federais usadas na rotina mensal.' : 'Conforme o Manual da Procuradoria. Conteúdo detalhado do objetivo e dos critérios disponível no modelo do procedimento.')),
      conclusao: is03 ? 'Empresa registrada e situação cadastral conferida; pendências tratadas em processos vinculados.' : (pc === '05' ? 'Ato registrado e CNPJ, IM, IE e licenças conferidos contra o ato.' : 'Resultado oficial conferido e checklist de conclusão completo.'),
      isRot: pc === '26', isRec: pc === '43', isNorm: pc !== '26' && pc !== '43'
    };
    V.prDocs = (this.DOCS[pc] || []).map(t => ({ t })); V.prHasDocs = V.prDocs.length > 0;
    V.prSteps = steps.map((x, i) => Object.assign(x, { i: i + 1, hasItems: x.items.length > 0, hasDias: !!x.dias })); V.prHasSteps = steps.length > 0;
    V.prSites = (this.SITES[pc] || []).map(c2 => this.portal(c2, ''));
    V.prCuid = (this.CUID[pc] || []).map(t => ({ t })); V.prHasCuid = V.prCuid.length > 0;
    V.prDeps = (this.DEPS[pc] || []).map(d => ({ t: d[0] + '. ' + d[1] })); V.prHasDeps = V.prDeps.length > 0;
    V.prRecipe = Object.keys(this.CAMINHOS).filter(k => ['Simplificado', 'PERT-SN', 'RELP', 'Previdenciário', 'Convencional'].includes(k)).map(k => { const p = this.portal(this.CAMINHOS[k][0], this.CAMINHOS[k][1]); return { mod: k, portal: p.code + ' ' + p.label, url: p.url, path: p.path, conf: 'CNPJ · acordo · nº da parcela · valor · vencimento' }; });
    V.prIniciar = () => this.openNd({ ndSel: [pc] });
    V.prAbrirRotina = () => this.go('parc', { parcTab: 'mes' });
    // portais
    V.portalQ = s.portalQ; V.onPortalQ = e => this.setState({ portalQ: e.target.value });
    const pq = s.portalQ.toLowerCase();
    V.portalGroups = ['Federal', 'Estadual', 'Municipal', 'Conselho', 'Interno'].map(esf => ({ esf, items: this.PORTAIS.filter(p => p.esf === esf && (!pq || (p.c + p.org + p.n + p.mun).toLowerCase().includes(pq))).map(p => { const used = Object.keys(this.SITES).filter(k => this.SITES[k].includes(+p.c)); return { code: '[' + p.c + ']', org: p.org, n: p.n, mun: p.mun, url: p.url, host: p.url.replace(/^https?:\/\//, '').split('/')[0], used: used.length ? used.join(', ') : '—', report: () => this.toast('Link [' + p.c + '] reportado para revisão') }; }) })).filter(g => g.items.length);
    // diagnóstico
    const stc = { 'Exigível': ['#FF6B6B', '#3A1414'], 'Parcelado': ['#D4D4D8', '#2E2E33'], 'Suspenso': ['#B79CF5', '#2A1F45'], 'Pago não baixado': ['#6FD3E6', '#0F3238'], 'Omissão': ['#F2B25C', '#3A2A10'] };
    V.diagRows = this.DIAG.map(r => ({ esf: r[0], org: r[1], trib: r[2], comp: r[3], orig: r[4], val: r[5] ? this.fmt(r[5]) : '—', st: r[6], fg: stc[r[6]][0], bg: stc[r[6]][1] }));
    V.diagTot = ['Federal', 'Estadual', 'Municipal'].map(e => { const rs = this.DIAG.filter(r => r[0] === e); return { e, tot: this.fmt(rs.reduce((a, r) => a + r[5], 0)), exig: this.fmt(rs.filter(r => r[6] === 'Exigível').reduce((a, r) => a + r[5], 0)), n: rs.length + ' itens' }; });
    V.diagDone = !!s.diagDone; V.diagNotDone = !s.diagDone;
    V.diagGerar = () => {
      const a = this.createProc({ cli: 'Techsale Comércio', code: '22', proc: 'Regularizar DAS 03 a 05/2026', next: 'Simular parcelamento do Simples Nacional', resp: 'Matheus', pInt: '14/10' });
      const b = Object.assign(this.createProc({ cli: 'Techsale Comércio', code: '20', proc: 'TFF 2026 — Salvador', next: 'Emitir DAM atualizado', resp: 'Ana', pInt: '09/10' }), { id: 'P-' + (+a.id.slice(2) + 1) });
      const c2 = Object.assign(this.createProc({ cli: 'Techsale Comércio', code: '41', proc: 'Omissão DCTFWeb 07/2026', next: 'Encaminhar omissão ao Fiscal', resp: 'Carla', pInt: '07/10' }), { id: 'P-' + (+a.id.slice(2) + 2) });
      [a, b, c2].forEach(x => x.parent = 'P-108');
      this.setState(st => ({ procs: st.procs.concat([a, b, c2]), diagDone: true })); this.toast('3 processos de regularização criados e vinculados a P-108');
    };
    V.openP108 = () => this.openProc('P-108');
    // relatórios
    const bar = (arr, color) => { const mx = Math.max(...arr.map(x => x[1]), 1); return arr.map(x => ({ l: x[0], n: x[1], nl: x[2] || String(x[1]), w: (x[1] / mx * 100) + '%', bg: x[3] || color })); };
    V.rSit = bar(['nao', 'and', 'cli', 'org', 'set'].map(k => [this.SIT[k].l, open.filter(p => p.sit === k).length, null, this.SIT[k].dot]));
    V.rFase = bar(this.FASES_ALL.map((f, i) => [f, open.filter(p => { const st = this.steps(p); const fs = st.length === 5 ? this.FASES5 : this.FASES6; return fs[p.step - 1] === f; }).length]), '#F0485F');
    V.rParado = bar([['Cliente', 'cli'], ['Órgão', 'org'], ['Setor', 'set']].map(([l, k]) => { const ps = open.filter(p => p.sit === k); const t = ps.reduce((a, p) => a + p.dias, 0); return [l, t, t + ' dias somados · média ' + (ps.length ? (t / ps.length).toFixed(1).replace('.', ',') : '0') + ' dias', this.SIT[k].dot]; }));
    V.rVencResp = bar(['Matheus', 'Ana', 'Carla'].map(k => [this.PEOPLE[k][0], open.filter(p => p.resp === k && this.minDays(p) < 0).length]), '#D64545');
    const can = {}; s.dems.forEach(d => { can[d.canal] = (can[d.canal] || 0) + 1; });
    V.rCanal = bar(Object.keys(can).sort((a, b) => can[b] - can[a]).map(k => [k, can[k]]), '#F0485F');
    const vol = {}; s.procs.forEach(p => { vol[p.cli] = (vol[p.cli] || 0) + 1; });
    V.rTop = bar(Object.keys(vol).sort((a, b) => vol[b] - vol[a]).slice(0, 5).map(k => [k, vol[k]]), '#F0485F');
    V.rTempo = bar([['05. Alteração contratual', 18, '18 dias úteis'], ['03. Abertura de empresa', 24, '24 dias úteis'], ['12. Alvará de funcionamento', 15, '15 dias úteis'], ['34. Cancelamento de nota', 21, '21 dias úteis'], ['18. Certidões', 2, '2 dias úteis']], '#71717A');
    const G = s.guias; const env = 19 + G.filter(g => ['enviada', 'paga', 'baixada'].includes(g.st)).length; const pag = 10 + G.filter(g => ['paga', 'baixada'].includes(g.st)).length; const emit = 41 - (3 + G.filter(g => g.st === 'emitir').length);
    V.rGuias = bar([['Emitidas', emit], ['Enviadas', env], ['Pagas', pag]], '#F0485F');
    const vt = {}; this.VENC.forEach(v => { vt[v.tipo] = (vt[v.tipo] || 0) + 1; });
    V.rVenc60 = bar(Object.keys(vt).map(k => [k, vt[k]]), '#71717A');
    V.rAbertos = 14; V.rConcl = 11;
    V.rExport = () => this.toast('Relatório exportado (CSV) — período: outubro/2026');
    // configurações
    V.cfgTabs = [['equipe', 'Equipe'], ['modelo', 'Modelos de procedimento'], ['alertas', 'Parâmetros de alerta'], ['notion', 'Importação do Notion']].map(([k, l]) => ({ label: l, fg: s.cfgTab === k ? '#F0485F' : '#A1A1AA', bd: s.cfgTab === k ? '#F0485F' : 'transparent', onClick: () => this.setState({ cfgTab: k }) }));
    ['equipe', 'modelo', 'alertas', 'notion'].forEach(k => { V['cfg' + k[0].toUpperCase() + k.slice(1)] = s.cfgTab === k; });
    const perf = { Matheus: 'Procuradoria — edição', Ana: 'Procuradoria — edição', Carla: 'Setores — consulta e pendências próprias', Rafael: 'Setores — consulta e pendências próprias', Juliana: 'Setores — consulta e pendências próprias', Paulo: 'Liderança — tudo' };
    const subs = { Matheus: 'Ana Ribeiro', Ana: 'Matheus Silva', Carla: 'Paulo Lima', Rafael: 'Paulo Lima', Juliana: 'Paulo Lima', Paulo: '—' };
    V.team = Object.keys(this.PEOPLE).map(k => ({ n: this.PEOPLE[k][0], ini: this.PEOPLE[k][1], setor: this.PEOPLE[k][2], perfil: perf[k], sub: subs[k], aus: s.absent[k] ? 'Ausente hoje' : 'Presente', ausFg: s.absent[k] ? '#F5A05A' : '#B4B4BB', btn: s.absent[k] ? 'Marcar presente' : 'Marcar ausente', toggle: () => { this.setState(st => ({ absent: Object.assign({}, st.absent, { [k]: !st.absent[k] }) })); this.toast(s.absent[k] ? this.PEOPLE[k][0] + ' presente' : 'Processos de ' + this.PEOPLE[k][0] + ' passam para o painel de ' + subs[k]); } }));
    V.modelSteps = s.modelSteps.map((m, i) => ({
      i: i + 1, n: m.n, cnt: m.items.length + ' itens', resp: m.resp, dias: m.dias, bg: s.modelSel === i ? '#26262A' : '#1A1A1D', bd: s.modelSel === i ? '#3A3A40' : '#2E2E33',
      onClick: () => this.setState({ modelSel: i }),
      onDragStart: () => { this.mDrag = i; }, onDrop: e => { e.preventDefault(); const from = this.mDrag; if (from === undefined || from === i) return; const arr = s.modelSteps.slice(); const [x] = arr.splice(from, 1); arr.splice(i, 0, x); this.setState({ modelSteps: arr, modelSel: i }); this.mDrag = undefined; },
      up: () => { if (!i) return; const arr = s.modelSteps.slice(); [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; this.setState({ modelSteps: arr, modelSel: i - 1 }); }
    }));
    const ms = s.modelSteps[s.modelSel] || s.modelSteps[0];
    V.ms = { n: ms.n, resp: ms.resp, dias: ms.dias };
    const updItems = (fn) => { const arr = s.modelSteps.map((m, j) => j === s.modelSel ? Object.assign({}, m, { items: fn(m.items.map(x => x.slice())) }) : m); this.setState({ modelSteps: arr }); };
    V.msItems = ms.items.map((it, j) => ({ t: it[0], obL: it[1] ? 'Obrigatório' : 'Opcional', obBg: it[1] ? '#2E2E33' : '#1A1A1D', obFg: it[1] ? '#F0485F' : '#8E8E96', evL: it[2] ? 'Exige evidência' : 'Sem evidência', evBg: it[2] ? '#2E2E33' : '#1A1A1D', evFg: it[2] ? '#F0485F' : '#8E8E96', togOb: () => updItems(a => { a[j][1] = !a[j][1]; return a; }), togEv: () => updItems(a => { a[j][2] = !a[j][2]; return a; }), del: () => updItems(a => a.filter((_, x) => x !== j)) }));
    V.msNew = s.msNew || ''; V.onMsNew = e => this.setState({ msNew: e.target.value });
    V.msAdd = () => { if (!(s.msNew || '').trim()) return; updItems(a => a.concat([[s.msNew.trim(), false, false]])); this.setState({ msNew: '' }); };
    V.onMsDias = e => { const v = +e.target.value || 0; this.setState({ modelSteps: s.modelSteps.map((m, j) => j === s.modelSel ? Object.assign({}, m, { dias: v }) : m) }); };
    V.msSites = [[1, 'Guias por ato'], [2, 'REGIN'], [3, 'REDESIM'], [4, 'MAT']].slice(s.modelSel % 2, s.modelSel % 2 + 2).map(x => ({ t: '[' + String(x[0]).padStart(2, '0') + '] ' + x[1] }));
    V.msDeps = this.DEPS['03'].map(d => ({ t: d[0] + '. ' + d[1] }));
    V.saveModel = () => this.toast('Modelo “03. Abrir empresa: matriz” salvo — vale para novos processos');
    const ap = s.alertParams;
    V.apRows = [['venc3', 'Antecedência do alerta “vence em breve”', 'dias'], ['cli', 'Aguardando cliente — alertar após', 'dias'], ['org', 'Aguardando órgão — alertar após', 'dias'], ['set', 'Aguardando setor — alertar após', 'dias'], ['semAtu', 'Sem atualização — alertar após', 'dias'], ['certAnt', 'Certificados — iniciar renovação com', 'dias de antecedência'], ['alvAnt', 'Alvarás e licenças — iniciar renovação com', 'dias de antecedência']].map(([k, l, u]) => ({ l, u, v: ap[k], on: e => this.setState({ alertParams: Object.assign({}, ap, { [k]: +e.target.value || 0 }) }) }));
    V.notionImport = () => this.toast('47 linhas importadas como 39 demandas e 52 processos (prévia)');
  }
  CONCL = ['Resultado oficial conferido', 'Dados corretos e documento final autêntico', 'Cadastros e tarefas dependentes atualizados', 'Pagamentos e obrigações remanescentes identificados', 'Cliente e setores informados', 'Próximo vencimento ou acompanhamento programado'];
  rModals(V, s) {
    const M = s.modal; V.modalOpen = !!M;
    ['demanda', 'aguard', 'concl', 'cancel', 'prazo', 'msg'].forEach(k => { V['m' + k[0].toUpperCase() + k.slice(1)] = M === k; });
    V.closeModal = () => this.setState({ modal: null }); V.stop = e => e.stopPropagation();
    const p = this.getProc(s.mProc) || s.procs[0];
    V.mp = { id: p.id, cli: p.cli, proc: p.proc };
    // aguardando
    const T = s.mTarget; V.mTitle2 = T ? 'Mudar para ' + this.SIT[T].l : '';
    V.mDot = T ? this.SIT[T].dot : '#ccc';
    V.agCli = T === 'cli'; V.agOrg = T === 'org'; V.agSet = T === 'set';
    V.mMotivo = s.mMotivo; V.onMMotivo = e => this.setState({ mMotivo: e.target.value, mErr: false });
    V.mProt = s.mProt; V.onMProt = e => this.setState({ mProt: e.target.value, mErr: false });
    V.mErr = s.mErr;
    V.protOpts = (this.PROT[p.id] || []).map(x => ({ l: x[0] + ' · ' + x[1], onClick: () => this.setState({ mProt: x[0] + ' · ' + x[1] }) }));
    V.hasProtOpts = V.protOpts.length > 0;
    V.setorOpts = ['Fiscal', 'Contábil', 'Pessoal'].map(k => ({ l: k, bg: s.mSetor === k ? '#0F3238' : '#1A1A1D', bd: s.mSetor === k ? '#1395B0' : '#3A3A40', fg: s.mSetor === k ? '#6FD3E6' : '#D4D4D8', onClick: () => this.setState({ mSetor: k }) }));
    V.agErrL = T === 'org' ? 'Vincule um protocolo para marcar como aguardando órgão.' : 'Informe o que está faltando.';
    V.confirmAg = () => {
      if (!s.mMotivo.trim() && T !== 'org') { this.setState({ mErr: true }); return; }
      if (T === 'org' && !s.mProt.trim()) { this.setState({ mErr: true }); return; }
      const mot = T === 'org' ? 'Protocolo ' + s.mProt.trim() + (s.mMotivo.trim() ? ' — ' + s.mMotivo.trim() : '') : s.mMotivo.trim();
      this.updProc(p.id, { sit: T, dias: 0, setor: T === 'set' ? s.mSetor : '', motivo: mot });
      this.addEv(p.id, 'Mudança de situação', 'Situação → ' + this.SIT[T].l + (T === 'set' ? ' (' + s.mSetor + ')' : '') + '. ' + (T === 'cli' ? 'Falta: ' : T === 'set' ? 'Pendência: ' : '') + mot + '. Contador “parado há” iniciado.', 'auto');
      fetch('http://localhost:3001/api/processos/' + p.id + '/situacao', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situacao: T, motivo: mot, protocolo: s.mProt.trim(), setor: s.mSetor })
      }).catch(() => {});
      this.setState({ modal: null }); this.toast(p.id + ' → ' + this.SIT[T].l);
    };
    // conclusão
    V.conclItems = this.CONCL.map((t, i) => ({ t, bg: s.concl[i] ? '#2E9E5B' : '#1A1A1D', bd: s.concl[i] ? '#2E9E5B' : '#6B6B73', mk: s.concl[i] ? '✓' : '', onClick: () => { const c = s.concl.slice(); c[i] = !c[i]; this.setState({ concl: c }); } }));
    const all = s.concl.every(Boolean); V.conclN = s.concl.filter(Boolean).length;
    V.conclBtnBg = all ? '#C8102E' : '#3A3A40'; V.conclStage1 = s.conclStage === 1; V.conclStage2 = s.conclStage === 2;
    V.conclNext = () => { if (!all) { this.toast('Complete os 6 itens do checklist de conclusão'); return; } this.setState({ conclStage: 2 }); };
    const deps = this.depsFor(p);
    V.depItems = deps.map((d, i) => ({ t: (d[0] ? d[0] + '. ' : '') + d[1], bg: s.deps[i] ? '#F0485F' : '#1A1A1D', bd: s.deps[i] ? '#F0485F' : '#6B6B73', mk: s.deps[i] ? '✓' : '', onClick: () => { const c = s.deps.slice(); c[i] = !c[i]; this.setState({ deps: c }); } }));
    V.conclFinish = () => {
      const base = 116 + s.procs.filter(x => +x.id.slice(2) >= 116).length; const nps = [];
      deps.forEach((d, i) => { if (s.deps[i] && d[0]) { const np = this.createProc({ cli: p.cli, code: d[0], proc: d[1], next: 'Iniciar: ' + d[1].toLowerCase(), resp: p.resp || 'Matheus', pInt: '09/10', dem: p.dem }); np.id = 'P-' + (base + nps.length); np.parent = p.id; nps.push(np); } });
      this.setState(st => ({ procs: st.procs.map(x => x.id === p.id ? Object.assign({}, x, { sit: 'conc', concl: '02/10', next: '', step: this.steps(x).length }) : x).concat(nps), modal: null }));
      this.addEv(p.id, 'Mudança de situação', 'Processo concluído com checklist de conclusão completo.' + (nps.length ? ' Gerados: ' + nps.map(x => x.id + ' ' + x.proc).join(', ') + '.' : ''), 'auto');
      fetch('http://localhost:3001/api/processos/' + p.id + '/concluir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataConclusao: '02/10/2026' })
      }).catch(() => {});
      this.toast(p.id + ' concluído' + (nps.length ? ' · ' + nps.length + ' processos dependentes criados' : ''));
    };
    // cancelar
    V.confirmCancel = () => { if (!s.mMotivo.trim()) { this.setState({ mErr: true }); return; } this.updProc(p.id, { sit: 'canc', next: '' }); this.addEv(p.id, 'Mudança de situação', 'Processo cancelado. Motivo: ' + s.mMotivo.trim() + '.', 'auto'); this.setState({ modal: null }); this.toast(p.id + ' cancelado'); };
    // prazo externo
    V.pxData = s.pxData.includes('/') ? s.pxData.split('/').reverse().join('-') : s.pxData; V.pxCien = s.pxCien.includes('/') ? s.pxCien.split('/').reverse().join('-') : s.pxCien; V.pxFund = s.pxFund;
    V.onPxData = e => this.setState({ pxData: e.target.value, mErr: false }); V.onPxCien = e => this.setState({ pxCien: e.target.value }); V.onPxFund = e => this.setState({ pxFund: e.target.value, mErr: false });
    V.savePrazo = () => {
      if (!s.pxData || !s.pxFund.trim()) { this.setState({ mErr: true }); return; }
      const f = x => x.includes('-') ? x.split('-').reverse().slice(0, 2).join('/') : x.slice(0, 5);
      this.updProc(p.id, { pExt: f(s.pxData), ciencia: s.pxCien ? f(s.pxCien) : '', fund: s.pxFund.trim() });
      this.addEv(p.id, 'Nota', 'Prazo externo definido: ' + f(s.pxData) + ' (' + s.pxFund.trim() + ').', 'auto'); this.setState({ modal: null }); this.toast('Prazo externo salvo');
    };
    // mensagem
    V.msgTitle = s.mTitle; V.msgText = s.mText; V.copyMsg = () => this.copy(s.mText);
    // nova demanda
    V.ndStep1 = s.ndStep === 1; V.ndStep2 = s.ndStep === 2;
    V.ndS1Bg = '#C8102E'; V.ndS2Bg = s.ndStep === 2 ? '#C8102E' : '#3A3A40';
    ['ndCli', 'ndSolic', 'ndData', 'ndDesc', 'ndAnexos', 'ndQ', 'ndResp', 'ndPrazo', 'ndNext', 'ndEstab'].forEach(k => { V[k] = s[k]; V['on' + k[0].toUpperCase() + k.slice(1)] = e => this.setState({ [k]: e.target.value, ndErr: '' }); });
    V.ndErr = s.ndErr; V.hasNdErr = !!s.ndErr;
    const cq = s.ndCli.toLowerCase(); const exact = this.CLIENTES.find(c => c.s === s.ndCli || c.n === s.ndCli);
    V.ndCliSug = cq && !exact ? this.CLIENTES.filter(c => (c.n + c.cnpj).toLowerCase().includes(cq) || c.cnpj.replace(/\D/g, '').includes(cq.replace(/\D/g, '') || '#')).slice(0, 5).map(c => ({ n: c.n, cnpj: c.cnpj, onClick: () => this.setState({ ndCli: c.s, ndSolic: s.ndSolic || c.contato.split(' (')[0] }) })) : [];
    V.ndShowSug = V.ndCliSug.length > 0; V.ndNovoCli = cq.length > 2 && !exact && V.ndCliSug.length === 0;
    V.ndCliSel = !!exact; V.ndCliInfo = exact ? exact.n + ' · ' + exact.cnpj + ' · ' + exact.mun : '';
    V.ndEstabOpts = exact && exact.estabs === 2 ? [{ v: 'Matriz', l: 'Matriz · 12.345.678/0001-90' }, { v: 'Filial', l: 'Filial Camaçari · 12.345.678/0002-71' }] : [{ v: 'Matriz', l: 'Matriz' }];
    V.ndCanais = ['WhatsApp', 'E-mail', 'Interno', 'DTE', 'Telefone'].map(k => ({ l: k, bg: s.ndCanal === k ? '#3A1218' : '#1A1A1D', bd: s.ndCanal === k ? '#7A1A28' : '#3A3A40', fg: s.ndCanal === k ? '#F0485F' : '#D4D4D8', onClick: () => this.setState({ ndCanal: k }) }));
    V.ndToStep2 = () => { if (!s.ndCli.trim() || !s.ndDesc.trim()) { this.setState({ ndErr: 'Informe o cliente e a descrição do pedido.' }); return; } this.setState({ ndStep: 2, ndErr: '' }); };
    V.ndBack = () => this.setState({ ndStep: 1 });
    V.ndCats = [{ k: '', l: 'Todas' }].concat(Object.keys(this.CATS).map(k => ({ k, l: k + ' · ' + this.CATS[k].split(',')[0] }))).map(c => ({ l: c.l, bg: s.ndCat === c.k ? '#3A1218' : '#1A1A1D', fg: s.ndCat === c.k ? '#F0485F' : '#B4B4BB', bd: s.ndCat === c.k ? '#7A1A28' : '#2E2E33', onClick: () => this.setState({ ndCat: c.k }) }));
    const nq = s.ndQ.toLowerCase();
    V.ndProcs = this.CATALOG.filter(c => (!s.ndCat || c.cat === s.ndCat) && (!nq || (c.c + ' ' + c.n).toLowerCase().includes(nq)) && c.c !== '26' && c.c !== '27').map(c => { const on = s.ndSel.includes(c.c); return { c: c.c, n: c.n, bg: on ? '#26262A' : '#1A1A1D', mk: on ? '✓' : '', boxBg: on ? '#F0485F' : '#1A1A1D', boxBd: on ? '#F0485F' : '#6B6B73', onClick: () => this.setState({ ndSel: on ? s.ndSel.filter(x => x !== c.c) : s.ndSel.concat([c.c]), ndErr: '' }) }; });
    const dias = { '03': 18, '05': 15, '12': 10, '18': 2, '34': 15, '10': 8, '07': 20, '17': 5 };
    V.ndPrev = s.ndSel.map(code => ({ c: code, n: this.procName(code), etapas: (this.ETAPAS[code] || this.FASES6).map((e, i) => ({ t: (i + 1) + '. ' + e })), docs: (this.DOCS[code] || ['Documentos conforme o Manual']).map(t => ({ t })), prazo: (dias[code] || 10) + ' dias úteis', remove: () => this.setState({ ndSel: s.ndSel.filter(x => x !== code) }) }));
    V.ndHasSel = s.ndSel.length > 0; V.ndNoSel = !V.ndHasSel; V.ndSelN = s.ndSel.length;
    V.ndCriarL = s.ndSel.length > 1 ? 'Criar ' + s.ndSel.length + ' processos' : 'Criar processo';
    V.ndCopyDocs = () => {
      const docs = []; s.ndSel.forEach(c => (this.DOCS[c] || []).forEach(d => { if (!docs.includes(d)) docs.push(d); }));
      const nome = (s.ndSolic || 'tudo bem').split(' ')[0];
      this.showMsg('Lista de documentos para o cliente', 'Olá, ' + nome + '! Para darmos andamento ao seu pedido, precisamos dos seguintes documentos:\n\n' + docs.map(d => '• ' + d).join('\n') + '\n\nPode enviar por aqui mesmo. Qualquer dúvida, estamos à disposição.\nProcuradoria · Officecon');
    };
    V.ndCriar = () => {
      if (!s.ndSel.length) { this.setState({ ndErr: 'Escolha pelo menos um procedimento.' }); return; }
      if (!s.ndNext.trim()) { this.setState({ ndErr: 'Defina a primeira próxima ação — todo processo aberto precisa de uma.' }); return; }
      const base = 116 + s.procs.filter(x => +x.id.slice(2) >= 116).length;
      const demId = s.ndDem || ('D-0' + (65 + s.dems.filter(d => +d.id.slice(2) >= 65).length));
      const pInt = s.ndPrazo ? s.ndPrazo.split('-').reverse().slice(0, 2).join('/') : '';
      const nps = s.ndSel.map((code, i) => { const np = this.createProc({ cli: s.ndCli, code, next: s.ndNext.trim(), resp: s.ndResp, pInt, dem: demId, estab: s.ndEstab }); np.id = 'P-' + (base + i); np.sit = 'and'; return np; });
      const ids = nps.map(x => x.id);
      this.setState(st => ({
        procs: st.procs.concat(nps), modal: null, screen: 'demandas', demTab: 'Todas',
        dems: st.ndDem ? st.dems.map(d => d.id === st.ndDem ? Object.assign({}, d, { procs: d.procs.concat(ids), st: 'Convertida' }) : d) : [{ id: demId, data: s.ndData, canal: s.ndCanal, cli: s.ndCli, solic: s.ndSolic || '—', desc: s.ndDesc, procs: ids, st: 'Convertida' }].concat(st.dems)
      }));
      fetch('http://localhost:3001/api/demandas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteNome: s.ndCli,
          solicitante: s.ndSolic || '—',
          canal: s.ndCanal,
          dataRecebimento: s.ndData,
          descricao: s.ndDesc,
          anexos: s.ndAnexos,
          procedimentos: s.ndSel.map(code => ({
            codigoProcedimento: code,
            titulo: this.procName(code),
            responsavel: s.ndResp,
            prazoInterno: pInt,
            proximaAcao: s.ndNext.trim()
          }))
        })
      }).catch(() => {});
      this.toast(demId + ' registrada · ' + ids.join(', ') + ' criados');
    };
  }
  FASES6 = ['Captação', 'Planejamento', 'Execução', 'Conclusão', 'Conferência', 'Sistematização'];
  FASES_ALL = ['Captação', 'Planejamento', 'Execução', 'Conclusão', 'Conferência', 'Sistematização'];
  FASES5 = ['Captação', 'Planejamento', 'Execução', 'Conclusão', 'Sistematização'];
  rFicha(V, s) {
    const p = this.getProc(s.procId) || s.procs[0]; const d = this.dec(p); const st = this.steps(p); const R = this.RICH[p.id] || {};
    const sel = s.stepSel || Math.min(p.step, st.length); const per = this.PEOPLE[p.resp]; const isOpen = this.isOpen(p);
    const dem = s.dems.find(x => x.id === p.dem); const m = this.minDays(p);
    const prio = m <= 0 ? ['Urgente', '#FF6B6B'] : m <= 3 ? ['Alta', '#F5A05A'] : ['Normal', '#B4B4BB'];
    const fases = st.length === 5 ? this.FASES5 : this.FASES6;
    V.f = Object.assign(d, {
      subN: p.resp === 'Ana' ? 'Matheus Silva' : 'Ana Ribeiro', ci: this.chip(p.pInt), ce: this.chip(p.pExt), hasExt: !!p.pExt, noExt: !p.pExt, hasInt: !!p.pInt, noInt: !p.pInt,
      extTitle: p.pExt ? 'Data de ciência: ' + (p.ciencia || '—') + ' · Fundamento: ' + (p.fund || '—') : '',
      extInfo: p.pExt ? ((p.ciencia ? 'Ciência ' + p.ciencia + ' · ' : '') + (p.fund || '')) : '',
      demL: dem ? dem.id + ' · ' + dem.canal + ' · ' + dem.data.slice(0, 5) + ' · ' + dem.solic : 'Sem demanda vinculada',
      prio: prio[0], prioFg: prio[1], prioWhy: m === 999 ? 'sem prazo definido' : (m < 0 ? 'prazo vencido' : m === 0 ? 'vence hoje' : 'prazo mais próximo em ' + m + ' dias'),
      blocked: !!p.blocked, blockedL: p.blocked ? 'Bloqueado por ' + p.blocked + ' — ' + ((this.getProc(p.blocked) || {}).proc || '') : '', openBlock: () => this.openProc(p.blocked),
      nextResp: per ? per[0] : 'Sem responsável', nextDate: p.pInt || 'sem data', isOpen, concluded: p.sit === 'conc',
      alerts: this.alertsOf(p).map(a => ({ l: a })), hasAlerts: this.alertsOf(p).length > 0, fase: fases[Math.min(p.step, st.length) - 1],
      openProcLib: () => this.go('proced', { procCode: p.code }), openDem: () => this.go('demandas'),
      cliClick: () => this.go(p.cli === 'Atlântico Distribuidora' ? 'cliente' : 'clientes', { cliId: 'atl' })
    });
    V.backProcs = () => this.go('processos'); V.f.isDiag = p.code === '17'; V.f.procCat = p.code + '. ' + this.procName(p.code); V.goDiag = () => this.go('diag');
    V.toggleSitMenu = () => this.setState({ sitMenu: !s.sitMenu }); V.sitMenu = s.sitMenu && isOpen;
    V.sitMenuOpts = ['nao', 'and', 'cli', 'org', 'set', 'conc', 'canc'].filter(k => k !== p.sit).map(k => ({ l: this.SIT[k].l, dot: this.SIT[k].dot, hint: { cli: 'pede o que falta', org: 'pede o protocolo', set: 'pede o setor', conc: 'abre o checklist de conclusão', canc: 'pede o motivo' }[k] || '', onClick: () => this.changeSit(p.id, k) }));
    V.fResp2 = p.resp; V.onReassign = e => { const v = e.target.value; this.updProc(p.id, { resp: v }); this.addEv(p.id, 'Nota', 'Reatribuído para ' + this.PEOPLE[v][0] + '.', 'auto'); this.toast(p.id + ' reatribuído para ' + this.PEOPLE[v][0]); };
    V.reassignOpts = ['Matheus', 'Ana', 'Carla', 'Rafael', 'Juliana'].map(k => ({ v: k, l: this.PEOPLE[k][0] }));
    V.onDuplicar = () => { const np = this.createProc({ cli: p.cli, code: p.code, proc: p.proc + ' (cópia)', next: p.next, resp: p.resp, pInt: p.pInt, dem: p.dem }); this.setState(st2 => ({ procs: st2.procs.concat([np]) })); this.toast('Duplicado como ' + np.id); };
    V.onCancelar = () => this.changeSit(p.id, 'canc'); V.onConcluir = () => this.changeSit(p.id, 'conc');
    V.onPrazoExt = () => this.setState({ modal: 'prazo', mProc: p.id, pxData: p.pExt ? p.pExt + '/2026' : '', pxCien: p.ciencia ? p.ciencia + '/2026' : '', pxFund: p.fund || '', mErr: false });
    // next action
    V.nxEdit = s.nxEdit; V.nxView = !s.nxEdit; V.nxText = s.nxText; V.nxDate = s.nxDate; V.nxResp = s.nxResp; V.nxErr = s.nxErr;
    V.startNx = () => this.setState({ nxEdit: true, nxText: '', nxResp: p.resp || 'Matheus', nxDate: '', nxErr: false });
    V.cancelNx = () => this.setState({ nxEdit: false, nxErr: false });
    V.onNxText = e => this.setState({ nxText: e.target.value, nxErr: false }); V.onNxDate = e => this.setState({ nxDate: e.target.value }); V.onNxResp = e => this.setState({ nxResp: e.target.value });
    V.saveNx = () => {
      if (!s.nxText.trim()) { this.setState({ nxErr: true }); return; }
      const old = p.next; const dt = s.nxDate ? s.nxDate.split('-').reverse().slice(0, 2).join('/') : p.pInt;
      this.updProc(p.id, { next: s.nxText.trim(), resp: s.nxResp, pInt: dt });
      this.addEv(p.id, 'Nota', (old ? 'Ação concluída: “' + old + '”. ' : '') + 'Próxima ação: “' + s.nxText.trim() + '” — ' + this.PEOPLE[s.nxResp][0] + (dt ? ', até ' + dt : '') + '.', 'auto');
      this.setState({ nxEdit: false }); this.toast('Próxima ação atualizada');
    };
    // stepper
    V.fSteps = st.map((nm, i) => {
      const n = i + 1; const na = R[n] && R[n].na;
      const state = p.sit === 'conc' ? 'done' : na ? 'na' : n < p.step ? 'done' : n === p.step ? 'cur' : 'fut';
      const c = { done: ['#2E9E5B', '#FFFFFF', '2px solid #2E9E5B', '✓'], cur: ['#C8102E', '#FFFFFF', '2px solid #F0485F', String(n)], fut: ['#1A1A1D', '#8E8E96', '1.5px solid #3A3A40', String(n)], na: ['#1A1A1D', '#6B6B73', '1.5px dashed #6B6B73', '—'] }[state];
      return { n, name: nm, fase: fases[i], state, cBg: c[0], cFg: c[1], cBd: c[2], sym: c[3], lblFg: n === sel ? '#F4F4F5' : '#A1A1AA', lblFw: n === sel ? '600' : '500', selBg: n === sel ? '#26262A' : 'transparent', selBd: n === sel ? '#3A3A40' : 'transparent', lineBg: (state === 'done' || state === 'na') ? '#2E9E5B' : '#2E2E33', lineShow: i < st.length - 1, onClick: () => this.setState({ stepSel: n, evIdx: null }) };
    });
    const sst = V.fSteps[sel - 1].state; const Rs = R[sel] || {};
    const items = this.getItems(p, sel);
    const setor = Rs.setor || ({ '17': { 5: 'Fiscal' }, '29': { 3: 'Fiscal' }, '24': { 4: 'Cliente' }, '34': { 3: 'Cliente' } }[p.code] || {})[sel] || 'Procuradoria';
    V.fs = { n: sel, name: st[sel - 1], fase: fases[sel - 1], stL: { done: 'Concluída', cur: 'Etapa atual', fut: 'Etapa futura', na: 'Não se aplica' }[sst], stFg: { done: '#6FD69B', cur: '#F0485F', fut: '#8E8E96', na: '#8E8E96' }[sst], setor, resp: Rs.resp ? this.PEOPLE[Rs.resp][0] : (setor === 'Fiscal' ? 'Carla Menezes' : (per ? per[0] : '—')), isNa: !!Rs.na, notNa: !Rs.na, naJust: Rs.na || '', prog: items.filter(i => i.done).length + ' de ' + items.length + ' itens', total: st.length };
    V.evText = s.evText; V.evErr = s.evErr; V.evKind = s.evKind || 'Protocolo';
    V.onEvText = e => this.setState({ evText: e.target.value, evErr: false }); V.onEvKind = e => this.setState({ evKind: e.target.value });
    V.cancelEv = () => this.setState({ evIdx: null });
    V.fItems = items.map((it, i) => ({
      t: it.t, req: it.req, done: it.done, notDone: !it.done, meta: '✓ ' + it.by + ' · ' + it.when + (it.ev ? ' · ' + it.ev : ''), hasNote: !it.done && !!it.note, note: it.note,
      boxBg: it.done ? '#2E9E5B' : '#1A1A1D', boxBd: it.done ? '#2E9E5B' : '#6B6B73', tFg: it.done ? '#B4B4BB' : '#F4F4F5', evOpen: s.evIdx === i, reqTag: it.req ? 'exige evidência' : '',
      onToggle: () => {
        if (!isOpen) return;
        const nx = items.map(x => Object.assign({}, x));
        if (it.done) { nx[i] = Object.assign(nx[i], { done: false, by: '', when: '', ev: '' }); this.setItems(p, sel, nx); this.addEv(p.id, 'Nota', 'Checklist reaberto: “' + it.t + '”.', 'auto'); }
        else if (it.req) this.setState({ evIdx: i, evText: '', evErr: false });
        else { nx[i] = Object.assign(nx[i], { done: true, by: 'Matheus', when: '02/10', ev: '' }); this.setItems(p, sel, nx); this.addEv(p.id, 'Nota', 'Checklist concluído: “' + it.t + '”.', 'auto'); }
      },
      onConfirm: () => {
        if (!s.evText.trim()) { this.setState({ evErr: true }); return; }
        const ev = (s.evKind || 'Protocolo') + ' ' + s.evText.trim();
        const nx = items.map(x => Object.assign({}, x)); nx[i] = Object.assign(nx[i], { done: true, by: 'Matheus', when: '02/10', ev });
        this.setItems(p, sel, nx); this.addEv(p.id, 'Nota', 'Checklist concluído: “' + it.t + '” — evidência: ' + ev + '.', 'fato'); this.setState({ evIdx: null }); this.updProc(p.id, {});
      }
    }));
    V.hasItems = items.length > 0;
    V.addItemOpen = !!s.addItemOpen; V.addItemText = s.addItemText || ''; V.addItemReq = !!s.addItemReq;
    V.openAddItem = () => this.setState({ addItemOpen: true, addItemText: '', addItemReq: false });
    V.onAddItemText = e => this.setState({ addItemText: e.target.value }); V.toggleAddReq = () => this.setState({ addItemReq: !s.addItemReq });
    V.addItemReqL = s.addItemReq ? '☑ Obrigatório (exige evidência)' : '☐ Obrigatório (exige evidência)';
    V.saveAddItem = () => { if (!(s.addItemText || '').trim()) return; this.setItems(p, sel, items.concat([{ t: s.addItemText.trim(), req: !!s.addItemReq, done: false, by: '', when: '', ev: '', note: '' }])); this.setState({ addItemOpen: false }); };
    V.cancelAddItem = () => this.setState({ addItemOpen: false });
    const sites = Rs.sites ? Rs.sites.map(x => this.portal(x[0], x[1])) : (this.SITES[p.code] || []).slice(0, 4).map(c => this.portal(c, ''));
    V.fSites = sites; V.hasSites = sites.length > 0; V.noSites = sites.length === 0;
    let docs = Rs.docs || ((sel === 1 || sel === p.step) && !this.RICH[p.id] ? (this.DOCS[p.code] || []).map((n, i) => [n, i < 2 ? 'Recebido' : 'Pendente']) : []);
    const ds = s.docSt || {};
    docs = docs.map((x, i) => { const k = p.id + '-' + sel + '-' + i; return [x[0], ds[k] || x[1], k]; });
    const dStyle = { Pendente: ['#F2B25C', '#3A2A10'], Recebido: ['#D4D4D8', '#2E2E33'], Conferido: ['#6FD69B', '#13301F'] };
    V.fDocs = docs.map(x => ({ n: x[0], st: x[1], fg: dStyle[x[1]][0], bg: dStyle[x[1]][1], onCycle: () => { const nx = { Pendente: 'Recebido', Recebido: 'Conferido', Conferido: 'Pendente' }[x[1]]; this.setState(st2 => ({ docSt: Object.assign({}, st2.docSt, { [x[2]]: nx }) })); } }));
    V.hasDocs = docs.length > 0; V.noDocs = docs.length === 0;
    const pend = docs.filter(x => x[1] === 'Pendente').map(x => x[0]);
    V.hasPend = pend.length > 0; V.pendN = pend.length;
    const cont = (this.CLIENTES.find(c => c.s === p.cli) || {}).contato || 'cliente';
    V.onCobrar = () => this.showMsg('Cobrar documentos do cliente', 'Olá, ' + cont.split(' (')[0].split(' ')[0] + '! Para seguirmos com ' + p.proc.toLowerCase() + ' da ' + p.cli + ', ainda precisamos de:\n\n' + pend.map(x => '• ' + x).join('\n') + '\n\nPode nos enviar por aqui? Qualquer dúvida, estamos à disposição.\nProcuradoria · Officecon');
    V.folder = 'Dropbox › Officecon 2026 › Procuradoria › ' + p.cli + ' › ' + p.id;
    const cu = this.CUID[p.code] || []; V.fCuid = cu.map(t => ({ t })); V.hasCuid = cu.length > 0; V.cuidOpen = s.cuidOpen; V.cuidArrow = s.cuidOpen ? '▾' : '▸';
    V.toggleCuid = () => this.setState({ cuidOpen: !s.cuidOpen });
    // side
    V.sideTabs = [['tempo', 'Linha do tempo'], ['prot', 'Protocolos'], ['guias', 'Guias e taxas'], ['vinc', 'Vinculados'], ['finais', 'Docs finais']].map(([k, l]) => ({ label: l, fg: s.sideTab === k ? '#F0485F' : '#A1A1AA', bd: s.sideTab === k ? '#F0485F' : 'transparent', onClick: () => this.setState({ sideTab: k }) }));
    ['tempo', 'prot', 'guias', 'vinc', 'finais'].forEach(k => { V['tab' + k[0].toUpperCase() + k.slice(1)] = s.sideTab === k; });
    const pv = { fato: ['Fato comprovado', '#6FD69B', '#13301F'], relato: ['Relato', '#B4B4BB', '#26262A'] };
    V.tlItems = this.getTl(p).map(e => ({ d: e[0].slice(0, 5), h: e[1], autor: e[2], tipo: e[3], txt: e[4], provaShow: e[5] !== 'auto', autoShow: e[5] === 'auto', provaL: pv[e[5]] ? pv[e[5]][0] : '', provaFg: pv[e[5]] ? pv[e[5]][1] : '', provaBg: pv[e[5]] ? pv[e[5]][2] : '', dot: e[3] === 'Mudança de situação' ? '#F0485F' : '#3A3A40' }));
    V.noteText = s.noteText; V.onNote = e => this.setState({ noteText: e.target.value });
    V.noteTipo = s.noteTipo; V.onNoteTipo = e => this.setState({ noteTipo: e.target.value });
    V.noteTipoOpts = ['Nota', 'Contato com cliente', 'Protocolo', 'Exigência', 'Decisão', 'Pagamento'].map(v => ({ v }));
    V.provaOpts = [['fato', 'Fato comprovado'], ['relato', 'Relato']].map(([k, l]) => ({ l, bg: s.noteProva === k ? '#1A1A1D' : 'transparent', fg: s.noteProva === k ? '#F4F4F5' : '#8E8E96', sh: s.noteProva === k ? '0 1px 2px rgba(31,41,51,.12)' : 'none', onClick: () => this.setState({ noteProva: k }) }));
    V.addNote = () => { if (!s.noteText.trim()) return; this.addEv(p.id, s.noteTipo, s.noteText.trim(), s.noteProva); this.updProc(p.id, {}); this.setState({ noteText: '' }); };
    const prot = this.PROT[p.id] || [];
    V.fProt = prot.map(x => ({ org: x[0], num: x[1], data: x[2], canal: x[3], st: x[4], url: this.PORTAIS[x[5] - 1].url })); V.hasProt = prot.length > 0; V.noProt = prot.length === 0;
    const gp = this.GUIAS_P[p.id] || { g: [], h: [] };
    const selos = ['Emitida', 'Enviada', 'Paga', 'Baixada no portal'];
    V.fGuias = gp.g.map(x => ({ tipo: x[0], desc: x[1], val: x[2] ? this.fmt(x[2]) : 'a calcular', venc: x[3], pag: x[4], selos: selos.map((l, i) => ({ l, bg: i < x[5] ? '#13301F' : '#1A1A1D', fg: i < x[5] ? '#6FD69B' : '#6B6B73', bd: i < x[5] ? '#245A3A' : '#2E2E33', mark: i < x[5] ? '✓ ' : '' })) }));
    V.hasGuias = gp.g.length > 0; V.noGuias = gp.g.length === 0;
    V.taxTotal = this.fmt(gp.g.reduce((a, x) => a + x[2], 0)); V.fHonor = gp.h.map(x => ({ desc: x[0], val: this.fmt(x[1]) })); V.hasHonor = gp.h.length > 0;
    V.honorTotal = this.fmt(gp.h.reduce((a, x) => a + x[1], 0));
    const vinc = [];
    if (p.blocked) { const b = this.getProc(p.blocked); vinc.push({ rel: 'Bloqueado por', id: b.id, t: b.proc, dot: this.SIT[b.sit].dot, sit: this.SIT[b.sit].l, open: () => this.openProc(b.id) }); }
    s.procs.filter(x => x.blocked === p.id).forEach(b => vinc.push({ rel: 'Bloqueia', id: b.id, t: b.proc, dot: this.SIT[b.sit].dot, sit: this.SIT[b.sit].l, open: () => this.openProc(b.id) }));
    if (p.dem) s.procs.filter(x => x.dem === p.dem && x.id !== p.id && x.blocked !== p.id && p.blocked !== x.id).forEach(b => vinc.push({ rel: 'Mesma demanda', id: b.id, t: b.proc, dot: this.SIT[b.sit].dot, sit: this.SIT[b.sit].l, open: () => this.openProc(b.id) }));
    s.procs.filter(x => x.parent === p.id).forEach(b => vinc.push({ rel: 'Gerado por este', id: b.id, t: b.proc, dot: this.SIT[b.sit].dot, sit: this.SIT[b.sit].l, open: () => this.openProc(b.id) }));
    V.fVinc = vinc; V.hasVinc = vinc.length > 0; V.noVinc = vinc.length === 0;
    V.fDepsSug = this.depsFor(p).map(x => ({ t: (x[0] ? x[0] + '. ' : '') + x[1] }));
    const fin = p.sit === 'conc' ? [['Dossiê final (PDF)', p.concl || '—'], ['Comprovante oficial conferido', p.concl || '—']] : [];
    V.fFinais = fin.map(x => ({ n: x[0], d: x[1] })); V.hasFinais = fin.length > 0; V.noFinais = fin.length === 0;
  }
}

// Exportação global para vinculação com o runtime DC
window.Component = Component;
