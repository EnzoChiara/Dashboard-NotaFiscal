const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const notaFiscais = [
    {
      nomePagador: 'Empresa A',
      numeroIdentificacao: 'NF20230001',
      dataEmissao: new Date('2023-01-10T00:00:00.000Z'),
      dataCobranca: new Date('2023-01-20T00:00:00.000Z'),
      dataPagamento: new Date('2023-01-25T00:00:00.000Z'),
      valor: 1000.00,
      documentoNota: 'path/to/documentoNota1.pdf',
      documentoBoleto: 'path/to/documentoBoleto1.pdf',
      status: 'PAGAMENTO_REALIZADO', 
    },
    {
      nomePagador: 'Empresa B',
      numeroIdentificacao: 'NF20230002',
      dataEmissao: new Date('2023-02-15T00:00:00.000Z'),
      dataCobranca: new Date('2023-02-25T00:00:00.000Z'),
      dataPagamento: null,
      valor: 2000.00,
      documentoNota: 'path/to/documentoNota2.pdf',
      documentoBoleto: 'path/to/documentoBoleto2.pdf',
      status: 'EMITIDA', 
    },
    {
      nomePagador: 'Empresa C',
      numeroIdentificacao: 'NF20230003',
      dataEmissao: new Date('2023-03-20T00:00:00.000Z'),
      dataCobranca: new Date('2023-03-28T00:00:00.000Z'),
      dataPagamento: new Date('2023-04-05T00:00:00.000Z'), // Pagamento em atraso
      valor: 1500.00,
      documentoNota: 'path/to/documentoNota3.pdf',
      documentoBoleto: 'path/to/documentoBoleto3.pdf',
      status: 'PAGAMENTO_EM_ATRASO', 
    },
    {
      nomePagador: 'Empresa D',
      numeroIdentificacao: 'NF20230004',
      dataEmissao: new Date('2023-04-10T00:00:00.000Z'),
      dataCobranca: null, // Não há cobrança realizada
      dataPagamento: null, // Ainda não foi realizado o pagamento
      valor: 1800.00,
      documentoNota: 'path/to/documentoNota4.pdf',
      documentoBoleto: 'path/to/documentoBoleto4.pdf',
      status: 'EMITIDA', // Valor válido conforme definido no enum
    }
    
  ];

  await prisma.notaFiscal.createMany({
    data: notaFiscais,
    skipDuplicates: true, 
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
