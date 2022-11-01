
class CartService {
    constructor(repository) {
        this.repository = repository;
    }

    async getCarts() {
        return this.repository.getElems();
    }

    async getCartProducts(id) {
        return this.repository.getCartProds(id);
    }

    async getOwnCart(id) {
        return this.repository.getCart(id);
    }

    async newCart(cart) {
        return this.repository.postElem(cart);
    }

    async addToCart(product, id) {
        return this.repository.addToCart(product, id);
    }

    async deleteCart(id) {
        return this.repository.deleteElem(id);
    }

    async deleteProd(id, idProd) {
        return this.repository.deleteCartProd(id, idProd);
    }
}

export default CartService;