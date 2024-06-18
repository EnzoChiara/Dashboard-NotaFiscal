const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PrismaClient, StatusNota } = require('@prisma/client');

const prisma = new PrismaClient();

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Cria o diretório se não existir
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Define o nome do arquivo com um timestamp
  }
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10 MB tamanho máximo do arquivo
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'documentoNotaFiscal' || file.fieldname === 'documentoBoletoBancario') {
      // Permite apenas arquivos PDF, JPG e PNG
      if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Formato de arquivo inválido. Apenas PDF, JPG e PNG são permitidos.'));
      }
    } else {
      cb(new Error('Campo de arquivo inválido.'));
    }
  }
});

// Middleware para tratar CORS e requisições JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota para cadastro de notas fiscais
app.post('/notasFiscais', upload.fields([
  { name: 'documentoNotaFiscal', maxCount: 1 },
  { name: 'documentoBoletoBancario', maxCount: 1 }
]), async (req, res) => {
  try {
    const { nomePagador, identificacaoNota, dataEmissao, dataCobranca, dataPagamento, valorNota, status } = req.body;
    const documentoNotaFiscal = req.files.documentoNotaFiscal ? req.files.documentoNotaFiscal[0].filename : null;
    const documentoBoletoBancario = req.files.documentoBoletoBancario ? req.files.documentoBoletoBancario[0].filename : null;

    // Verifica se o status fornecido está entre os valores do enum StatusNota
    if (!Object.values(StatusNota).includes(status)) {
      throw new Error('Status inválido. Escolha um dos valores permitidos.');
    }

    const novaNotaFiscal = await prisma.notaFiscal.create({
      data: {
        nomePagador,
        numeroIdentificacao: identificacaoNota, // Utilizando identificacaoNota como numeroIdentificacao
        dataEmissao: new Date(dataEmissao),
        dataCobranca: dataCobranca ? new Date(dataCobranca) : null,
        dataPagamento: dataPagamento ? new Date(dataPagamento) : null,
        valor: parseFloat(valorNota),
        documentoNota: documentoNotaFiscal,
        documentoBoleto: documentoBoletoBancario || '', // Garantindo que não seja null
        status: status // O status já deve estar no formato correto se passou pela validação
      }
    });

    res.status(200).json({
      message: 'Nota fiscal cadastrada com sucesso!',
      data: novaNotaFiscal
    });
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para buscar todas as notas fiscais
app.get('/notasFiscais', async (req, res) => {
  try {
    const notasFiscais = await prisma.notaFiscal.findMany();
    res.status(200).json(notasFiscais);
  } catch (error) {
    console.error('Erro ao buscar notas fiscais:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
