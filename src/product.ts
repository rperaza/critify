import { Pool } from 'pg';
import { Product } from '../types';

export class ProductService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getProductByUPC(upc: string): Promise<Product | null> {
        const query = `
            SELECT * FROM products 
            WHERE upc = $1
        `;
        const result = await this.pool.query(query, [upc]);
        return result.rows[0] || null;
    }

    async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
        const query = `
            INSERT INTO products (upc, name, brand, category)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await this.pool.query(query, [
            product.upc,
            product.name,
            product.brand,
            product.category
        ]);
        return result.rows[0];
    }
}