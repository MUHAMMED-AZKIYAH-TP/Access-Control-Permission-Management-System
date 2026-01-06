# Codeedex

Codeedex is a comprehensive user management and access control system built with Django REST Framework on the backend and React on the frontend. It provides role-based access control (RBAC), user authentication, team management, and audit logging for secure and efficient user administration.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Role-Based Access Control**: Flexible permission system with roles and permissions
- **Team Management**: Organize users into teams
- **Audit Logging**: Track user actions and system events
- **Admin Dashboard**: Comprehensive interface for managing users, roles, and permissions
- **Responsive UI**: Modern React frontend with Tailwind CSS

## Tech Stack

### Backend
- **Django** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database
- **JWT Authentication** - Token-based auth
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend/src/codeedex_project
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the `codeedex_project` directory with:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   FRONTEND_URL=http://localhost:5173
   ```

5. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

7. Start the development server:
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend/codeedex
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints

The API is available at `http://127.0.0.1:8000/api/v1/`

### Authentication
- `POST /api/v1/accounts/login/` - User login
- `POST /api/v1/accounts/register/` - User registration
- `POST /api/v1/accounts/token/refresh/` - Refresh JWT token

### Users
- `GET /api/v1/accounts/users/` - List users
- `POST /api/v1/accounts/users/` - Create user
- `GET /api/v1/accounts/users/{id}/` - Get user details
- `PUT /api/v1/accounts/users/{id}/` - Update user
- `DELETE /api/v1/accounts/users/{id}/` - Delete user

### Roles & Permissions
- `GET /api/v1/access_control/roles/` - List roles
- `POST /api/v1/access_control/roles/` - Create role
- `GET /api/v1/access_control/roles/{id}/` - Get role details
- `PUT /api/v1/access_control/roles/{id}/` - Update role
- `DELETE /api/v1/access_control/roles/{id}/` - Delete role

- `GET /api/v1/access_control/permissions/` - List permissions
- `POST /api/v1/access_control/permissions/` - Create permission

### Audit Logs
- `GET /api/v1/audit/logs/` - List audit logs

## Usage

1. Access the frontend at `http://localhost:5173`
2. Register a new account or login with existing credentials
3. Use the admin dashboard to manage users, roles, and permissions
4. View audit logs to track system activities

## Development

### Running Tests
```bash
# Backend tests
cd Backend/src/codeedex_project
python manage.py test

# Frontend linting
cd Frontend/codeedex
npm run lint
```

### Building for Production
```bash
# Backend
cd Backend/src/codeedex_project
python manage.py collectstatic

# Frontend
cd Frontend/codeedex
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.