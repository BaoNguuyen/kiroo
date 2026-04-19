# 📡 API Examples

Các ví dụ thực tế để test API với cURL, Postman, hoặc JavaScript.

## 🔐 Authentication

### Register User

**cURL:**
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "firstName": "John",
    "lastName": "Doe"
  }'
\`\`\`

**JavaScript (Fetch):**
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/v1/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!',
    firstName: 'John',
    lastName: 'Doe'
  })
});

const data = await response.json();
console.log(data);
\`\`\`

**Response:**
\`\`\`json
{
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "statusCode": 201,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Login

**cURL:**
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
});

const { data } = await response.json();
const token = data.access_token;

// Save token for future requests
localStorage.setItem('token', token);
\`\`\`

**Response:**
\`\`\`json
{
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## 👤 Users

### Get Current User Profile

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/users/me \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
\`\`\`

**JavaScript:**
\`\`\`javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:3000/api/v1/users/me', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});

const { data } = await response.json();
console.log(data);
\`\`\`

**Response:**
\`\`\`json
{
  "data": {
    "id": "uuid-here",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "profile": null
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Get All Users (Admin Only)

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/users \\
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/v1/users', {
  headers: {
    'Authorization': \`Bearer \${adminToken}\`
  }
});

const { data } = await response.json();
console.log(data);
\`\`\`

### Update User

**cURL:**
\`\`\`bash
curl -X PATCH http://localhost:3000/api/v1/users/USER_ID \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "Jane",
    "lastName": "Smith"
  }'
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch(\`http://localhost:3000/api/v1/users/\${userId}\`, {
  method: 'PATCH',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: 'Jane',
    lastName: 'Smith'
  })
});
\`\`\`

## 📝 Posts

### Create Post

**cURL:**
\`\`\`bash
curl -X POST http://localhost:3000/api/v1/posts \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post. It contains useful information.",
    "published": true
  }'
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/v1/posts', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My First Post',
    content: 'This is the content of my first post.',
    published: true
  })
});

const { data } = await response.json();
console.log(data);
\`\`\`

**Response:**
\`\`\`json
{
  "data": {
    "id": "post-uuid",
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "published": true,
    "authorId": "user-uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "author": {
      "id": "user-uuid",
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  },
  "statusCode": 201,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Get All Published Posts

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/posts
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/v1/posts');
const { data } = await response.json();
console.log(data);
\`\`\`

### Get My Posts

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/posts/my-posts \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch('http://localhost:3000/api/v1/posts/my-posts', {
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});

const { data } = await response.json();
console.log(data);
\`\`\`

### Get Post by ID

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/posts/POST_ID
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch(\`http://localhost:3000/api/v1/posts/\${postId}\`);
const { data } = await response.json();
console.log(data);
\`\`\`

### Update Post

**cURL:**
\`\`\`bash
curl -X PATCH http://localhost:3000/api/v1/posts/POST_ID \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated Title",
    "published": true
  }'
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch(\`http://localhost:3000/api/v1/posts/\${postId}\`, {
  method: 'PATCH',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated Title',
    published: true
  })
});
\`\`\`

### Delete Post

**cURL:**
\`\`\`bash
curl -X DELETE http://localhost:3000/api/v1/posts/POST_ID \\
  -H "Authorization: Bearer YOUR_TOKEN"
\`\`\`

**JavaScript:**
\`\`\`javascript
const response = await fetch(\`http://localhost:3000/api/v1/posts/\${postId}\`, {
  method: 'DELETE',
  headers: {
    'Authorization': \`Bearer \${token}\`
  }
});
\`\`\`

## 🏥 Health Checks

### Application Health

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/health
\`\`\`

**Response:**
\`\`\`json
{
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "uptime": 123.456,
    "environment": "development"
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

### Database Health

**cURL:**
\`\`\`bash
curl -X GET http://localhost:3000/api/v1/health/db
\`\`\`

**Response:**
\`\`\`json
{
  "data": {
    "status": "ok",
    "database": "connected",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 200,
  "timestamp": "2024-01-01T00:00:00.000Z"
}
\`\`\`

## 🔄 Complete Flow Example

### JavaScript Client Example

\`\`\`javascript
class APIClient {
  constructor(baseURL = 'http://localhost:3000/api/v1') {
    this.baseURL = baseURL;
    this.token = null;
  }

  async register(email, password, firstName, lastName) {
    const response = await fetch(\`\${this.baseURL}/auth/register\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName })
    });
    const { data } = await response.json();
    this.token = data.access_token;
    return data;
  }

  async login(email, password) {
    const response = await fetch(\`\${this.baseURL}/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const { data } = await response.json();
    this.token = data.access_token;
    return data;
  }

  async getProfile() {
    const response = await fetch(\`\${this.baseURL}/users/me\`, {
      headers: { 'Authorization': \`Bearer \${this.token}\` }
    });
    const { data } = await response.json();
    return data;
  }

  async createPost(title, content, published = false) {
    const response = await fetch(\`\${this.baseURL}/posts\`, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${this.token}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content, published })
    });
    const { data } = await response.json();
    return data;
  }

  async getPosts() {
    const response = await fetch(\`\${this.baseURL}/posts\`);
    const { data } = await response.json();
    return data;
  }
}

// Usage
const client = new APIClient();

// Register
await client.register(
  'john@example.com',
  'SecurePass123!',
  'John',
  'Doe'
);

// Get profile
const profile = await client.getProfile();
console.log('Profile:', profile);

// Create post
const post = await client.createPost(
  'My First Post',
  'This is my first post content',
  true
);
console.log('Created post:', post);

// Get all posts
const posts = await client.getPosts();
console.log('All posts:', posts);
\`\`\`

## 🐍 Python Example

\`\`\`python
import requests

class APIClient:
    def __init__(self, base_url='http://localhost:3000/api/v1'):
        self.base_url = base_url
        self.token = None

    def register(self, email, password, first_name, last_name):
        response = requests.post(
            f'{self.base_url}/auth/register',
            json={
                'email': email,
                'password': password,
                'firstName': first_name,
                'lastName': last_name
            }
        )
        data = response.json()['data']
        self.token = data['access_token']
        return data

    def login(self, email, password):
        response = requests.post(
            f'{self.base_url}/auth/login',
            json={'email': email, 'password': password}
        )
        data = response.json()['data']
        self.token = data['access_token']
        return data

    def get_profile(self):
        response = requests.get(
            f'{self.base_url}/users/me',
            headers={'Authorization': f'Bearer {self.token}'}
        )
        return response.json()['data']

    def create_post(self, title, content, published=False):
        response = requests.post(
            f'{self.base_url}/posts',
            headers={'Authorization': f'Bearer {self.token}'},
            json={'title': title, 'content': content, 'published': published}
        )
        return response.json()['data']

# Usage
client = APIClient()

# Register
client.register('john@example.com', 'SecurePass123!', 'John', 'Doe')

# Get profile
profile = client.get_profile()
print('Profile:', profile)

# Create post
post = client.create_post('My First Post', 'Content here', True)
print('Created post:', post)
\`\`\`

## ❌ Error Responses

### 400 Bad Request
\`\`\`json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/auth/register",
  "method": "POST",
  "message": [
    "email must be an email",
    "password must be longer than or equal to 8 characters"
  ]
}
\`\`\`

### 401 Unauthorized
\`\`\`json
{
  "statusCode": 401,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/users/me",
  "method": "GET",
  "message": "Unauthorized"
}
\`\`\`

### 403 Forbidden
\`\`\`json
{
  "statusCode": 403,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/posts/123",
  "method": "DELETE",
  "message": "You can only delete your own posts"
}
\`\`\`

### 404 Not Found
\`\`\`json
{
  "statusCode": 404,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/users/invalid-id",
  "method": "GET",
  "message": "User with ID invalid-id not found"
}
\`\`\`

### 409 Conflict
\`\`\`json
{
  "statusCode": 409,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/v1/auth/register",
  "method": "POST",
  "message": "Email already exists"
}
\`\`\`

## 📚 More Examples

Xem thêm examples trong:
- [Swagger UI](http://localhost:3000/api/docs) - Interactive API testing
- [Postman Collection](./postman_collection.json) - Import vào Postman
- [Test Files](./test/) - E2E test examples

---

**Happy Testing! 🚀**
