const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

exports.getAllNotasFiscais = async (req, res) => {
  const notasFiscais = await prisma.notaFiscal.findMany();
  res.json(notasFiscais);
};

exports.getNotaFiscalById = async (req, res) => {
  const { id } = req.params;
  const notaFiscal = await prisma.notaFiscal.findUnique({ where: { id: parseInt(id) } });
  res.json(notaFiscal);
};

exports.createNotaFiscal = async (req, res) => {
  const { nomePagador, dataEmissao, dataCobranca, dataPagamento, valor, status } = req.body;
  const documentoNota = req.files['documentoNota'][0].path;
  const documentoBoleto = req.files['documentoBoleto'][0].path;
  const numeroIdentificacao = Date.now().toString();

  const notaFiscal = await prisma.notaFiscal.create({
    data: {
      nomePagador,
      numeroIdentificacao,
      dataEmissao: new Date(dataEmissao),
      dataCobranca: dataCobranca ? new Date(dataCobranca) : null,
      dataPagamento: dataPagamento ? new Date(dataPagamento) : null,
      valor: parseFloat(valor),
      documentoNota,
      documentoBoleto,
      status,
    },
  });

  res.json(notaFiscal);
};
