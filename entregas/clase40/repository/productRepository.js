import ProductDTO from "../dtos/productDTO.js";
import DAOFactory from "../factory/DAOfactory.js";

const myDAO = new DAOFactory();

class ProductRepository {
    constructor() {
        this.dao = myDAO.getProdDAO();
    }

    async getProducts() {
        const productos = await this.dao.getElems();
        return productos.map(dto => new ProductDTO(dto));
    }

    async getProduct(id) {
        const producto = await this.dao.getElem(id);
        return new ProductDTO(producto);
    }

    async createProduct(product) {
        return await this.dao.postElem(product);
    }

    async updateProduct(prodId, product) {
        return await this.dao.putElem(prodId, product);
    }

    async deleteProduct(productId) {
        return await this.dao.deleteElem(productId);
    }
}

export default ProductRepository;