const express = require('express');
const router = express.Router();
const notaFiscalController = require('../controllers/notaFiscalController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', notaFiscalController.getAllNotasFiscais);
router.get('/:id', notaFiscalController.getNotaFiscalById);
router.post('/', upload.fields([{ name: 'documentoNota' }, { name: 'documentoBoleto' }]), notaFiscalController.createNotaFiscal);

//module.exports = router;


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Rota para obter o valor total das notas emitidas, sem cobrança realizada
router.get('/notasFiscais/valorTotalEmitidasSemCobranca', async (req, res) => {
  try {
    const notas = await prisma.notaFiscal.findMany({
      where: {
        status: 'EMITIDA',
        dataCobranca: null
      }
    });

    const valorTotal = notas.reduce((total, nota) => total + nota.valor, 0);
    res.json({ valorTotal });
  } catch (error) {
    console.error('Erro ao calcular valor total das notas emitidas sem cobrança:', error);
    res.status(500).json({ error: 'Erro interno ao calcular dados' });
  }
});

// Rota para obter o valor total das notas vencidas (Inadimplência)
router.get('/notasFiscais/valorTotalVencidas', async (req, res) => {
  try {
    const hoje = new Date();
    const notas = await prisma.notaFiscal.findMany({
      where: {
        status: 'EMITIDA',
        dataCobranca: { lt: hoje },
        dataPagamento: null
      }
    });

    const valorTotal = notas.reduce((total, nota) => total + nota.valor, 0);
    res.json({ valorTotal });
  } catch (error) {
    console.error('Erro ao calcular valor total das notas vencidas:', error);
    res.status(500).json({ error: 'Erro interno ao calcular dados' });
  }
});

// Rota para obter o valor total das notas a vencer
router.get('/notasFiscais/valorTotalAVencer', async (req, res) => {
  try {
    const hoje = new Date();
    const notas = await prisma.notaFiscal.findMany({
      where: {
        status: 'EMITIDA',
        dataCobranca: { gt: hoje },
        dataPagamento: null
      }
    });

    const valorTotal = notas.reduce((total, nota) => total + nota.valor, 0);
    res.json({ valorTotal });
  } catch (error) {
    console.error('Erro ao calcular valor total das notas a vencer:', error);
    res.status(500).json({ error: 'Erro interno ao calcular dados' });
  }
});

// Rota para obter o valor total das notas pagas
router.get('/notasFiscais/valorTotalPagas', async (req, res) => {
  try {
    const notas = await prisma.notaFiscal.findMany({
      where: {
        status: 'PAGAMENTO_REALIZADO'
      }
    });

    const valorTotal = notas.reduce((total, nota) => total + nota.valor, 0);
    res.json({ valorTotal });
  } catch (error) {
    console.error('Erro ao calcular valor total das notas pagas:', error);
    res.status(500).json({ error: 'Erro interno ao calcular dados' });
  }
});

module.exports = router;


