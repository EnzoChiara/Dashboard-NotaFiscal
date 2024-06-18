# Sistema de Cadastro de Notas Fiscais

Este é um sistema de cadastro de notas fiscais desenvolvido em Node.js com Express, utilizando o Prisma ORM para interação com o banco de dados e o Multer para upload de arquivos. O front-end é feito em React com Material-UI.

## Desenvolvedor

- **Nome:** Enzo Chiaramonte
- **E-mail:** enzochiara1@hotmail.com
- **GitHub:** (https://github.com/EnzoChiara)

## Tecnologias Utilizadas

- **Node.js**: v14.17.0
- **Express**: v4.17.1
- **Prisma**: v2.30.0
- **React**: v17.0.2
- **Material-UI**: v5.2.0
- **Multer**: v1.4.3
- **Axios**: v0.21.1

## Setup e Uso

### Pré-requisitos

- Node.js e npm instalados
- Prisma CLI instalado globalmente (`npm install -g prisma`)
- Banco de dados configurado (ex: PostgreSQL, MySQL, SQLite, etc.)

### Configuração do Servidor

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

2. Instale as dependências:
npm install

3.Configure o banco de dados:

Crie um arquivo .env na raiz do projeto e adicione a URL de conexão do seu banco de dados:
DATABASE_URL="mysql://usuario:senha@localhost:5432/nome_do_banco"

4. Execute as migrações do Prisma para criar as tabelas no banco de dados:
npx prisma migrate dev --name init

6. Inicie o servidor:
   npm start

1. Configuração do Front-end
Navegue até o diretório client:
cd client

2. Instale as dependências:
npm install

3. Inicie o servidor de desenvolvimento do React:
npm start
O front-end estará rodando em http://localhost:3001



Endpoints da API
POST /notasFiscais: Cadastra uma nova nota fiscal.

Campos obrigatórios: nomePagador, identificacaoNota, dataEmissao, valorNota, status.
Campos opcionais: dataCobranca, dataPagamento, documentoNotaFiscal, documentoBoletoBancario.
Exemplo de uso:

curl -X POST http://localhost:3000/notasFiscais \
  -F "nomePagador=Nome do Pagador" \
  -F "identificacaoNota=NF202312345" \
  -F "dataEmissao=2023-06-18" \
  -F "valorNota=100.00" \
  -F "status=EMITIDA" \
  -F "documentoNotaFiscal=@path/to/notaFiscal.pdf" \
  -F "documentoBoletoBancario=@path/to/boletoBancario.pdf"
  
GET /notasFiscais: Retorna todas as notas fiscais cadastradas.

Estrutura do Projeto
server: Contém o código do servidor Express.
uploads: Diretório onde os arquivos carregados são armazenados.
prisma: Contém o esquema do Prisma e as migrações.
index.js: Arquivo principal do servidor.
client: Contém o código do front-end em React.
src: Contém os componentes React e os arquivos de configuração.
App.js: Componente principal do React.
