require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/connectDB');

const Category = require('./models/category.model');
const Product = require('./models/product.model');
const Order = require('./models/order.model');

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log('Database connected established successfully for seeding ...');

        console.log('Cleaning up database collections before seeding ...');
        await Order.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        console.log('Database cleanup completed successfully.');

        console.log('Inserting sample categories ...');
        const sampleCategories = [
            { 
                name: 'Electronics',
                slug: 'electronics',
                description: 'Gadegets, SmartPhones, and Computing Hardware.'
            },
            { 
                name: 'Apparel',
                slug: 'apparel', 
                description: 'Trendy Clothes, Footwear, and Apparel Accessories.'
            },
            { 
                name: 'Home & Kitchen',
                slug: 'home-kitchen', 
                description: 'Appliances, Kitchen Tools, and Living Furniture.'
            }
        ];

        const createdCategories = await Category.create(sampleCategories);

        const electronicsId = createdCategories.find(cat => cat.name === 'Electronics')._id;
        const apparelId = createdCategories.find(cat => cat.name === 'Apparel')._id;
        const homeKitchenId = createdCategories.find(cat => cat.name === 'Home & Kitchen')._id;

        console.log('Inserting sample products distributed across categories ...');
        const sampleProducts = [
            {
                name: 'Wireless ANC Headphones',
                description: 'Premium over-air noise cancelling headphones.',
                price: 199.99,
                stock: 50,
                category: electronicsId,
                images: ['https://morpheus360.com/cdn/shop/products/HP9350B_AltFrontAnglecopy2.jpg?v=1660232787']
            },
            {
                name: 'Mechanical Keyboard',
                description: 'Tactile mechanical gaming keyboard with RGB lighting.',
                price: 89.99,
                stock: 60,
                category: electronicsId,
                images: ['https://m.media-amazon.com/images/I/71+GqIHjlYL._AC_UF894,1000_QL80_.jpg']
            },
            {
                name: 'Premium Oversized Hoodie',
                description: 'Heavyweight comfort hoodie made from 100% organic cotton.',
                price: 67,
                stock: 48,
                category: apparelId,
                images: ['https://celevere.com/cdn/shop/files/3.webp?v=1768080610&width=3840']
            },
            {
                name: 'Waterproof Running Shoes',
                description: 'Durable all-terrain outdoor trail running sneakers.',
                price: 125,
                stock: 0,
                category: apparelId,
                images: ['https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_363,c_limit/99d2d8b2-013a-4242-9ccd-f4f49a674a9b/best-nike-waterproof-running-shoes.jpg']
            },
            {
                name: 'Ergonomic Mesh Chair',
                description: 'High-back office desk chair with dynamic lumbar support.',
                price: 266,
                stock: 17,
                category: homeKitchenId,
                images: ['https://m.media-amazon.com/images/I/71Pm-xYk7DL._AC_UF894,1000_QL80_.jpg']
            },
            {
                name: 'Stainless Steel Coffe Maker',
                description: '15-bar programmable expresso machine with milk frother.',
                price: 588,
                stock: 7,
                category: homeKitchenId,
                images: ['https://www.cnet.com/a/img/resize/cb2220b63c1f6f651b10a2522d2afe9aae0d82ce/hub/2025/06/20/29042b5c-e4e0-4e28-b594-60c07dbbb395/img-1480-1.jpg?auto=webp&height=500']
            }
        ];

        const createdProducts = await Product.create(sampleProducts);

        console.log('\n====================================================================');
        console.log('🎉 Database seeding completed successfully!');
        console.log(`Successfully added ${createdCategories.length} Categories.`);
        console.log(`Successfully added ${createdProducts.length} Products.`);
        console.log('====================================================================\n');

    } catch (error) {
        console.error('❌ Seeding process caught an error: ', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Mongoose connection terminated securely.');
    }
};

seedDatabase();