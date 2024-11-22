create database api_tcc;

use api_tcc;

CREATE TABLE `usuario` (
    `id_usuario` int NOT NULL AUTO_INCREMENT,
    `nm_usuario` varchar(100) NOT NULL,
    `email` varchar(255) NOT NULL,
    `ds_senha` varchar(255) NOT NULL,
    PRIMARY KEY (`id_usuario`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `adm` (
    `id_adm` int NOT NULL AUTO_INCREMENT,
    `produtos` varchar(100) NOT NULL,
    `valor` decimal(10, 2) NOT NULL,
    `quantidade` int NOT NULL,
    `dia_da_venda` date DEFAULT NULL,
    `id_clientes` int DEFAULT NULL,
    `numero` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`id_adm`),
    KEY `id_clientes` (`id_clientes`),
    CONSTRAINT `adm_ibfk_1` FOREIGN KEY (`id_clientes`) REFERENCES `clientes` (`id_cliente`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `categoria` (
    `id_categoria` int NOT NULL AUTO_INCREMENT,
    `nm_nome` text,
    `ds_descricao` text,
    PRIMARY KEY (`id_categoria`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `clientes` (
    `id_cliente` int NOT NULL AUTO_INCREMENT,
    `nm_clientes` varchar(100) NOT NULL,
    `ultima_compra` date DEFAULT NULL,
    `total` decimal(10, 2) DEFAULT '0.00',
    `numero` varchar(20) DEFAULT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY (`id_cliente`),
    UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `produtos` (
    `id_produto` int NOT NULL AUTO_INCREMENT,
    `id_categoria` int DEFAULT NULL,
    `nm_nome` text,
    `vl_valor` varchar(255) DEFAULT NULL,
    `ds_descricao` text,
    `img_logo` text,
    PRIMARY KEY (`id_produto`),
    KEY `id_categoria` (`id_categoria`),
    CONSTRAINT `produtos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE `vendas` (
    `id_venda` int NOT NULL AUTO_INCREMENT,
    `produtos` int DEFAULT NULL,
    `id_cliente` int DEFAULT NULL,
    `quantidade` int DEFAULT NULL,
    `dia_da_venda` datetime DEFAULT CURRENT_TIMESTAMP,
    `numero` text,
    `valor` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id_venda`),
    KEY `produtos` (`produtos`),
    KEY `id_cliente` (`id_cliente`),
    CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`produtos`) REFERENCES `produtos` (`id_produto`),
    CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
