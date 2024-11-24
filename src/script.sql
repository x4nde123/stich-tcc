
select * from usuario; 
SELECT * FROM produtos;
SELECT * FROM categoria WHERE id_categoria = 1;

drop database api_tcc;
SHOW CREATE TABLE produtos;

ALTER TABLE produtos DROP FOREIGN KEY fk_produtos_categoria;

ALTER TABLE produtos ADD CONSTRAINT fk_produtos_categoria
FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
ON DELETE CASCADE ON UPDATE CASCADE;





SELECT * FROM categoria WHERE id_categoria = 1;
INSERT INTO categoria (id_categoria, nm_nome, ds_descricao ) VALUES (1, 'Nome da Categoria','decricao');

SHOW CREATE TABLE produtos;

SELECT * FROM vendas
LEFT JOIN produtos ON vendas.produtos = produtos.id_produto
LEFT JOIN clientes ON vendas.id_cliente = clientes.id_cliente;
SELECT * FROM produtos WHERE id_produto = id_venda;

-- Criando o banco de dados
CREATE DATABASE IF NOT EXISTS api_tcc;
USE api_tcc;

-- ========================================
-- Tabela: `usuario`
-- ========================================
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
    `id_usuario` INT NOT NULL AUTO_INCREMENT,
    `nm_usuario` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `ds_senha` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ========================================
-- Tabela: `clientes`
-- ========================================
DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
    `id_cliente` INT NOT NULL AUTO_INCREMENT,
    `nm_clientes` VARCHAR(100) NOT NULL,
    `ultima_compra` DATE DEFAULT NULL,
    `total` DECIMAL(10, 2) DEFAULT '0.00',
    `numero` VARCHAR(20) DEFAULT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ========================================
-- Tabela: `categoria`
-- ========================================
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
    `id_categoria` INT NOT NULL AUTO_INCREMENT,
    `nm_nome` TEXT NOT NULL,
    `ds_descricao` TEXT,
    PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ========================================
-- Tabela: `produtos`
-- ========================================
DROP TABLE IF EXISTS `produtos`;
CREATE TABLE `produtos` (
    `id_produto` INT NOT NULL AUTO_INCREMENT,
    `id_categoria` INT NOT NULL, -- Referencia a tabela `categoria`
    `nm_nome` TEXT NOT NULL,
    `vl_valor` DECIMAL(10, 2) DEFAULT NULL,
    `ds_descricao` TEXT,
    `img_logo` TEXT,
    PRIMARY KEY (`id_produto`),
    INDEX `fk_produtos_categoria_idx` (`id_categoria`),
    CONSTRAINT `fk_produtos_categoria`
        FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ========================================
-- Tabela: `vendas`
-- ========================================
DROP TABLE IF EXISTS `vendas`;
CREATE TABLE `vendas` (
    `id_venda` INT NOT NULL AUTO_INCREMENT,
    `produtos` INT NOT NULL, -- Referencia a tabela `produtos`
    `id_cliente` INT DEFAULT NULL, -- Referencia a tabela `clientes`
    `quantidade` INT DEFAULT NULL,
    `dia_da_venda` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `numero` VARCHAR(20) DEFAULT NULL,
    `valor` DECIMAL(10, 2) DEFAULT NULL,
    PRIMARY KEY (`id_venda`),
    INDEX `fk_vendas_produtos_idx` (`produtos`),
    INDEX `fk_vendas_clientes_idx` (`id_cliente`),
    CONSTRAINT `fk_vendas_produtos` FOREIGN KEY (`produtos`)
        REFERENCES `produtos` (`id_produto`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fk_vendas_clientes` FOREIGN KEY (`id_cliente`)
        REFERENCES `clientes` (`id_cliente`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ========================================
-- Tabela: `adm`
-- ========================================
DROP TABLE IF EXISTS `adm`;
CREATE TABLE `adm` (
    `id_adm` INT NOT NULL AUTO_INCREMENT,
    `id_clientes` INT DEFAULT NULL, -- Referencia a tabela `clientes`
    `produtos` VARCHAR(100) NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `quantidade` INT NOT NULL,
    `dia_da_venda` DATE DEFAULT NULL,
    `numero` VARCHAR(20) DEFAULT NULL,
    PRIMARY KEY (`id_adm`),
    INDEX `fk_adm_clientes_idx` (`id_clientes`),
    CONSTRAINT `fk_adm_clientes` FOREIGN KEY (`id_clientes`)
        REFERENCES `clientes` (`id_cliente`)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
