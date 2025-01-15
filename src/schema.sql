CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    upc VARCHAR(14) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255),
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    source VARCHAR(50) NOT NULL, -- e.g., 'amazon', 'bestbuy', etc.
    source_review_id VARCHAR(100), -- original review ID from source
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    reviewer_name VARCHAR(100),
    review_date TIMESTAMP,
    verified_purchase BOOLEAN DEFAULT false,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(source, source_review_id)
);

CREATE TABLE review_sources (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    base_url VARCHAR(255),
    api_key VARCHAR(255),
    active BOOLEAN DEFAULT true,
    last_scraped_at TIMESTAMP,
    scraping_frequency_hours INTEGER DEFAULT 24
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    url VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);