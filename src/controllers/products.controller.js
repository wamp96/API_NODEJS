import Product from "../models/Product.js"


export const createProduct = async (req, res) => {
    const{name, category, price, imgURL} = req.body;

    try{
        const newProduct = new Product({name, category, price, imgURL});
        
        const productSaved = await newProduct.save();

        res.status(201).json(productSaved);

    }catch(error){
        return res.status(500).json(error);
    }
};

export const getProductById = async (req, res) => {
    const {productId} =req.params;

    const product = await Product.findById(productId);
    res.status(200).json(product);
}

export const getProducts = async (req, res) => {
    const products = await Product.find();
    return res.json(products);
}

export const updateProductById = async (req, res) => {
    const updateProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        {new: true}
    );
    res.status(200).json(updateProduct);
};
export const deleteProductById = async (req, res) => {
    const {productId} =req.params;
    await Product.finfByAndDelete(productId);
    res.status(204).json();
};

