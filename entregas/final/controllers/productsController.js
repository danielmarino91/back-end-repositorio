import ProductsService from "../services/productsService.js";
import ProductRepository from "../repository/productRepository.js";
import { logger, loggerError } from "../utils/logger.js";

export const productsStorage = new ProductRepository();

export const productService = new ProductsService(productsStorage);

export const getProducts = async (req, res) => {
    return productService.getProducts()
        .then(products => {
            return res.status(200).json({ products })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        });
}

export const getProduct = async (req, res) => {
    const prodID = req.params.id;
    return productService.getProduct(prodID)
        .then(product => {
            return res.status(200).json({ product })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(404).json({ error: 'No se encontro el producto' });
        });
}

export const getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    return productService.getProductsByCategory(category)
        .then(productos => {
            if (productos.length) {
                return res.status(200).json({ productos });
            } else {
                throw new Error;
            }
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(404).json({ error: 'No se encontraron productos con esa categoria' });
        });
}

export const createProduct = async (req, res) => {
    const newProduct = req.body;

    return productService.createProduct(newProduct)
        .then(product => {
            logger.info('Producto creado')
            return res.status(201).json({ product })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        });
}

export const changeProduct = async (req, res) => {
    const prodModify = req.body;
    const prodID = req.params.id;

    return productService.changeProduct(prodID, prodModify)
        .then(product => {
            logger.info('Producto modificado')
            return res.status(201).json({ product })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        });
}

export const deleteProduct = async (req, res) => {
    const prodID = req.params.id;
    return productService.deleteProduct(prodID)
        .then(_ => {
            logger.info('Producto eliminado')
            return res.status(200).json({ mensaje: 'Producto eliminado' })
        })
        .catch(err => {
            loggerError.error(err.toString());
            res.status(500).json({ error: err.toString() })
        });
}