React Login
     │
     ▼
POST /api/auth/login
     │
     ▼
Spring Boot
     │
     ├── Validate username/password
     ├── Generate JWT
     └── Set HttpOnly Cookie
              │
              ▼
          Browser
              │
              │ automatically stores cookie
              ▼
GET /api/movies
     │
     │ Cookie: access_token=...
     ▼
Spring Security
     │
     ├── Read cookie
     ├── Validate JWT
     └── Authenticate user