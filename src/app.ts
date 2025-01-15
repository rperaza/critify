import express from 'express';
import { Pool } from 'pg';
import { createProductRoutes } from './routes/productRoutes';
import { ProductService } from './services/productService';
import { ReviewService } from './services/reviewService';

const app = express();
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});

const productService = new ProductService(pool);
const reviewService = new ReviewService(pool);

app.use(createProductRoutes(productService, reviewService));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});