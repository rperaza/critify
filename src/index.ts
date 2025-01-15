export interface Product {
    id: number;
    upc: string;
    name: string;
    brand?: string;
    category?: string;
    created_at: Date;
    updated_at: Date;
}

export interface Review {
    id: number;
    product_id: number;
    source: string;
    source_review_id: string;
    rating: number;
    title?: string;
    content: string;
    reviewer_name?: string;
    review_date: Date;
    verified_purchase: boolean;
    helpful_votes: number;
    created_at: Date;
}