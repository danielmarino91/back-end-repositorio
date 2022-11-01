class CartDTO {
    constructor(cart) {
        this.products = cart.products;
        this.owner = cart.owner;
    }
}

export default CartDTO;