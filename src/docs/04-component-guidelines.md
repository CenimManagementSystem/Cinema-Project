# React Component Guidelines

## 1. Component Organization

All components must follow this structure:

components/
├── common/
├── forms/
└── ui/

Folder     | Purpose                                                 | Contains Business Logic?
| ---------- | ------------------------------------------------------- | ---------------------------------
| `common/`  | App-wide components (Header, Footer, Navbar, Sidebar) | ❌ No
| `ui/`      | Atomic reusable components (Button, Input, Modal)       | ❌ No
| `forms/`   | Form-specific components                                | ⚠️ Only form state
| `pages/`   | Page-level components                                   | ✅ Yes (business logic, data)
| `services/`| API services (movie.service.ts, auth.service.ts)        | ✅ Yes (API calls, mutations)
| `hooks/`   | Custom React hooks                                      | ✅ Yes (data fetching, auth, etc.)

### common/ 
Used for application-wide components.

Examples:
- Header
- Footer
- Navbar
- Sidebar
- Loading

These components should not contain business logic.
