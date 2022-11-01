class ProductDTO {
    constructor(product) {
        this.name = product.name;
        this.price = product.price;
        this.stock = product.stock;
        this.photo = product.photo;
        this.code = product.code;
        this.desc = product.desc;
        this.category = product.category;
        this.id = product._id;
    }
}

export default ProductDTO;