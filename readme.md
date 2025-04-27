# API Documentation

**Base URL**: `http://localhost:5000/api`

---

## Authentication

### `POST /auth/register`
Register a new user

**Request**:
```json
{
  "username": "string (required, unique)",
  "password": "string (required, min: 6 chars)",
  "role": "string (optional, default: 'user')"
}
```
**Response**:
```json
{
  "token": "JWT_TOKEN"
}
```

### `POST /auth/login`
Login existing user

**Request**:
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```
**Response**:
```json
{
  "token": "JWT_TOKEN"
}
```

## Products

**Endpoint**: `/products`

| Method | Description               | Auth Required |
|--------|---------------------------|---------------|
| GET    | Get all products          | No            |
| POST   | Create new product        | Yes (Admin)   |
| PUT    | Update product by ID      | Yes (Admin)   |
| DELETE | Delete product by ID      | Yes (Admin)   |

**Search**:
```
GET /products/search?q=term&category=id&min_price=0&max_price=100
```

**Product Schema**:
```json
{
  "id": "number",
  "name": "string",
  "price": "number",
  "description": "string",
  "category_id": "number",
  "created_by": "number",
  "created_at": "timestamp"
}
```

## Categories

**Endpoint**: `/categories`

| Method | Description            | Auth Required |
|--------|------------------------|---------------|
| GET    | Get all categories     | No            |
| POST   | Create new category    | Yes (Admin)   |

**Category Products**:
```
GET /categories/:id/products
```

**Category Schema**:
```json
{
  "id": "number",
  "name": "string",
  "description": "string"
}
```

## Orders

**Endpoint**: `/orders`

**Headers**: `Authorization: Bearer <token>`

| Method | Description              |
|--------|--------------------------|
| GET    | Get user's orders        |
| POST   | Create new order         |
| GET    | Get order details by ID  |

**Order Schema**:
```json
{
  "id": "number",
  "user_id": "number",
  "total": "number",
  "status": "string",
  "products": [
    {
      "id": "number",
      "name": "string",
      "price": "number",
      "quantity": "number"
    }
  ]
}
```

## Advanced Features

1. **Relational Endpoints**
    - `GET /users/:id/orders` - Get user's orders with product details
    - `GET /products/:id/category` - Get product's category

2. **Search**
    - `GET /search?q=term`
    - Returns products and categories matching search term

3. **Pagination**
    - All list endpoints accept:
      - `?page=1`
      - `?limit=10`

## Database Schema

```sql
users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
);

products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  created_by INTEGER REFERENCES users(id)
);

categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'pending'
);

order_products (
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  PRIMARY KEY (order_id, product_id)
);
```

## Frontend Implementation Tips

1. **Axios Instance**
```javascript
// src/utils/api.js
import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});
```

2. **Vue Composables**
```javascript
// src/composables/useProducts.js
import api from '@/utils/api';

export default function useProducts() {
  const searchProducts = async (query) => {
    const res = await api.get('/products/search', { params: { q: query } });
    return res.data;
  };

  return { searchProducts };
}
```

3. **Component Example**
```vue
<script setup>
import { ref } from 'vue';
import useProducts from '@/composables/useProducts';

const { searchProducts } = useProducts();
const results = ref([]);

const handleSearch = async (query) => {
  results.value = await searchProducts(query);
};
</script>
```

**Note**: All POST/PUT/DELETE endpoints require admin privileges except order creation which requires any authenticated user.