// const productdata = require('./product/products.js');
const Products = require('./models/productSchema.js');
const products = require('./product/products.js');

const DefaultData = async() => {
    try {
        await Products.deleteMany({});
        const storeData = await Products.insertMany(products);
        console.log(storeData)
    } catch (error) {
        console.log('error', error.message);
    }
};

module.exports = DefaultData;