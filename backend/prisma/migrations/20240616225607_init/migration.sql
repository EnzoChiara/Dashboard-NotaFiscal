-- CreateTable
CREATE TABLE `NotaFiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePagador` VARCHAR(191) NOT NULL,
    `numeroIdentificacao` VARCHAR(191) NOT NULL,
    `dataEmissao` DATETIME(3) NOT NULL,
    `dataCobranca` DATETIME(3) NULL,
    `dataPagamento` DATETIME(3) NULL,
    `valor` DOUBLE NOT NULL,
    `documentoNota` VARCHAR(191) NOT NULL,
    `documentoBoleto` VARCHAR(191) NOT NULL,
    `status` ENUM('EMITIDA', 'COBRANCA_REALIZADA', 'PAGAMENTO_EM_ATRASO', 'PAGAMENTO_REALIZADO') NOT NULL,

    UNIQUE INDEX `NotaFiscal_numeroIdentificacao_key`(`numeroIdentificacao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
